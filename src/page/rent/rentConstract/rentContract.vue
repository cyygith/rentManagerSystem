<template>
    <div class="contract-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore"  class="btnclass head-back">< 退回</button>
        </div>
        <div class="content-panel overflow-content">
        	<div class="c-item">
                <div class="cc-name">合同编号</div>
                <div class="cc-value">{{form.contractCode}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">合同名称</div>
                <div class="cc-value" @click="toEdit('contractName',form.contractName);">{{form.contractName}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">房屋编号</div>
                <div class="cc-value" @click="toEdit('houseCode',form.houseCode);">{{form.houseCode}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">租客编号</div>
                <div class="cc-value" @click="toEdit('personCode',form.personCode);">{{form.personCode}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">签约时间</div>
                <div class="cc-value" @click="toEdit('signTime',form.signTime);">{{form.signTime}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">开始时间</div>
                <div class="cc-value" @click="toEdit('startTime',form.startTime);">{{form.startTime}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">结束时间</div>
                <div class="cc-value" @click="toEdit('endTime',form.endTime);">{{form.endTime}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">租金</div>
                <div class="cc-value" @click="toEdit('renter',form.renter);">{{form.renter}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">押金</div>
                <div class="cc-value" @click="toEdit('deposit',form.deposit);">{{form.deposit}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">水费结算方式</div>
                <div class="cc-value" @click="toEdit('waterCloseType',form.waterCloseType);">{{waterCloseTypeName}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">付款方式</div>
                <div class="cc-value" @click="toEdit('payType',form.payType);">{{payTypeName}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">状态</div>
                <div class="cc-value" @click="toEdit('status',form.status);">{{statusName}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">排序号</div>
                <div class="cc-value" @click="toEdit('orderNum',form.orderNum);">{{form.orderNum}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">备注</div>
                <div class="cc-value" @click="toEdit('remark',form.remark);">{{form.remark}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">创建时间</div>
                <div class="cc-value" @click="toEdit('createTime',form.createTime);">{{form.createTime}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">更新时间</div>
                <div class="cc-value" @click="toEdit('updateTime',form.updateTime);">{{form.updateTime}}<span class="ccc-span">></span></div>
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
            waterCloseTypeName:'',//水费结算方式名称
            payTypeName:'',//付款方式
            statusName:'',//状态名称
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
        toEdit(item,value){
            this.$router.push({path:'rentContractModify',query:{id:this.form.id,showItem:item,showItemValue:value}});
        },
        // 获取详情
        detail(){
            let ID = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",ID);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            contractApi.getByCondition(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){    
                        this.form = res.data;
                        //水费结算方式
                        this.dictApi.formatRemote(this.dictApi.dict.typeCodeCd.waterCloseType,res.data.waterCloseType).then((val)=>{
                            this.waterCloseTypeName = val;
                        });
                        //付款方式
                        this.dictApi.formatRemote(this.dictApi.dict.typeCodeCd.payType,res.data.payType).then((val)=>{
                            this.payTypeName = val;
                        });
                        //状态
                        this.dictApi.formatRemote(this.dictApi.dict.typeCodeCd.useNo,res.data.status).then((val)=>{
                            this.statusName = val;  
                        });
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            }).catch(error=>{
                loading.close();
            });;	
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
.contract-panel{
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
