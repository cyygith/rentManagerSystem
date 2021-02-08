<template>
    <div class="housechoose-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore" class="btnclass head-back">< 退回</button>
            <button @click="houseDetail" class="btnclass head-save">查看</button>
            <button @click="addHouse" class="btnclass head-save">新增</button>
            <button @click="delHouse" class="btnclass head-save">删除</button>
        </div>
        <div class="content-panel overflow-content">
            <div class="c-g-group" v-for="(val,key) in resulMap" :key="key">
                <div class="gg-item"> 
                    {{key}}
                </div>
                <div class="c-group">
                    <span @click="toRent(item);" :class="{'c-g-item-this':chooseSpan==item.houseCode}" class="c-g-item" v-for="(item) in val" :key="item.houseCode">{{item.houseName}}</span>
                </div>
            </div>
        </div>
        <div class="foot-panel"> </div>
    </div>
</template>

<script>
import {billApi,houseApi} from "@/service/rent-api";
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
        // 获取详情  getListByGroup
        detail(){
            let idd = this.$route.query.id;
            let param = new URLSearchParams();
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            billApi.getListByGroup(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){
                        this.resulMap = res.data;
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            });	
        },

        //修改
        houseDetail(){
            this.$router.push({path:'rentHouse',query:{type:'rentHouse',id:this.chooseItem.id,houseCode:this.chooseItem.houseCode}});
        },
        //新增
        addHouse(){
            this.$router.push({path:'rentHouseModify',query:{type:'rentHouseModify',ifNew:true}});
        },
        //选中收租情况
        toRent(item){
            this.chooseSpan = item.houseCode;
            this.chooseItem = item;
        },
        //删除
        delHouse() {
            this.$confirm('确定删除该记录?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
                let param = new URLSearchParams();
                param.append("id",this.chooseItem.id);
                houseApi.delete(param).then(res => {
                    if (res.code == "0") {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            duration: 2000
                        });
                        this.detail();
                    }else{
                        this.$message({
                            type: 'error',
                            message: '删除失败，联系管理员',
                            duration: 2000
                        });
                    }
                });
            }).catch((e) => {
                console.dir(e);
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
@import '../common/commonstyle.css';
.housechoose-panel{
    .overflow-content{
        background-color: #f1eeee;
    }
    .c-g-group{
        background-color: white;
        padding: 1rem;
        margin: 0.2rem 0.6rem 0rem 0.2rem;
    }
        .gg-item{
            padding-bottom: 1rem;
            border-bottom: 1px solid rgb(167, 165, 165);
        }
        .hh-item{
            padding: 1rem;

        }
}
</style>
