<template>
    <div class="me-panel">
        <div class="top-div">
            <div class="top-content">
                <div class="d-top" @click="login">歪</div>
                <div class="d-div">
                    <div class="d-d-name">西歪歪</div>
                    <div>ID:181****1715</div>
                </div>
                <div class="d-icon">
                        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="chevronRightIconTitle" stroke="green" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="grey"> <title id="chevronRightIconTitle">Chevron Right</title> <polyline points="10 6 16 12 10 18 10 18"/> </svg>
                </div>
            </div>
        </div>
        <div class="summary-div">
            <div class="summary-content">
                <div class="s-item">
                    <div>1</div>
                    <div>连续打卡</div>
                </div>
                <div class="s-item">
                    <div>{{sum.SUMDAY}}</div>
                    <div>总记账天数</div>
                </div>
                <div class="s-item">
                    <div>{{sum.SUMCOUNT}}</div>
                    <div>记账总笔数</div>
                </div>
            </div>
        </div>
        <div class="summary-div">
            <div class="summary-content">
                <div class="s-item">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="basketballIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" color="#2329D6"> <title id="basketballIconTitle">Basketball</title> <g stroke-linecap="butt"> <path d="M3.00476 7.71673C6.03818 6.81589 9.99791 7.74841 13.2448 10.4315C16.5425 13.1566 18.2053 16.9442 17.8244 20.1241"/> <path d="M10.102 21.7996C9.33937 19.3589 10.0106 15.6137 12.0776 12.0335C14.1385 8.46402 17.0351 6.01413 19.5251 5.44463"/> <path d="M11.4419 2C11.2615 3.94419 10.5157 6.2298 9.22541 8.46468C7.29158 11.8142 4.64753 14.1615 2.40135 14.7854"/> </g> <circle cx="12" cy="12" r="10"/> </svg>
                    <div>消息</div>
                </div>
                <div class="s-item">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="basketballIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" color="#2329D6"> <title id="basketballIconTitle">Basketball</title> <g stroke-linecap="butt"> <path d="M3.00476 7.71673C6.03818 6.81589 9.99791 7.74841 13.2448 10.4315C16.5425 13.1566 18.2053 16.9442 17.8244 20.1241"/> <path d="M10.102 21.7996C9.33937 19.3589 10.0106 15.6137 12.0776 12.0335C14.1385 8.46402 17.0351 6.01413 19.5251 5.44463"/> <path d="M11.4419 2C11.2615 3.94419 10.5157 6.2298 9.22541 8.46468C7.29158 11.8142 4.64753 14.1615 2.40135 14.7854"/> </g> <circle cx="12" cy="12" r="10"/> </svg>
                    <div>徽章</div>
                </div>
                <div class="s-item">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="basketballIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" color="#2329D6"> <title id="basketballIconTitle">Basketball</title> <g stroke-linecap="butt"> <path d="M3.00476 7.71673C6.03818 6.81589 9.99791 7.74841 13.2448 10.4315C16.5425 13.1566 18.2053 16.9442 17.8244 20.1241"/> <path d="M10.102 21.7996C9.33937 19.3589 10.0106 15.6137 12.0776 12.0335C14.1385 8.46402 17.0351 6.01413 19.5251 5.44463"/> <path d="M11.4419 2C11.2615 3.94419 10.5157 6.2298 9.22541 8.46468C7.29158 11.8142 4.64753 14.1615 2.40135 14.7854"/> </g> <circle cx="12" cy="12" r="10"/> </svg>
                    <div>好友</div>
                </div>
                <div class="s-item">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="basketballIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" color="#2329D6"> <title id="basketballIconTitle">Basketball</title> <g stroke-linecap="butt"> <path d="M3.00476 7.71673C6.03818 6.81589 9.99791 7.74841 13.2448 10.4315C16.5425 13.1566 18.2053 16.9442 17.8244 20.1241"/> <path d="M10.102 21.7996C9.33937 19.3589 10.0106 15.6137 12.0776 12.0335C14.1385 8.46402 17.0351 6.01413 19.5251 5.44463"/> <path d="M11.4419 2C11.2615 3.94419 10.5157 6.2298 9.22541 8.46468C7.29158 11.8142 4.64753 14.1615 2.40135 14.7854"/> </g> <circle cx="12" cy="12" r="10"/> </svg>
                    <div>设置</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {accountApi} from "@/service/account-api";
export default {
    name:'me',
    data() {
        return {
            collapse:false,
            sum:{}
        }
    },
    computed:{
        onRoutes(){
            return this.$route.path.replace('/','');
        }
    },
    mounted(){
        this.querySummary();
    },
    methods:{
        //登录
        login(){
            this.$router.push('/login');
        },
        // 侧边栏折叠
        collapseChage(){
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        //获取统计数据
        querySummary(){
            let user = JSON.parse(sessionStorage.getItem('user'));
            let userId = user?user.userId:0;
            let param = {
                userId:userId
            };
            accountApi.getAllSummary(param).then((res)=>{
                if(res.code == "0"){
                    this.sum = res.data;
                }else{
                    this.$alert('获取信息失败，请联系管理员处理','提示信息');
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
body{
    margin: 0;
    padding: 0;
    background-color: rgb(243, 239, 239);
}
.me-panel{ 
    background-color: rgb(243, 239, 239);
}
.top-div{
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: white;
    .top-content{
        display: flex;
        position: relative;
        .d-top{
            padding: 1rem;
            border-radius: 2rem;
            border: 1px solid blue;
        }
        .d-div{
            margin-left: 1rem;
            .d-d-name{
                margin-bottom: 0.5rem;
            }
        }
        .d-icon{
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}
.summary-div{
    padding: 0 0.5rem 0 0.5rem;
    .summary-content{
        border: 1rem;
        margin-top: 1rem;
        padding: 0.5rem 0 0.5rem 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: white;
        .s-item{
            text-align: center;
        }
        .f-item{
            text-align: center;
        }
    }
}
</style>
