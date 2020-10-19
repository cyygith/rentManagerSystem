<template>
    <div class="housechoose-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore" class="btnclass head-back">< 退回</button>
            <button @click="houseDetail" class="btnclass head-save">查看</button>
            <button @click="takeRent" class="btnclass head-save">收租</button>
        </div>
        <div class="content-panel overflow-content">
            <div class="c-g-group" v-for="(val,key) in resulMap" :key="key">
                <div class="gg-item"> 
                    {{key}}
                </div>
                <div class="m-group">
                    <template v-for="(item) in val">
                        <div :key="item.houseCode">
                            <div :class="[setClass(item),{'chooseDiv':chooseSpan==item.houseCode}]"   class="m-m-div"  @click="selectHoust(item);">
                                <span class="m-m-m-span" >{{item.houseName}}</span>
                                <div class="m-m-m-div">{{item.allCount}}
                                    ({{item.leftDays===''?'未租':(item.leftDays < 0?('超'+Math.abs(item.leftDays)+'天'):('剩'+item.leftDays+'天'))}})
                                </div>	
                            </div>
                        </div>
                    </template>
                </div>
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
                id:'',
                groupName:'',
                groupCode:'',
                houseName:'',
                houseCode:'',
            },
            resulMap:{},
            chooseSpan:'',
            chooseItem:{}   //选中的事项
        }
    },
    computed:{

    },
    mounted(){
        this.detail();
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
        setClass(item){
            let leftDays = item.leftDays;
            if(leftDays===''){
                return 'greyBill';
            }else if(leftDays<0||leftDays===0){
                return 'redBill';
            }else if(leftDays>0&&leftDays<3){
                return 'orangeBill';
            }else {
                return 'greenBill';
            }
            
        },
        // 获取详情  getListByGroup
        detail(){
            let idd = this.$route.query.id;
            let param = new URLSearchParams();
            // let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            billApi.monitorRentEndTime(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){
                        console.log("value....");
                        console.dir(res.data);
                        this.resulMap = res.data;
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                // loading.close();
            });	
        },

        //修改
        houseDetail(){
            this.$router.push({path:'rentBillList',query:{houseCode:this.chooseItem.houseCode}});
        },
        //选中房间
        selectHoust(item){
            this.chooseSpan = item.houseCode;
            this.chooseItem = item;
            //this.$router.push({path:'rentBillList',query:{houseCode:item.houseCode}});
        },
        //收租
        takeRent(){
            this.$router.push({path:'rentBill',query:{type:'rentHouseChoose',groupName:this.chooseItem.groupName,houseName:this.chooseItem.houseName,houseCode:this.chooseItem.houseCode}});
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
.housechoose-panel{
    background-color: rgb(240, 235, 235);
    .c-g-group{
        background-color: white;
        padding: 1rem;
        margin: 0.2rem 0.6rem 0rem 0.2rem;
    }
        .gg-item{
            padding-bottom: 1rem;
            border-bottom: 1px solid rgb(167, 165, 165);
        }
    .m-group{
        display:flex;
        flex-wrap:wrap;
        padding:0.5rem;
    }
        .m-m-div{
            padding:0.3rem;
            margin-right:1rem;
            margin-bottom:0.5rem;
            text-align:center;	
            border: 1px solid grey;
        }
            .m-m-m-div{
                font-size:0.5rem;
            }
}
.foot-panel{
    margin-top: 5rem;
}
//选中样式
.chooseDiv{
	transform: scale(1.1);
	box-shadow: 0px 0px 18px rgba(0,0,0,0.5)
} 
.redBill{background-color:red;}
.orangeBill{background-color:orange;}
.greenBill{background-color:green;}
.greyBill{background-color:grey;}
</style>
