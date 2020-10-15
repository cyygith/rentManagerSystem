<template>
    <div class="contract-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back">< 退回</button>
        </div>
        <div class="content-panel">
        	<div class="c-item">
                <div class="cc-name">合同编号</div>
                <div class="cc-value">{{form.contractCode}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">合同名称</div>
                <div class="cc-value">{{form.contractName}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">房屋编号</div>
                <div class="cc-value">{{form.houseCode}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">租客编号</div>
                <div class="cc-value">{{form.personCode}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">签约时间</div>
                <div class="cc-value">{{form.signTime}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">开始时间</div>
                <div class="cc-value">{{form.startTime}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">结束时间</div>
                <div class="cc-value">{{form.endTime}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">租金</div>
                <div class="cc-value">{{form.renter}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">押金</div>
                <div class="cc-value">{{form.deposit}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">水费结算方式（1-按人10元/月  2-按月结算）</div>
                <div class="cc-value">{{form.waterCloseType}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">付款方式</div>
                <div class="cc-value">{{form.payType}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">状态</div>
                <div class="cc-value">{{form.status}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">排序号</div>
                <div class="cc-value">{{form.orderNum}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">备注</div>
                <div class="cc-value">{{form.remark}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">创建时间</div>
                <div class="cc-value">{{form.createTime}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">更新时间</div>
                <div class="cc-value">{{form.updateTime}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">实体ID</div>
                <div class="cc-value">{{form.tenantId}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import {contractApi} from "@/service/rent-api";
export default {
    data() {
        return {
            id:'',
            form:{
            	id:null,
            	contractCode:null,
            	contractName:null,
            	houseCode:null,
            	personCode:null,
            	signTime:null,
            	startTime:null,
            	endTime:null,
            	renter:null,
            	deposit:null,
            	waterCloseType:null,
            	payType:null,
            	status:null,
            	orderNum:null,
            	remark:null,
            	createTime:null,
            	updateTime:null,
            	tenantId:null,
            },
        }
    },
    computed:{

    },
    mounted(){
        this.detail();
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
        //编辑详情
        detail(){
            let ID = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",ID);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            contractApi.getByCondition(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){    
                        this.form = res.data;
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            });	
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/custom-module/mobileCommon.css';
.contract-panel{
    background-color: grey;
    position: relative;
    .c-item{
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 1rem;
        background-color: white;
        border-bottom: 1px solid rgb(214, 210, 210);
    }
        .cc-name{
            width: 5rem;
        }
        .cc-value{
            flex-grow: 1;
            text-align: right;  
            margin-right: 2rem;
        }
            .ccc-span{
                font-weight: bold;
                margin-left: 0.5rem;
            }
        .cc-amount{
            color: red;
            font-size: 1.3rem;
        }
    .smallsize{
        size: 0.5rem;
        color:grey;
    }
}
</style>
