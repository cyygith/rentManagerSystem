<template>
    <div class="summary-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back">< 退回</button>
        </div>
        <div class="content-panel">
            <div class="c-item">
                <div class="cc-name">房组管理</div>
                <div class="cc-value" @click="toGroup"><span class="ccc-span">></span></div>
            </div>
            <div class="c-item">
                <div class="cc-name">房屋管理</div>
                <div class="cc-value" @click="toHouse"><span class="ccc-span">></span></div>
            </div>
            <div class="c-item">
                <div class="cc-name">租客管理</div>
                <div class="cc-value" @click="toPerson('money',form.money);"><span class="ccc-span">></span></div>
            </div>
            <div class="c-item">
                <div class="cc-name">合同管理</div>
                <div class="cc-value" @click="toContract('money',form.money);"><span class="ccc-span">></span></div>
            </div>

        </div>
    </div>
</template>

<script>
import {billApi} from "@/service/rent-api";
export default {
    data() {
        return {
            collapse:false,
            id:'',
            form:{

            },
            
        }
    },
    computed:{

    },
    mounted(){
        
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
        //房组管理
        toGroup(item,value){
            this.$router.push({path:'rentGroupList',query:{}});
        },
        //房屋管理
        toHouse(item,value){
            this.$router.push({path:'rentHouseList',query:{}});
        },
        //房客管理
        toPerson(item,value){
            this.$router.push({path:'rentPersonList',query:{}});
        },
        //合同管理
        toContract(item,value){
            this.$router.push({path:'rentContractList',query:{}});
        },
        
    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
.summary-panel{
    background-color: grey;
    position: relative;
    overflow: hidden;
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
