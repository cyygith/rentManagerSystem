<template>
    <div class="detail-footer">
        <div class="foot-container">
            <div class="f-edit">编辑</div>
            <div class="f-line"></div>
            <div class="f-del">删除</div> 
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                collapse:false
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏,监听
            // bus.$on('collapse', msg => {
            //     this.collapse = msg;
            // })
        },
        methods:{
            //退出登录
            logout(){
                this.$router.push('/login');
            },
            // 侧边栏折叠
            collapseChage(){
                // this.collapse = !this.collapse;
                // bus.$emit('collapse', this.collapse);
            },
        }
    }
</script>

<style lang="scss" scoped>
.foot-container{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 10%;
    background-color: rgb(117, 194, 238);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .f-line{
        height: 40%;
        border-right: 1px solid black;
    }
}
</style>
