<template>
    <div class="billlist-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore" class="btnclass head-back">< 退回</button>
        </div>
        <!--详细列表信息-->
        <div class="center-content overflow-content">
            <!-- <div class="content-panel" v-for='(tItem,tIndex) in tableData' :key="tIndex">
                <div class="c-img">{{tItem.houseName}}</div>
                <div class="c-other" @click="toDetail(tItem)">
                    <div class="cc-room">{{tItem.groupName}} {{tItem.houseName}}</div>
                    <div class="cc-content">
                        <span class="ccc-time">{{tItem.startTime}}-{{tItem.endTime}}</span> 
                        <span class="ccc-money">{{tItem.money}}元</span>
                    </div>
                </div>
            </div> -->
            <delete-slider v-for='(tItem,tIndex) in tableData' :key="tIndex" :dealArr="dealArr"  @funOne="deleteLine(tIndex,tItem)">
                <div class="content-panel">
                    <div class="c-img">{{tItem.houseName}}</div>
                    <div class="c-other" @click="toDetail(tItem)">
                        <div class="cc-room">{{tItem.groupName}} {{tItem.houseName}}</div>
                        <div class="cc-content">
                            <span class="ccc-time">{{tItem.startTime}}-{{tItem.endTime}}</span> 
                            <span class="ccc-money">{{tItem.money}}元</span>
                        </div>
                    </div>
                </div>
            </delete-slider>
        </div>
        <div class="load-more" v-if="this.page.totalCount>this.page.pageSize" @click="nextPage">加载更多...</div>
    </div>
</template>

<script>
import {billApi} from "@/service/rent-api";
import deleteSlider from '@/components/common/deleteSilder.vue'
export default {
    data() {
        return {
            collapse:false,
            id:'',
            form:{
                id:null,
            	contractCode:null,
            	houseCode:null,
            	money:null,
            	startTime:null,
            	endTime:null,
            	lastElectric:null,
            	currElectric:null,
            	waterPayType:null,
            	rentNum:null,
            	lastWater:null,
            	currWater:null,
            	payType:null,
            	status:null,
            	orderNum:null,
            	remark:null,
            	sum:null,
            	createTime:null,
            	updateTime:null,
            	groupName:null,
            	houseName:null
            },
            tableData:[],
            page:{
            	pageSize:10,
            	currPage:1,
            	totalPage:0
            },
            dealArr:[
                // {name:'收据',code:'useDiv',method:'fun'},
                {name:'删除',code:'deleteDiv',method:'deleteLine'},
                // {name:'收租',code:'rentDiv',method:'funThree'},
            ]
        }
    },
    components:{
        deleteSlider
    },
    computed:{

    },
    mounted(){
        this.queryList();
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
        nextPage(){
        	this.page.currPage = this.page.currPage + 1;
            this.queryList();
        },
        lastPage(){
        	this.page.currPage = this.page.currPage-1;
            this.queryList();
        },
        //编辑详情
        toDetail(item){
            this.$router.push({path:'rentBillDetail',query:{id:item.id}});
        },
        // 获取详情
        queryList(){
            let houseCode = this.$route.query.houseCode;
            let param = new URLSearchParams();
            param.append("page",this.page.currPage);
            param.append("size",this.page.pageSize);
            param.append("houseCode",houseCode);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            billApi.list(param).then((res)=>{
                if(res.code == "0"){
                //   this.tableData = res.data.list;
                  this.tableData.push.apply(this.tableData,res.data.list);
                  this.page.pageSize = res.data.pageSize;
                  this.page.totalCount = res.data.total;
                }else{
                  this.$message({showClose:true,message:'程序出现异常，请联系管理员处理'});
                  //this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            }).catch(error=>{
                loading.close();
            });
        },
        deleteLine(index,item){
            let param = {
                ids:item.id
            }
            billApi.deleteByIds(param).then((res)=>{
                if(res.code == "0"){
                    this.$message({
                        message: '删除完成',
                        center: true,
                        type: 'success',
                        customClass:'customClass',
                        offset:300
                    })
                    this.reloadList();
                }else{
                  this.$message({showClose:true,message:'程序出现异常，请联系管理员处理'});
                }
            }).catch(error=>{
                
            });
        },
        // 重新获取列表
        reloadList(){
            let houseCode = this.$route.query.houseCode;
            let param = new URLSearchParams();
            param.append("page",this.page.currPage);
            param.append("size",this.page.pageSize);
            param.append("houseCode",houseCode);
            billApi.list(param).then((res)=>{
                if(res.code == "0"){
                  this.tableData = res.data.list;
                }else{
                  this.$message({showClose:true,message:'程序出现异常，请联系管理员处理'});
                  //this.$alert('获取信息失败，联系管理员','提示信息');
                }
            });
        },
        useLine(index,item){
            console.dir("use.....line");
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
.billlist-panel{
    
    /****下面是列表css*****/
    .center-content{
        background-color: rgb(241, 238, 238);
        .content-panel{
            background-color: white;
            padding: 0.5rem 0 0.5rem 0;
            margin: 0.5rem 0 0.5rem 0;
            line-height: 1.5rem;
            display: flex;
            flex-direction: row;
            width: 100%;
        }   
            .c-img{
                padding: 1rem;
                background-color: lightgreen;
                border-radius: 50%;
                margin-right: 1rem;
            }
            .c-other{
                flex-grow: 1;
                margin-right: 2rem;
            }
                    .ccc-time{
                        font-size: 0.7rem;
                        color: grey;
                        
                    }
                    .ccc-money{
                        float: right;
                        color: blue;
                        
                    }
        .foot-panel{
            padding: 0.3rem;
        }
    }
}
.load-more{
    text-align:center;
}

</style>
