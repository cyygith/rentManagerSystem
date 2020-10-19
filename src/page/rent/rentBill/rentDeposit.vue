<template>
    <div class="rentReceipt-panel" id="receiptPanel">
        <div class="head-panel fixed-head">
            <button @click="backBefore" class="btnclass head-back">< 退回</button>
        </div>
        <div class="content-panel overflow-content recepitPanel">
            <div class="c-title">
                <div class="cc-title">出租屋专用收据</div>
                <div class="cc-no">No.{{billNum}}</div>
            </div>
            <div class="c-info">
                <div class="cc-room">租客及房号：{{form.groupName}}{{form.houseName}}</div>
                <div class="cc-time">2020年9月23号</div>
            </div>
            <div>
                <table>
                    <tr>
                        <td rowspan="2" width="10%">项目</td>
                        <td rowspan="2" width="12%">上月</td>
                        <td rowspan="2" width="12%">本月</td>
                        <td rowspan="2" width="13%">实用</td>
                        <td rowspan="2" width="13%">单价</td>
                        <td colspan="6" width="20%">金额</td>
                        <td rowspan="7"  width="20%">备注</td>
                    </tr>
                    <tr>
                        <td>万</td>
                        <td>仟</td>
                        <td>佰</td>
                        <td>十</td>
                        <td>元</td>
                        <td>角</td>
                    </tr>
                    <tr>
                        <td>电费(度)</td>
                        <td>{{form.lastElectric}}</td>
                        <td>{{form.currElectric}}</td>
                        <td>{{form.currElectric-form.lastElectric}}</td>
                        <td>1元/度</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>水费(吨)</td>
                        <td>{{form.waterPayType==1?form.lastWater:''}}</td>
                        <td>{{form.waterPayType==1?form.currWater:''}}</td>
                        <td>{{form.waterPayType==1?(form.currWater-form.lastWater):(form.rentNum*10)}}</td>
                        <td>{{form.waterPayType==1?'5元/吨':'10元/人'}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>房租</td>
                        <td>{{form.money}}</td>
                        <td colspan="3">{{form.startTime}}到{{form.endTime}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>押金</td>
                        <td></td>
                        <td colspan="2">网费</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>卫生费</td>
                        <td></td>
                        <td colspan="2">其他费用</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="12" style="text-align: left;">
                           	 合计金额(大写)    ￥{{form.sum}}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="c-foot">
                <div class="cc-drawer">开票人：</div>
                <div class="cc-customer">客户签字：</div>
            </div>
        </div>
        <div class="foot-panel"> </div>
    </div>
</template>

<script>
import {billApi} from "@/service/rent-api";
export default {
    data() {
        return {
            collapse:false,
            id:'',
            form:{
                id:'',
            	contractCode:'',
            	houseCode:'',
            	money:'',
            	startTime:'',
            	endTime:'',
            	lastElectric:0,
            	currElectric:0,
                waterPayType:'',
                waterPayTypeName:'',
            	rentNum:0,
            	lastWater:0,
            	currWater:0,
                payType:'',
                payTypeName:'',
            	status:'',
            	orderNum:'',
            	remark:'',
            	sum:0,
            	createTime:'',
            	updateTime:'',
            	houseName:'',
            	groupName:''
            },
            billNum:'',//收据编号
            
        }
    },
    computed:{

    },
    mounted(){
        this.detail();
        this.resize();//旋转成横屏
        //window.addEventListener('resize',this.resize);
    },
    watch:{
 
    },
    methods:{
        // 退出登录
        logout(){
            this.$router.push('/login');
        },
        //返回上一页
        backBefore(){
            this.$router.back(-1);
        },
        // 获取详情
        detail(){
            let id = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",id);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            billApi.detail(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){    
                        this.form = res.data;
                        let tempCode = '0000000';
                        this.billNum = tempCode.replace(tempCode.length-this.form.id.length,this.form.id);
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            });	
        },
        resize(){
        	let width = window.innerWidth,
        	 	height = window.innerHeight,
        	 	$wrapper = document.getElementById("receiptPanel"),
        	 	style = "";
        	if(width >= height){//横屏
        		style += "width:" + width + "px;";
        		style += "height:" + height + "px;";
        		style += "-webkit-transform: rotate(0);transform: rotate(0);";
        		style += "-webkit-transform-origin: "+ width/2 + "px "+ width/2 + "px;";
        		style += "transform-origin: "+ width/2 + "px "+ width/2 + "px;";
        	}else{
        		style += "width:" + height + "px;";
        		style += "height:" + width + "px;";
        		style += "-webkit-transform: rotate(0);transform: rotate(0);";
        		style += "-webkit-transform-origin: "+ width/2 + "px "+ width/2 + "px;";
        		style += "transform-origin: "+ width/2 + "px "+ width/2 + "px;";
        	}
        	$wrapper.style.cssText = style;
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
.rentReceipt-panel{
    background-color: rgb(240, 235, 235);
	table{
	    width: 98%;
	    height:98%;
	    text-align: center;
	}
	tr,td{
	    border: 1px solid black;
	}
	    .c-title{
	        text-align: center;
	        font-size: 1.3rem;
	    }
	        .c-title{
	
	        }
	            .cc-no{
	                color: red;
	            }
	
	        .c-info{
	            display: flex;
	        }
	            .cc-time{
	                margin-left: auto;
	                padding-right: 1rem;
	            }
	        .c-foot{
	            display: flex;
	        }
	            .cc-customer{
	                margin-left: auto;
	                padding-right: 1rem;
	            }
	    .recepitPanel{
	        padding: 1rem;
	    }
}

</style>
