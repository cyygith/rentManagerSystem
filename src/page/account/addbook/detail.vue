<template>
    <div class="detail-panel">
        <div class="detail-top">
            <div class="d-t-back">
                <svg @click="backBefore" role="img" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" aria-labelledby="circleArrowLeftIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="circleArrowLeftIconTitle">Arrow Left</title> <path d="M10.5 15l-3-3 3-3"/> <path d="M16.5 12H9"/> <path stroke-linecap="round" d="M7.5 12H9"/> <circle cx="12" cy="12" r="10"/> </svg>
            </div>
            <div class="d-t-div">
                <svg  height="48" viewBox="0 0 512 512" width="48" xmlns="http://www.w3.org/2000/svg">
                    <path d="m256 0c-141.160156 0-256 114.839844-256 256s114.839844 256 256 256 256-114.839844 256-256-114.839844-256-256-256zm-15 125.65625c-22.820312-.980469-45.410156-4.1875-66.980469-9.402344 3.445313-8.164062 7.183594-16.003906 11.214844-23.433594 16.539063-30.476562 36.84375-51.863281 55.765625-59.609374zm0 30.023438v85.320312h-93.691406c1.320312-33.300781 6.996094-66.359375 16.382812-96.429688 24.875 6.265626 50.988282 10.058594 77.308594 11.109376zm0 115.320312v85.320312c-26.320312 1.050782-52.433594 4.84375-77.308594 11.109376-9.386718-30.070313-15.0625-63.128907-16.382812-96.429688zm0 115.34375v92.445312c-18.921875-7.746093-39.226562-29.132812-55.765625-59.609374-4.03125-7.429688-7.769531-15.269532-11.214844-23.433594 21.570313-5.214844 44.15625-8.421875 66.980469-9.402344zm30 0c22.820312.980469 45.410156 4.1875 66.980469 9.402344-3.445313 8.164062-7.183594 16.003906-11.214844 23.433594-16.539063 30.476562-36.84375 51.863281-55.765625 59.609374zm0-30.023438v-85.320312h93.691406c-1.320312 33.300781-6.996094 66.359375-16.382812 96.429688-24.875-6.265626-50.988282-10.058594-77.308594-11.109376zm0-115.320312v-85.320312c26.320312-1.050782 52.433594-4.84375 77.308594-11.109376 9.386718 30.070313 15.0625 63.128907 16.382812 96.429688zm0-115.34375v-92.445312c18.921875 7.746093 39.226562 29.132812 55.765625 59.609374 4.03125 7.429688 7.769531 15.269532 11.214844 23.433594-21.570313 5.214844-44.160157 8.421875-66.980469 9.402344zm82.132812-47.144531c-7.511718-13.84375-15.671874-26.046875-24.273437-36.457031 29.992187 10.242187 57.160156 26.628906 80.007813 47.644531-13.03125 6.980469-27.074219 13.042969-41.847657 18.109375-4.191406-10.179688-8.824219-19.972656-13.886719-29.296875zm-194.265624 0c-5.0625 9.324219-9.695313 19.117187-13.886719 29.296875-14.773438-5.066406-28.816407-11.132813-41.847657-18.109375 22.847657-21.015625 50.015626-37.402344 80.007813-47.644531-8.601563 10.410156-16.757813 22.609374-24.273437 36.457031zm-24.035157 57.492187c-10.238281 32.753906-16.257812 68.460938-17.554687 104.996094h-86.765625c3.210937-48.753906 21.933593-93.339844 51.292969-128.832031 16.292968 9.34375 34.136718 17.335937 53.027343 23.835937zm-17.554687 134.996094c1.296875 36.539062 7.316406 72.242188 17.554687 104.996094-18.890625 6.5-36.734375 14.492187-53.027343 23.835937-29.359376-35.492187-48.082032-80.078125-51.292969-128.832031zm27.703125 133.191406c4.191406 10.179688 8.824219 19.972656 13.886719 29.296875 7.515624 13.84375 15.671874 26.046875 24.273437 36.457031-29.992187-10.242187-57.160156-26.628906-80.003906-47.644531 13.023437-6.976562 27.070312-13.042969 41.84375-18.109375zm208.152343 29.296875c5.0625-9.324219 9.695313-19.117187 13.886719-29.296875 14.773438 5.066406 28.816407 11.132813 41.847657 18.109375-22.847657 21.015625-50.015626 37.402344-80.007813 47.644531 8.601563-10.410156 16.757813-22.609374 24.273437-36.457031zm24.035157-57.492187c10.238281-32.753906 16.257812-68.460938 17.554687-104.996094h86.765625c-3.210937 48.753906-21.933593 93.339844-51.292969 128.832031-16.292968-9.34375-34.136718-17.335937-53.027343-23.835937zm17.554687-134.996094c-1.296875-36.539062-7.316406-72.242188-17.554687-104.996094 18.890625-6.5 36.734375-14.492187 53.027343-23.835937 29.359376 35.492187 48.082032 80.078125 51.292969 128.832031zm0 0"/>
                </svg>
                <div class="d-text">{{form.category}}</div>
            </div>
        </div>
        <div class="detail-content"> 
            <div class="type-name">
                <div class="t-div">
                    <span class="div-name">类型：</span>
                    <span class="div-content">{{form.typeName}}</span>
                </div>
                <div class="item-line"></div>
            </div>
            <div class="type-name">
                <div class="t-div">
                    <span class="div-name">金额：</span>
                    <span class="div-content">{{form.money}}</span>
                </div>
                <div class="item-line"></div>
            </div>
            <div class="type-name">
                <div class="t-div">
                    <span class="div-name">日期：</span>
                    <span class="div-content">{{form.time}}</span>
                </div>
                <div class="item-line"></div>
            </div>
            <div class="type-name">
                <div class="t-div">
                    <span class="div-name">备注：</span>
                    <span class="div-content">{{form.mark}}</span>
                </div>
                <div class="item-line"></div>
            </div>
        </div>
        <div class="detail-footer">
            <div class="foot-container">
                <div class="f-edit" @click="edit">编辑</div>
                <div class="f-line"></div>
                <div class="f-del" @click="del">删除</div> 
            </div>
        </div>
    </div>
