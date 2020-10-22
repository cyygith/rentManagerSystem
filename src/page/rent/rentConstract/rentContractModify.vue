<template>
    <div class="contract-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore"  class="btnclass head-back"><&nbsp;退回</button>
            <button class="btnclass head-save" @click="saveOrUpdate">保存</button>
        </div>
        <div class="content-panel overflow-content">
            <div class="c-item" v-if="ifNew||showItem==='contractCode'">
                <div>合同编号:</div>
                <input placeholder="请输入合同编号"  class="c-input" name="contractCode" v-model="form.contractCode">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='contractName'">
                <div>合同名称:</div>
                <input placeholder="请输入合同名称"  class="c-input" name="contractName" v-model="form.contractName">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='houseCode'">
                <div>房屋编号:</div>
                <input placeholder="请输入房屋编号"  class="c-input" name="houseCode" v-model="form.houseCode">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='personCode'">
                <div>租客编号:</div>
                <input placeholder="请输入租客编号"  class="c-input" name="personCode" v-model="form.personCode">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='signTime'">
                <div>签约时间:</div>
                <input placeholder="请输入签约时间"  class="c-input" name="signTime" v-model="form.signTime">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='startTime'">
                <div>开始时间:</div>
                <input placeholder="请输入开始时间"  class="c-input" name="startTime" v-model="form.startTime">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='endTime'">
                <div>结束时间:</div>
                <input placeholder="请输入结束时间"  class="c-input" name="endTime" v-model="form.endTime">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='renter'">
                <div>租金:</div>
                <input placeholder="请输入租金"  class="c-input" name="renter" v-model="form.renter">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='deposit'">
                <div>押金:</div>
                <input placeholder="请输入押金"  class="c-input" name="deposit" v-model="form.deposit">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='waterCloseType'">
                <div>水费结算方式（1-按人10元/月  2-按月结算）:</div>
                <input placeholder="请输入水费结算方式（1-按人10元/月  2-按月结算）"  class="c-input" name="waterCloseType" v-model="form.waterCloseType">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='payType'">
                <div>付款方式:</div>
                <input placeholder="请输入付款方式"  class="c-input" name="payType" v-model="form.payType">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='status'">
                <div>状态:</div>
                <input placeholder="请输入状态"  class="c-input" name="status" v-model="form.status">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='orderNum'">
                <div>排序号:</div>
                <input placeholder="请输入排序号"  class="c-input" name="orderNum" v-model="form.orderNum">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='remark'">
                <div>备注:</div>
                <input placeholder="请输入备注"  class="c-input" name="remark" v-model="form.remark">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='createTime'">
                <div>创建时间:</div>
                <input placeholder="请输入创建时间"  class="c-input" name="createTime" v-model="form.createTime">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='updateTime'">
                <div>更新时间:</div>
                <input placeholder="请输入更新时间"  class="c-input" name="updateTime" v-model="form.updateTime">
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
            ifNew:false, //是否为新增，如果新增，则不加一个个过滤
            showItem:'',
            showItemValue:''
        }
    },
    computed:{

    },
    mounted(){
        this.showItem = this.$route.query.showItem;
        this.form[this.showItem] = this.$route.query.showItemValue;
        this.ifNew = this.$route.query.ifNew;
        if(!this.ifNew){ //如果不是新的，则查询
            this.detail();
        }
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
        //保存到数据库
        saveOrUpdate(){
            let param = this.form;
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            contractApi.saveOrUpdate(param).then((res)=>{
                if(res.code == "0"){
                    this.$message({
                        message: '提交成功',
                        center: true,
                        type: 'success',
                        customClass:'customClass',
                        offset:300
                    })
                    this.$router.back(-1);
                }else{
                    this.$alert('提交失败，请联系管理员处理','提示信息');
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
    
    .c-item{
        // display: flex;
        // flex-direction: row;
        line-height: 2rem;
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
