<template>
    <div class="group-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore"  class="btnclass head-back">< 退回</button>
        </div>
        <div class="content-panel overflow-content">
        	<div class="c-item">
                <div class="cc-name">房组编号</div>
                <div class="cc-value">{{form.groupCode}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">房组名称</div>
                <div class="cc-value">{{form.groupName}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">房组地址</div>
                <div class="cc-value">{{form.groupAddress}}</div>
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
        </div>
        <div class="foot-panel"> </div>
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
    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
.group-panel{
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
