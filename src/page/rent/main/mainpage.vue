<template>
    <div class="main-page">
        <!--top panel-->
        <div class="top">
            <div class="t-name">西歪歪账本</div>
            <div class="o-function">
                <svg class="o-search" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M16.3198574,14.9056439 L21.7071068,20.2928932 L20.2928932,21.7071068 L14.9056439,16.3198574 C13.5509601,17.3729184 11.8487115,18 10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 C14.418278,2 18,5.581722 18,10 C18,11.8487115 17.3729184,13.5509601 16.3198574,14.9056439 Z M10,16 C13.3137085,16 16,13.3137085 16,10 C16,6.6862915 13.3137085,4 10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 Z"/>
                </svg>
                <svg height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="m472 332v-212c0-22.054688-17.945312-40-40-40h-24v20c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-20h-92v20c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-20h-92v20c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-20h-24c-22.054688 0-40 17.945312-40 40v312c0 22.054688 17.945312 40 40 40h352c22.054688 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-352c-44.113281 0-80-35.886719-80-80v-312c0-44.113281 35.886719-80 80-80h24v-20c0-11.046875 8.953125-20 20-20s20 8.953125 20 20v20h92v-20c0-11.046875 8.953125-20 20-20s20 8.953125 20 20v20h92v-20c0-11.046875 8.953125-20 20-20s20 8.953125 20 20v20h24c44.113281 0 80 35.886719 80 80v212c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20zm-60-162h-312c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h312c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm20 118c0-11.046875-8.953125-20-20-20h-312c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h312c11.046875 0 20-8.953125 20-20zm-332 81c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h212c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm0 0"/>
                </svg>
            </div>
        </div>
        <!--tips panel--->
        <div class="top-tips">
            <div class="tip-time">
                <div class="fitem">{{year}}</div>
                <div class="sitem">
                    <span>{{month}}</span>
                    <el-date-picker format="yyyy-MM" value-format="yyyy-MM" size="mini" v-model="form.time" type="month"> </el-date-picker>
                </div>
                <div class="tseparate"></div>
            </div>
            <div class="tip-income">
                <div class="fitem">支出</div>
                <div class="sitem">{{monthSumMap.out?monthSumMap.out:'0.00'}}</div>
            </div>
            <div class="tip-outcome">
                <div class="fitem">收入</div>
                <div class="sitem">{{monthSumMap.in?monthSumMap.in:'0.00'}}</div>
            </div>
        </div>
        
        <!--content panel-->
        <div class="center">
            <div class="center-tips" v-if="showLoginTips" @click="login">为避免数据丢失，建议登录哟~~</div>
            <!--详细列表信息-->
            <div class="center-content">
                <div class="content-panel" v-for='(tItem,tIndex) in tableData' :key="tIndex">
		            <div class="c-img">{{tItem.houseName}}</div>
		            <div class="c-other" @click="toDetail(tItem)">
		                <div class="cc-room">{{tItem.groupName}} {{tItem.houseName}}</div>
		                <div class="cc-content">
		                    <span class="ccc-time">{{tItem.startTime}}-{{tItem.endTime}}</span> 
		                    <span class="ccc-money">{{tItem.money}}元</span>
		                </div>
		            </div>
		        </div>
            </div>
            <div class="load-more" @click="nextPage">加载更多...</div>

        </div>
    </div>

</template>

