<template>
    <div class="choose-panel">
        <div class="choose-top">
            <div class="c-back" @click="back">
                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" aria-labelledby="circleArrowLeftIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="circleArrowLeftIconTitle">Arrow Left</title> <path d="M10.5 15l-3-3 3-3"/> <path d="M16.5 12H9"/> <path stroke-linecap="round" d="M7.5 12H9"/> <circle cx="12" cy="12" r="10"/> </svg>
            </div>
            <div class="top-content">
                <span class="c-outcome" @click="changeToIncome" :class="!inComeShow?'type-choose':''">支出</span>  
                <span class="c-income" @click="changeToIncome" :class="inComeShow?'type-choose':''">收入</span>   
            </div>
        </div>
        <div class="choose-content">
            <div class="svg-container" v-if="!inComeShow">
                <div @click="shownum('001')" class="svgItem" id="bag">
                    <div :class="changeRed == '001'?'svg-img-red':'svg-img'">
                        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="bagIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="bagIconTitle">Bag</title> <rect width="14" height="12" x="5" y="7"/> <path d="M8 7a4 4 0 1 1 8 0"/> </svg>
                    </div>
                    <div>餐饮</div>
                </div>
                <div @click="shownum('002')" class="svgItem"  id="bag">
                    <div  :class="changeRed == '002'?'svg-img-red':'svg-img'">
                        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="bagIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="bagIconTitle">Bag</title> <rect width="14" height="12" x="5" y="7"/> <path d="M8 7a4 4 0 1 1 8 0"/> </svg>
                    </div>
                    <div>购物</div>
                </div>
                <div @click="shownum('003')"  class="svgItem"  id="bag">
                    <div  :class="changeRed == '003'?'svg-img-red':'svg-img'">
                        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="bagIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="bagIconTitle">Bag</title> <rect width="14" height="12" x="5" y="7"/> <path d="M8 7a4 4 0 1 1 8 0"/> </svg>
                    </div>
                    <div>日用</div>
                </div>
                <div @click="shownum('004')" class="svgItem"  id="bag">
                    <div  :class="changeRed == '004'?'svg-img-red':'svg-img'">
                        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="bagIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="bagIconTitle">Bag</title> <rect width="14" height="12" x="5" y="7"/> <path d="M8 7a4 4 0 1 1 8 0"/> </svg>
                    </div>
                    <div>交通</div>
                </div>
            </div> 
            <!--收入类型-->
            <div class="svg-container" v-if="inComeShow">
                <div @click="shownum('005')" class="svgItem" id="bag">
                    <div :class="changeRed == '005'?'svg-img-red':'svg-img'">
                        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="bagIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="bagIconTitle">Bag</title> <rect width="14" height="12" x="5" y="7"/> <path d="M8 7a4 4 0 1 1 8 0"/> </svg>
                    </div>
                    <div>工资</div>
                </div>
                <div @click="shownum('006')" class="svgItem"  id="bag">
                    <div :class="changeRed == '006'?'svg-img-red':'svg-img'">
                        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="bagIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="bagIconTitle">Bag</title> <rect width="14" height="12" x="5" y="7"/> <path d="M8 7a4 4 0 1 1 8 0"/> </svg>
                    </div>
                    <div>兼职</div>
                </div>
                <div @click="shownum('007')" class="svgItem"  id="bag">
                    <div :class="changeRed == '007'?'svg-img-red':'svg-img'">
                        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="bagIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="bagIconTitle">Bag</title> <rect width="14" height="12" x="5" y="7"/> <path d="M8 7a4 4 0 1 1 8 0"/> </svg>
                    </div>
                    <div>理财</div>
                </div>
                <div @click="shownum('008')" class="svgItem"  id="bag">
                    <div :class="changeRed == '008'?'svg-img-red':'svg-img'">
                        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="bagIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="bagIconTitle">Bag</title> <rect width="14" height="12" x="5" y="7"/> <path d="M8 7a4 4 0 1 1 8 0"/> </svg>
                    </div>
                    <div>基金</div>
                </div>
            </div> 
        </div>
        <v-num :checkrow="checkRow" v-if="numShow" @closechild="closechild"></v-num>
    </div>
</template> 

<script>
import vNum from '../addbook/num';
import {accountApi} from "@/service/account-api";
export default {
    name:'chooseCatalog',
    data() {
        return {
            checkRow:{
                type:'1',
                category:'',
                id:''
            },
            collapse:false,
            numShow:false,
            inComeShow:false,
            changeRed:-1,    //改变背景,
            id:''   //界面传递过来的id
        }
    },
    components:{
        vNum
    },
    mounted(){
        this.getDetail();//获取详细信息
    },
    created(){

    },
    methods:{
        //退出登录
        logout(){
            this.$router.push('/login');
        },
        //关闭子窗口
        closechild(){
            this.numShow = false;
        },
        //显示数字框框
        shownum(category){
            this.checkRow.category = category;
            console.log("now catalog:" + this.checkRow.category);
            this.numShow = true;
            this.changeRed = category;//选中的框框
        },
        //返回首页
        back(){
            this.$router.push('/home');
        },
        //切换成收入类型
        changeToIncome(){
            this.inComeShow = !this.inComeShow;
            if(this.inComeShow == true){
                this.checkRow.type="0";
            }else{
                this.checkRow.type="1";
            }
        },
        //获取详细信息
        getDetail(){
            if(this.$route.query.id){
                let idd = this.$route.query.id;
                let param = new URLSearchParams();
                param.append("id",idd);
                let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
                accountApi.detail(param).then((res)=>{
                    if(res.code == "0"){
                        if(res.data){
                            console.log("值"); 
                            console.dir(res.data);
                            let resdate = res.data;
                            //this.changeRed = res.data.category;
                            this.shownum(resdate.category);//选中的框框
                            this.form = resdate;
                            this.checkRow.id = resdate.id;
                            if(res.data.type=='0'){
                                this.form.typeName = '收入';
                                this.inComeShow = true;
                            }else{
                                this.form.typeName = '支出';
                            }
                        }
                    }else{
                        this.$alert('获取信息失败，联系管理员','提示信息');
                    }
                    loading.close();
                });
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.choose-top{
    background-color: rgb(117, 194, 238);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 15%;
    .c-back{
        position: absolute;
        left: 1rem;
        top:30%;
        z-index: 99;
    }
    .top-content{
        padding-top: 2rem;
        position: relative;
        text-align: center;
        .c-outcome{
            padding: 1rem;
        }
        .c-income{
            margin-left: 1rem;
            padding: 1rem;
        }
        .type-choose{
            border-bottom: 1px solid black;
        }
    }
}
.choose-content{
    position: absolute;
    top: 15%;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 1rem;
    .svg-container{
        display: flex;
        justify-content: space-around;
        align-items: center;
        .svgItem{
            display: inline-block;
            text-align: center;
            font-size: 0.6rem;
        }
        .svg-img{
            background-color: rgb(248, 248, 245);
            border-radius: 2rem;
        }
        .svg-img-red{
            border-radius: 2rem;
            background-color: rgb(117, 194, 238);
        }
    }
}

</style>
