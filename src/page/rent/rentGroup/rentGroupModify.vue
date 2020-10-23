<template>
    <div class="group-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore"  class="btnclass head-back"><&nbsp;退回</button>
            <button class="btnclass head-save" @click="saveOrUpdate">保存</button>
        </div>
        <div class="content-panel overflow-content">
            <div class="c-item" v-if="ifNew||showItem==='groupCode'">
                <div>房组编号:</div>
                <input placeholder="请输入房组编号"  class="c-input" name="groupCode" v-model="form.groupCode">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='groupName'">
                <div>房组名称:</div>
                <input placeholder="请输入房组名称"  class="c-input" name="groupName" v-model="form.groupName">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='groupAddress'">
                <div>房组地址:</div>
                <input placeholder="请输入房组地址"  class="c-input" name="groupAddress" v-model="form.groupAddress">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='status'">
                <div>状态:</div>
                <span class="c-g-item" @click="changeStatus('1');" :class="{'c-g-item-this':form.status=='1'}">启用</span>
                <span class="c-g-item" @click="changeStatus('0');" :class="{'c-g-item-this':form.status=='0'}">禁用</span>
            </div>
            <div class="c-item" v-if="ifNew||showItem==='orderNum'">
                <div>排序号:</div>
                <input placeholder="请输入排序号"  class="c-input" name="orderNum" v-model="form.orderNum">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='remark'">
                <div>备注:</div>
                <input placeholder="请输入备注"  class="c-input" name="remark" v-model="form.remark">
            </div>
        </div>
    </div>
</template>
<script>
import {groupApi} from "@/service/rent-api";
export default {
    data() {
        return {
            id:'',
            form:{
            	id:null,
            	groupCode:null,
            	groupName:null,
            	groupAddress:null,
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
        changeStatus(val){
            this.form.status = val;
        },
        // 获取详情
        detail(){
            let ID = this.$route.query.ID;
            let param = new URLSearchParams();
            param.append("ID",ID);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            groupApi.getByCondition(param).then((res)=>{
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
            groupApi.saveOrUpdate(param).then((res)=>{
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
.group-panel{
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
