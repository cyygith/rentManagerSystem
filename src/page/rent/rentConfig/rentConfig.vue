<template>
    <div class="config-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back">< 退回</button>
        </div>
        <div class="content-panel">
        	<div class="c-item">
                <div class="cc-name">房东编号</div>
                <div class="cc-value" @click="toEdit('hostId',form.hostId);">{{form.hostId}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
                <div class="cc-name">房东名称</div>
                <div class="cc-value" @click="toEdit('hostName',form.hostName);">{{form.hostName}}<span class="ccc-span">></span></div>
            </div>
        	<div class="c-item">
        		<div class="cc-name">状态（字典）</div>
        		<div class="cc-value" @click="toEdit('status',form.status);">{{statusName}}<span class="ccc-span">></span></div>
        	</div>
        	<div class="c-item">
                <div class="cc-name">备注</div>
                <div class="cc-value" @click="toEdit('remark',form.remark);">{{form.remark}}<span class="ccc-span">></span></div>
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
        		<div class="cc-name">实体ID（字典）</div>
        		<div class="cc-value" @click="toEdit('tenantId',form.tenantId);">{{tenantIdName}}<span class="ccc-span">></span></div>
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
        	statusName:{},//状态（字典）名称
        	tenantIdName:{},//实体ID（字典）名称
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
            this.$router.push({path:'rentConfigModify',query:{id:this.form.id,showItem:item,showItemValue:value}});
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
                        
			        	//状态（字典）
			        	this.dictApi.getDictByType({"typeCode":this.dictApi.dict.typeCodeCd.status}).then((val)=>{
			                this.statusName = val;
			            });
			        	//实体ID（字典）
			        	this.dictApi.getDictByType({"typeCode":this.dictApi.dict.typeCodeCd.tenantId}).then((val)=>{
			                this.tenantIdName = val;
			            });
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            }).catch(error=>{
                loading.close();
            });	
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
.config-panel{
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
