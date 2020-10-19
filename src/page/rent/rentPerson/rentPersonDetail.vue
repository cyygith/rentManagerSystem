<template>
    <div class="person-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back">< 退回</button>
        </div>
        <div class="content-panel overflow-content">
        	<div class="c-item">
                <div class="cc-name">租客编号</div>
                <div class="cc-value">{{form.personCode}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">租客名称</div>
                <div class="cc-value">{{form.personName}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">身份证号码</div>
                <div class="cc-value">{{form.identCard}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">身份证地址</div>
                <div class="cc-value">{{form.identAddr}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">电话</div>
                <div class="cc-value">{{form.tel}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">邮箱</div>
                <div class="cc-value">{{form.email}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">紧急联系人</div>
                <div class="cc-value">{{form.emergencyPerson}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">紧急联系人电话</div>
                <div class="cc-value">{{form.emergencyTel}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">性别</div>
                <div class="cc-value">{{form.gender}}</div>
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
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/custom-module/mobileCommon.css';
.person-panel{
    background-color: grey;
    
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
