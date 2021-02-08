<template>
    <div class="chart-panel" id="goodsLineChart">
        <div class="head-panel fixed-head">
            <button class="btnclass head-back">< 退回</button>
        </div>
        <div class="content-panel overflow-content">
			<div class="chartLine">
				<div class="queryPanel">
					<div class="c-q-item" :class="showQueryType=='0'?'c-q-item-sel':''" @click="selShowQueryType();queryCharts();">按房组</div>
					<div class="c-q-item" :class="showQueryType=='1'?'c-q-item-sel':''" @click="selShowQueryType();selItemByTime()">按时间</div>
				</div>
				<div class="query-group" v-if="showQueryType=='0'">
					<template v-for='(tItem,tIndex) in groups'>
						<div :key="tIndex" class="c-q-item2" :class="queryItem == tItem.groupCode?'c-q-item2-sel':''" @click="selGroup(tItem.groupCode);selItemByGroup(tItem.groupCode)">{{tItem.groupName}}</div>
					</template>
				</div>
				<div class="query-group" v-if="showQueryType=='1'">
					<div class="c-q-item2" :class="queryItem == '2019'?'c-q-item2-sel':''" @click="selGroup('2019');selItemByTime('2019')">2019年</div>
					<div class="c-q-item2" :class="queryItem == '2020'?'c-q-item2-sel':''" @click="selGroup('2020');selItemByTime('2020')">2020年</div>
					<div class="c-q-item2" :class="queryItem == '2021'?'c-q-item2-sel':''" @click="selGroup('2021');selItemByTime('2021')">2021年</div>
				</div>
                <div class="chartPanel">
                    <ve-line :data="chartData" :settings="chartSettings" height="300px" width="300px"></ve-line>
                </div>
			</div>
			<div class="chart-content" >
				<div class="con-title">租金收入排行</div>
				<div class="con-content" v-for='(tItem,tIndex) in chartData.rows' :key="tIndex">
					<div class="c-img">
                        <div v-if="tItem.houseCode!=null">{{tItem.houseCode}}</div>
						<div v-else-if="tItem.qYear!=null">{{tItem.qYear.substr(5,6)}}月</div>
                        <div v-else>{{tItem.groupCode}}</div>
                    </div>
					<div class="c-name">
						<template v-if="tItem.qYear!=null">{{tItem.qYear}}</template>
						<template v-else>{{tItem.groupName}} {{tItem.houseName}}</template>
						<span class="c-times">{{tItem.countTime}}</span>
					</div>
					<div v-if="tItem.qYear!=null" class="c-money" @click="selItemByTime(tItem.qYear,'detail')">
						<span class="cc-money">{{tItem.moneySum}}元</span>
						<span class="cc-skip">></span>
					</div>
					<div v-else class="c-money" @click="selItemByGroup(tItem.groupCode,tItem.houseCode)">
						<span class="cc-money">{{tItem.moneySum}}元</span>
						<span class="cc-skip">></span>
					</div>
				</div>
			
			</div>
		</div>
    </div>
