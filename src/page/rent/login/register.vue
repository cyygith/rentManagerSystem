<template>
    <div class="register-panel">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <div class="l-content">
                <div class="item-content">
                    <el-form-item label="手机号" prop="username">
                        <el-input v-model="form.username" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <span class="i-icon" @click="reset">
                        <svg role="img"  xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="cancelIconTitle" stroke="grey" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="green"> <title id="cancelIconTitle">Cancel</title> <path d="M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339"/> <path d="M4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C8.83417511,1.02368927 15.1658249,1.02368927 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C15.1658249,22.9763107 8.83417511,22.9763107 4.92893219,19.0710678 Z"/> </svg>
                    </span>
                </div>
                <div class="item-content">
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                </div>
                <div class="item-content">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="l-button">
                <div class="c-button" @click="register">注册</div>
            </div>
        </el-form>
    </div>
</template>

<script>
import {commonApi} from "@/service/sys-api";
export default {
    name:'register',
    data() {
        return {
            form:{
                username: '',
                password: '',
                email:'',
                status:1,
                mobile:'',
                rememberMe:false
            },
            collapse:false,
            rules:{
                username:[{required:true,message:'请输入电话号码',trigger:'blur'}],
                password:[{required:true,message:'请输入密码',trigger:'blur'}],
                email:[{required:true,message:'请输入邮箱',trigger:'blur'},{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['change'] }]
            },
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
        //清除
        reset(){
            this.form.username = '';
        },
        //注册页面
        register(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.form.mobile = this.form.username;
                    let param = this.form;
                    let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
                    commonApi.register(param).then((res)=>{
                        try{
                            if(res.code == "0"){
                                this.$confirm('注册成功，是否跳转到登录页面', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'success'}).then(() => {
                                    this.$router.push('/login');
                                }).catch((e) => {}); 
                            }else{
                                this.$message({message:res.msg,type:'error'})
                            }
                        }catch(err){
                            this.$alert('程序出现异常，请联系管理员处理','提示信息');
                        }
                        loading.close();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            }); 
        }
    }
}
</script>

<style lang="scss" scoped>
.l-content{
    padding: 1rem 1rem 0 1rem;
    .item-content{
        width: 100%;
        position: relative;
        margin:1.5rem 0 1.5rem 0;
        .i-text{
            display: inline-block;
            text-align: right;
            width: 20%;
            margin-right: 1rem;
        }
        .i-icon{
            position: absolute;
            right: 0.5rem;
            top: 0.5rem;
        }
    }
    .item-line{
        border-bottom: 1px solid black;
        margin: 0.5rem 0 0.5rem 0;
    }
}
.l-button{
    padding: 1rem;
    margin:1rem;
    background-color: rgb(117, 194, 238);
    text-align: center;
}
.l-button:hover{
    background-color: rgb(174, 221, 248);
}
.l-content /deep/ .el-form-item{
    margin-bottom:0px;
}
</style>
