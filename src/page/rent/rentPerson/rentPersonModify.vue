<template>
    <div class="person-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore"  class="btnclass head-back"><&nbsp;退回</button>
            <button class="btnclass head-save" @click="saveOrUpdate">保存</button>
        </div>
        <div class="content-panel overflow-content">
            <div class="c-item" v-if="ifNew||showItem==='personName'">
                <div>租客名称:</div>
                <input placeholder="请输入租客名称"  class="c-input" name="personName" v-model="form.personName">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='identCard'">
                <div>身份证号码:</div>
                <input placeholder="请输入身份证号码"  class="c-input" name="identCard" v-model="form.identCard">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='identAddr'">
                <div>身份证地址:</div>
                <input placeholder="请输入身份证地址"  class="c-input" name="identAddr" v-model="form.identAddr">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='tel'">
                <div>电话:</div>
                <input placeholder="请输入电话"  class="c-input" name="tel" v-model="form.tel">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='email'">
                <div>邮箱:</div>
                <input placeholder="请输入邮箱"  class="c-input" name="email" v-model="form.email">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='emergencyPerson'">
                <div>紧急联系人:</div>
                <input placeholder="请输入紧急联系人"  class="c-input" name="emergencyPerson" v-model="form.emergencyPerson">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='emergencyTel'">
                <div>紧急联系人电话:</div>
                <input placeholder="请输入紧急联系人电话"  class="c-input" name="emergencyTel" v-model="form.emergencyTel">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='gender'">
                <div>性别:</div>
                <input placeholder="请输入性别"  class="c-input" name="gender" v-model="form.gender">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='status'">
                <div>状态:</div>
                <span class="c-g-item" v-for='(val,key) in statuss' :key="key" @click="changeStatus(key);" :class="{'c-g-item-this':form.status==key}">{{val}}</span>
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
import {personApi} from "@/service/rent-api";
export default {
    data() {
        return {
            id:'',
            form:{
            	id:null,
            	personCode:null,
            	personName:null,
            	identCard:null,
            	identAddr:null,
            	tel:null,
            	email:null,
            	emergencyPerson:null,
            	emergencyTel:null,
            	gender:null,
            	status:null,
            	orderNum:null,
            	remark:null,
            	createTime:null,
            	updateTime:null,
            	tenantId:null,
            },
            ifNew:false, //是否为新增，如果新增，则不加一个个过滤
            showItem:'',
            showItemValue:'',
            statuss:{},//付款方式
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
        this.initDict();//初始化字典数据
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
        //初始化字典数据
        initDict(){
            //付款方式
            this.dictApi.getDictByType({"typeCode":this.dictApi.dict.typeCodeCd.useNo}).then((item)=>{
                this.statuss = item;
            });

        },
        // 获取详情
        detail(){
            let ID = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",ID);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            personApi.getByCondition(param).then((res)=>{
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
            personApi.saveOrUpdate(param).then((res)=>{
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
@import '../common/commonstyle.css';
.person-panel{
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