</template>
<script>
import VeLine from 'v-charts/lib/line'
import VeBar from 'v-charts/lib/bar'
import {chartApi} from "@/service/rent-api";
import {groupApi} from "@/service/rent-api";
export default {
    name:'goodsLineChart',
    data(){
        return {
            form:{
                createTime:'',
            },
            chartSettings:{
                metrics:['moneySum','countTime'],
                labelMap:{
                    moneySum:'租金',
                    rentTimes:'次数'
				}
			},
            chartData:{
                columns:['groupCode','moneySum'],
                rows:[]
			},
			groups:[],
			showQueryType:0, //搜索条件  0-按房组  1-按时间
			queryItem:'',//查询的具体细项
        }
    },
    components:{
        VeLine,
        VeBar
    },
    mounted(){
		this.queryCharts();
		this.queryGroups();
    },
    methods:{
        //重置
        resetForm() {
            this.$refs["form"].resetFields();
		},
		//查询房组信息
		queryGroups(){
			let param = {};
			groupApi.getByCondition(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){    
						console.log("group...");
						console.dir(res.data);
                        this.groups = res.data;
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
            });
		},
        //查询
        queryCharts(){
            let param = new URLSearchParams();
            chartApi.getRentSummaryGroup(param).then((res)=>{
                if(res.code == "0"){
                    console.log("报表数据");
					console.dir(res);
					this.chartData.columns = ['groupCode','moneySum'],
                    this.chartData.rows = res.data;
                }else{
                    this.$alert('获取信息失败，请联系管理员处理','提示信息');
                }
            });
		},
		//选择房组
		selGroup(groupCode){
			this.queryItem = groupCode;
		},
		//显示查询类型
		selShowQueryType(){
			console.log("类型~~~111"+this.showQueryType);
			if(this.showQueryType == '0'){
				this.showQueryType = '1'
			}else{
				this.showQueryType = '0'
			};
		},
		//根据分组查询
		selItemByGroup(groupCode,houseCode){
			console.log("groupCode value is"+groupCode);
			if(!!houseCode){
				this.$router.push({path:'rentBillList',query:{houseCode:houseCode}});
			}else{
				let param = new URLSearchParams();
				param.append("groupCode",groupCode);
				param.append("showHouseCode","true");
				chartApi.getRentSummaryGroup(param).then((res)=>{
					if(res.code == "0"){
						console.log("报表数据");
						console.dir(res);
						this.chartData.columns = ['houseCode','moneySum'],
						this.chartData.rows = res.data;
					}else{
						this.$alert('获取信息失败，请联系管理员处理','提示信息');
					}
				});
			}
		},
		//根据时间查询
		selItemByTime(year,detail){
			console.log("year value is1111"+year);
			console.log("detail...."+detail);
			if(!!detail){
				console.log("detail....come in");
				this.$router.push({path:'rentBillList',query:{startTime:year}});
			}else{
				let param = new URLSearchParams();
				if(!!year){
					param.append("startTime",year);
				}
				chartApi.getRentSummaryByMonth(param).then((res)=>{
					if(res.code == "0"){
						console.log("报表数据");
						console.dir(res);
						this.chartData.columns = ['qYear','moneySum'],
						this.chartData.rows = res.data;
					}else{
						this.$alert('获取信息失败，请联系管理员处理','提示信息');
					}
				});
			}
		}
    }
    
}
</script>
<style lang="scss" scoped>
@import '../common/commonstyle.css';
.chart-panel{
    background-color: rgb(241, 238, 238);
    .chartLine{
		height:auto;
		width:100%;
		background-color:white;
		color:white;
		.queryPanel{
			display:flex;
			background-color: #75c2ee;
			justify-content:center;
			.c-q-item{
				padding:0.3rem;
				margin-right:1rem;
			
			}
			.c-q-item-sel{
				border-bottom:2px solid white;
			}
		}
		.query-group{
			display:flex;
			background-color: #75c2ee;
			padding-bottom: 0.2rem;
			
		}
		.c-q-item2{
				font-size:0.8rem;
				padding:0.3rem 0.3rem 0.3rem 0.3rem;
				margin-top:0.5rem;
				margin-right:0.3rem;
		}
		.c-q-item2-sel{
			border:1px solid white;
			border-radius:1rem;
		}
	}
	.chart-content{
		width:100%;
		background-color:white;
		padding:0.3rem;
		.con-title{
			padding:0 0 1rem 1rem;
		}
		.con-content{
			display:flex;
			justify-content:space-between;
			align-items:baseline;
			margin-bottom:0.7rem;
			.c-img{
				padding: 0.5rem;
				background-color: lightgreen;
				border-radius: 50%;
				margin-right: 1rem;
			}
			.c-name{
				flex:1;
				position:relative;
			}		
				.c-times{
					font-size:0.1rem;
					background-color:red;
					color:white;
					position:absolute;
					top:0;
					padding:0.1rem 0.2rem;
					margin-left:0.3rem;
					border-radius:1rem;
				}
			.c-money{
				color:red;
				.cc-money{
					margin-right:0.3rem;
				}
				.cc-skip{
					margin-right:1rem;
				}
			}
		}
	}
    .foot-panel{
        margin-top: 5rem;
    }
}
</style>