<template>
    <div class="config-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back"><&nbsp;退回</button>
            <button class="btnclass head-save" @click="saveOrUpdate">保存</button>
        </div>
        <div class="content-panel">
            <div class="c-item" v-if="ifNew||showItem==='hostId'">
                <div>房东编号:</div>
                <input placeholder="请输入房东编号"  class="c-input" name="hostId" v-model="form.hostId">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='hostName'">
                <div>房东名称:</div>
                <input placeholder="请输入房东名称"  class="c-input" name="hostName" v-model="form.hostName">
            </div>
        	<div class="c-item" v-if="ifNew||showItem==='status'">
        		<div>状态（字典）:</div>
        		<span class="c-g-item" v-for='(val,key) in statuss' :key="key" @click="changeWhenClick(status,key);" :class="{'c-g-item-this':form.status==key}">{{val}}</span>
        	</div>
            <div class="c-item" v-if="ifNew||showItem==='remark'">
                <div>备注:</div>
                <input placeholder="请输入备注"  class="c-input" name="remark" v-model="form.remark">
            </div>
        	<div class="c-item" v-if="ifNew||showItem==='tenantId'">
        		<div>实体ID（字典）:</div>
        		<span class="c-g-item" v-for='(val,key) in tenantIds' :key="key" @click="changeWhenClick(tenantId,key);" :class="{'c-g-item-this':form.tenantId==key}">{{val}}</span>
        	</div>
        </div>
        <div class="foot-panel"> </div>
    </div>
</template>
<script>
import {configApi} from "@/service/rent-api";
export default {
    data() {
        return {
            id:'',
            form:{
            	id:null,
            	hostId:null,
            	hostName:null,
            	status:null,
            	remark:null,
            	createTime:null,
            	updateTime:null,
            	tenantId:null,
            },
            ifNew:false, //是否为新增，如果新增，则不加一个个过滤
            showItem:'',
            showItemValue:'',
        	statuss:{},//状态（字典）列表
        	tenantIds:{},//实体ID（字典）列表
            
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
        };
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
        //点击触发
        changeWhenClick(field,val){
            this.form[field] = val;
        },
        //初始化字典数据,如果为空可以删除
        initDict(){           
        	//状态（字典）
        	this.dictApi.getDictByType({"typeCode":this.dictApi.dict.typeCodeCd.status}).then((item)=>{
                this.statuss = item;
            });
        	//实体ID（字典）
        	this.dictApi.getDictByType({"typeCode":this.dictApi.dict.typeCodeCd.tenantId}).then((item)=>{
                this.tenantIds = item;
            });
        },
        // 获取详情
        detail(){
            let ID = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",ID);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            configApi.getByCondition(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){    
                        this.form = res.data;
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            }).catch(error=>{
                loading.close();
            });	
        },
        //保存到数据库
        saveOrUpdate(){
            let param = this.form;
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            configApi.saveOrUpdate(param).then((res)=>{
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
.config-panel{
    .c-item{
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