<script>
import {billApi} from "@/service/rent-api";
export default {
    name: 'mainpage',
    data() {
        return {
            collapse:false,
            form:{
                time:''
            },
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            searchTime:'',
            tableData: [],
            timeMap:{},
            sumMap:{},
            dayOfmonthList:{},
            monthSumMap:{},
            showLoginTips:false,
            page:{
            	pageSize:10,
            	currPage:0,
            	totalPage:0
            },
        }
    },
    watch:{//监听参数
        "form.time":function(){
            if(this.form.time!=''){
                this.year = this.form.time.substring(0,4);
                this.month = this.form.time.substring(5,7);
                this.searchTime = this.form.time;
                this.queryList();
                this.form.time = '';
            }
        }
    },
    mounted() {
        this.queryList();
        let date = new Date();
        this.searchTime = date.getFullYear() + '-' + date.getMonth();
    },
    computed:{
        onRoutes(){
            return this.$route.path.replace('/','');
        }
    },
    created(){
    },
    methods:{
        //登录
        login(){
            this.$router.push('/login');
        },
        nextPage(){
        	this.page.currPage = this.page.currPage + 1;
            this.queryList();
        },
        lastPage(){
        	this.page.currPage = this.page.currPage-1;
            this.queryList();
        },
        //查看详情
        toDetail(item){
            this.$router.push({path:'rentBillDetail',query:{id:item.id}});
        },
        //查询list数据
        queryList() {
            let user = JSON.parse(sessionStorage.getItem('user')); 
            let userId = user?user.userId:0;
            if(!user){
                this.showLoginTips = true;
            }
	        
            // let param = {
            //     page : this.page.currPage,
            //     size : this.page.pageSize
            // };
            let param = new URLSearchParams();
            param.append("page",this.page.currPage);
            param.append("size",this.page.pageSize);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            billApi.list(param).then((res)=>{
                console.log('abccccc');
                console.dir(res);
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
            });
	    },
    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
/***top相关css*****/  
.top{
    background-color: rgb(117, 194, 238);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5%;
    .t-name{
        display: inline-block;
        text-align: center;
        font-size: 1.3rem;
        font-weight: bolder;
        font-family: 'Times New Roman', Times, serif;
        width: 100%;
        padding: 0.5rem 0rem;
    }
    .o-function{
        position: absolute;
        top:20%;
        right:5%;
        .o-search{
            margin-right: 0.5rem;
        }
    }
}
/***top tips相关css*****/  
.top-tips{
    background-color: rgb(117, 194, 238);
    position: absolute;
    top:5%;
    left: 0;
    right: 0;
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.5rem 0; 
    .tip-time{
        flex: 2;
        padding: 0.4rem 0 0.4rem 1rem;
        position: relative;
        .tseparate{
            border: 1px solid black;
            position: absolute;
            top:20%;
            right:20%;
            height: 60%;
        }
    }
        
    .tip-income{
        flex: 4;
    }
    .tip-outcome{
        flex: 4;
    }
}
/**下面是上面共有的**/
.fitem{
    font-size: 0.8rem;
}
.sitem{
    font-weight: bold;
}
/***center-conten相关css*****/  
.center{
    position: absolute;
    left: 0;
    right: 0;
    top: 12%;
    bottom: 8%;
    overflow: auto;
    padding: 0;
    .center-content{
        position: relative;
    }
    .center-tips{
        background-color: rgba(255, 166, 0, 0.527);
    }
    .c-top{
        padding: 0.4rem;
        font-size: 0.8rem;
        .c-money{
            position: absolute;
            right: 0.5rem;
            top: 0;
            padding: 0.4rem;
        }
    }
    .c-line{
        border-top: 1px solid grey;
    }
    .c-item{
        display: flex;
        padding: 0.4rem;
        align-items: center;
        justify-content: center;
        .item-ban{
            flex: 1;
            .ban-svg{
                border-radius: 1rem;
                background: lightgrey;
                padding:0.3rem;
            }
        }
        .item-content{
            flex: 4;
            display: block;
            white-space: nowrap;
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            
        }
        .item-empty{
            flex:1;
        }
        .item-money{
            flex: 1;
            display: inline-block;
            text-align: right;
            margin-right: 0.5rem;
        }
    }
    .item-line{
        border-top: 1px solid grey;
        margin-left: 14%;
    }  
}

.tip-time /deep/ .el-input__inner{
    width:30px;
    padding-left:0px;
    padding-right:0px;
    border:1px solid rgb(117, 194, 238);
    background-color: rgb(117, 194, 238);
}
.tip-time /deep/ .el-input__icon{
    width:1px;
}
.tip-time /deep/ .el-date-editor.el-input{
    width:20px;
}
.tip-time /deep/ .el-input__prefix{
    color: black;
}

/****下面是列表css*****/
.center-content{
    background-color: rgb(241, 238, 238);
    .content-panel{
        background-color: white;
        padding: 0.5rem;
        margin: 0.5rem;
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
.center{
    .load-more{
    	text-align:center;
    }
}
</style>
