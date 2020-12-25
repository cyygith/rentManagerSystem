<template>
    <div class="housechoose-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore" class="btnclass head-back">< 退回</button>
            <button @click="changeType" class="btnclass head-save">切换简体</button>
        </div>
        <div class="content-panel overflow-content">
            <div class="c-g-group" v-for="(val,key) in resulMap" :key="key">
                <div class="gg-item"> 
                    {{key}}
                </div>
                <!-- <div class="m-group">
                    <template v-for="(item) in val">
                        <div :key="item.houseCode">
                            <div :class="[setClass(item),{'chooseDiv':chooseSpan==item.houseCode}]"   class="m-m-div"  @click="selectHoust(item);">
                                <span class="m-m-m-span" >{{item.houseName}}</span>
                                <div class="m-m-m-div">{{item.allCount}}
                                    ({{item.leftDays===''?'未租':(item.leftDays < 0?('超'+Math.abs(item.leftDays)+'天'):('剩'+item.leftDays+'天'))}})
                                </div>	
                            </div>
                        </div>
                    </template>
                </div> -->
                <div class="c-group">
                    <delete-slider v-for='(item,tIndex) in val' :key="tIndex" :dealArr="dealArr"  @funOne="rentLine(tIndex,item)" @funTwo="setNoRent(tIndex,item)">
                        <div class="content-panel-div" :key="item.houseCode">
                            <div class="c-img" @click="houseBillList(item);">{{item.houseName}}</div>
                            <div class="c-other">
                                <div class="cc-room">{{item.groupName}}</div>
                                <div class="cc-content">
                                    <span class="ccc-time">记录{{item.allCount}}次</span> 
                                </div>
                            </div>
                            <div class="cc-status">
                                <div class="colorDiv" :class="[setClass(item)]">
                                ({{item.status==='2'?'未租':(item.leftDays < 0?('超'+Math.abs(item.leftDays)+'天'):('剩'+item.leftDays+'天'))}})
                                </div>
                            </div>
                        </div>
                    </delete-slider>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {billApi} from "@/service/rent-api";
import {houseApi} from "@/service/rent-api";
import deleteSlider from '@/components/common/deleteSilder.vue'
export default {
    data() {
        return {
            collapse:false,
            id:'',
            form:{
                id:'',
                groupName:'',
                groupCode:'',
                houseName:'',
                houseCode:'',
            },
            resulMap:{},
            chooseSpan:'',
            chooseItem:{},   //选中的事项
            dealArr:[
                {name:'收租',code:'use'},
                {name:'标空置',code:'delete'},
            ],  //需要显示的按钮个数，目前函数只支持3个函数，如有需要再加

        }
    },
    components:{
        deleteSlider
    },
    computed:{

    },
    mounted(){
        this.detail();
    },
    methods:{
        // 退出登录
        logout(){
            this.$router.push('/login');
        },
        //返回首页
        backBefore(){
            this.$router.back(-1);
        },
        setClass(item){
            let leftDays = item.leftDays;
            let status = item.status;
            if(status==='2'){
                return 'greyBill';
            }else if(leftDays<0||leftDays===0){
                return 'redBill';
            }else if(leftDays>0&&leftDays<3){
                return 'orangeBill';
            }else {
                return 'greenBill';
            }
            
        },
        // 获取详情  getListByGroup
        detail(){
            let idd = this.$route.query.id;
            let param = new URLSearchParams();
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            billApi.monitorRentEndTime(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){
                        this.resulMap = res.data;
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            }).catch(error=>{
                loading.close();
            });
        },

        //修改
        houseBillList(item){
            this.$router.push({path:'rentBillList',query:{houseCode:item.houseCode}});
        },
        //选中房间
        selectHoust(item){
            this.chooseSpan = item.houseCode;
            this.chooseItem = item;
            //this.$router.push({path:'rentBillList',query:{houseCode:item.houseCode}});
        },
        //切换显示形式
        changeType(){
            this.$router.push({path:'monitorView',query:{}});
        },
        //收租
        takeRent(){
            this.$router.push({path:'rentBill',query:{type:'rentHouseChoose',groupName:this.chooseItem.groupName,houseName:this.chooseItem.houseName,houseCode:this.chooseItem.houseCode}});
        },
        //置为【未租】按钮对应的处理数据，对应绑定在deleteSlider的@funOne="setNoRent"上面
        setNoRent(index,item){
            let param = {
                id:item.houseId,
                status:"2"
            };
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            houseApi.update(param).then((res)=>{
                if(res.code == "0"){
                    this.$message({
                        message: '操作成功',
                        center: true,
                        type: 'success',
                        customClass:'customClass',
                        offset:300
                    })
                    this.detail();
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            }).catch(error=>{
                loading.close();
            });
            
        },
        //已租按钮对应的处理数据,对应绑定在deleteSlider的@funOne="useLine"上面
        rentLine(index,item){
            this.$router.push({path:'rentBill',query:{type:'rentHouseChoose',groupName:item.groupName,houseName:item.houseName,houseCode:item.houseCode}});
        }

    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
.housechoose-panel{
    background-color: rgb(240, 235, 235);
    .c-g-group{
        background-color: white;
        padding: 0.5rem;
        margin: 0.2rem 0.6rem 0rem 0.2rem;
    }
        .gg-item{
            padding-bottom: 1rem;
            border-bottom: 1px solid rgb(167, 165, 165);
        }
    .content-panel-div{
        background-color: white;
        margin-bottom: 0.5rem;
		padding-bottom: 0.5rem;
        line-height: 2rem;
        display: flex;
        flex-direction: row;
        width: 100%;
    }   
        .c-img{
            padding: 1rem;
            background-color: lightgreen;
            border-radius: 50%;
            margin-right: 1rem;
        }
        .c-other{
            flex-grow: 1;
            margin-right: 2rem;
            flex:1;
        }
                .ccc-time{
                    font-size: 0.7rem;
                    color: grey;
                    
                }
                .ccc-money{
                    float: right;
                    color: blue;
                    
                }  
        .cc-status{
            flex:1;
        }
            .colorDiv{
                line-height: 1rem;
                text-align: center;
                padding:0.3rem;
                color:white;
                margin-top:25%;
            }
		.c-button{
			
		}
}
.foot-panel{
    margin-top: 5rem;
}
//选中样式
.chooseDiv{
	transform: scale(1.1);
	box-shadow: 0px 0px 18px rgba(0,0,0,0.5)
} 
.redBill{background-color:red;}
.orangeBill{background-color:orange;}
.greenBill{background-color:green;}
.greyBill{background-color:grey;}
</style>