</template>

<script>
import {accountApi} from "@/service/account-api";
export default {
    data() {
        return {
            collapse:false,
            id:'',
            form:{
                id:'',
                type:'',
                typeName:'',
                money:'',
                time:'',
                mark:'',
                category:'',
                userId:''
            },
        }
    },
    computed:{

    },
    mounted(){
        this.detail();
        this.id = this.$route.query.id;
    },
    methods:{
        // 退出登录
        logout(){
            this.$router.push('/login');
        },
        //返回首页
        backBefore(){
            this.$router.back(-1);
        },
        // 获取详情
        detail(){
            let idd = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",idd);
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            accountApi.detail(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){
                        this.form = res.data;
                        if(res.data.type=='0'){
                            this.form.typeName = '收入';
                        }else{
                            this.form.typeName = '支出';
                        }
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            });	
        },
        //编辑
        edit(){
            //this.$router.push('chooseCatalog');
            this.$router.push({path:'chooseCatalog',query:{id:this.id}});
        },
        //删除
        del() {
            this.$confirm('确定删除该记录?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
                let param = new URLSearchParams();
                param.append("id",this.id);
                accountApi.delete(param).then(res => {
                    if (res.code == "0") {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            duration: 2000
                        });
                        this.$router.back(-1);
                    }else{
                        this.$message({
                            type: 'error',
                            message: '删除失败，联系管理员',
                            duration: 2000
                        });
                    }
                });
            }).catch((e) => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });   
        }
    }
}
</script>

<style lang="scss" scoped>
.detail-top{
    background-color: rgb(117, 194, 238);   
    height: 15%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .d-t-back{
        position: absolute;
        top:50%;
        margin-top:-24px;
        left:1rem;
        z-index: 99;
    }
    .d-t-div{
        position: relative;
        text-align: center;
        padding-top: 5%;
    }
}
.detail-content{
    position: absolute;
    height: 85%;
    top: 15%;
    left: 0;
    right: 0;
    bottom: 0;
    .type-name{
        padding: 1rem 0 0 1rem;
        .t-div{
            margin-right: 1rem;
            line-height: 1.5rem;
        }
        .item-line{
            border-top: 1px solid grey;
            margin-top: 1rem;
        }
    }
}
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
