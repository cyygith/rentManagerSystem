<template>
    <div class="house-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back">< 退回</button>
        </div>
        <div class="content-panel overflow-content">
        	<div class="c-item">
                <div class="cc-name">房屋编号</div>
                <div class="cc-value">{{form.houseCode}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">房屋名称</div>
                <div class="cc-value">{{form.houseName}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">房组编号</div>
                <div class="cc-value">{{form.groupCode}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">房屋地址</div>
                <div class="cc-value">{{form.houseAddress}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">面积</div>
                <div class="cc-value">{{form.houseArea}}</div>
            </div>
        	<div class="c-item">
                <div class="cc-name">租金</div>
                <div class="cc-value">{{form.housePrice}}</div>
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
    </div>
</template>
<script>
import {houseApi} from "@/service/rent-api";
export default {
    data() {
        return {
            id:'',
            form:{
            	id:null,
            	houseCode:null,
            	houseName:null,
            	groupCode:null,
            	houseAddress:null,
            	houseArea:null,
            	housePrice:null,
            	status:null,
            	orderNum:null,
            	remark:null,
            	createTime:null,
            	updateTime:null,
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
        // 获取详情
        detail(){
            let ID = this.$route.query.ID;
            let param = new URLSearchParams();
            param.append("ID",ID);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            houseApi.getByCondition(param).then((res)=>{
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
.house-panel{
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
