<template>
    <div class="house-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back"><&nbsp;退回</button>
            <button class="btnclass head-save" @click="saveOrUpdate">保存</button>
        </div>
        <div class="content-panel overflow-content">
            <div class="c-item" v-if="ifNew||showItem==='houseName'"> 
                <div>房屋名称:</div>
                <input  placeholder="请输入房屋名称"  class="c-input" name="houseName" v-model="form.houseName">
            </div>
            <div class="c-group c-item" v-if="ifNew||showItem==='groupCode'">
                <div>房组编号:{{form.groupCode}}</div>
                <span v-for='(tItem,tIndex) in groups' :key="tIndex" class="c-g-item" @click="changeGroup(tItem);" :class="{'c-g-item-this':form.groupCode==tItem.groupCode}">{{tItem.groupName}}</span>
            </div>
            <div class="c-item" v-if="ifNew||showItem==='houseAddress'">
                <div>房屋地址:</div>
                <input  placeholder="请输入房屋地址"  class="c-input" name="houseAddress" v-model="form.houseAddress">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='houseArea'">
                <div>房屋面积:</div>
                <input type="number"  placeholder="请输入面积"  class="c-input" name="houseArea" v-model="form.houseArea">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='housePrice'">
                <div>租金:</div>
                <input type="number"  placeholder="请输入租金"  class="c-input" name="housePrice" v-model="form.housePrice">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='status'">
                <div>状态:</div>
                <span class="c-g-item" @click="changeStatus('1');" :class="{'c-g-item-this':form.status=='1'}">启用</span>
                <span class="c-g-item" @click="changeStatus('0');" :class="{'c-g-item-this':form.status=='0'}">禁用</span>
            </div>
            <!-- <div class="c-item" v-if="ifNew||showItem==='orderNum'">
                <div>排序号:</div>
                <input  placeholder="请输入排序号"  class="c-input" name="orderNum" v-model="form.orderNum">
            </div> -->
            <div class="c-item" v-if="ifNew||showItem==='remark'">
                <div>备注:</div>
                <textarea placeholder="请输入备注" rows="5" class="c-textarea" name="remark" v-model="form.remark"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
import {houseApi,groupApi} from "@/service/rent-api";
export default {
    data() {
        return {
            id:'',
            form:{
            	id:null,
            	houseCode:'H0',
            	houseName:null,
            	groupCode:null,
            	houseAddress:null,
            	houseArea:null,
            	housePrice:null,
            	status:null,
            	orderNum:null,
            	remark:null,
            	createTime:null,
            	updateTime:null,
            },
            ifNew:false, //是否为新增，如果新增，则不加一个个过滤
            showItem:'',
            showItemValue:'',
            groups:[{'groupName':'17号房组'},{'groupName':'94号房组'}],
            page:{
            	pageSize:10,
            	currPage:1,
            	totalPage:0
            },
        }
    },
    computed:{
        
    },
    mounted(){
        this.id = this.$route.query.id;
        this.form.id = this.$route.query.id;
        this.showItem = this.$route.query.showItem;
        this.form[this.showItem] = this.$route.query.showItemValue;
        this.ifNew = this.$route.query.ifNew;
        this.getGroup();//获取组别情况
        if(!this.ifNew){ //如果不是新的，则查询
            this.detail();
        }
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
        changeGroup(item){
            console.dir(item);
            this.form.groupCode = item.groupCode;
        },
        changeStatus(val){
            this.form.status = val;
        },
        // 获取详情
        detail(){
            let ID = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",ID);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            houseApi.detail(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){    
                        this.form = res.data;
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            });	
        },
        //获取组别情况
        getGroup(){
            let param = new URLSearchParams();
            param.append("page",this.page.currPage);
            param.append("size",this.page.pageSize);
            groupApi.list(param).then((res)=>{
                if(res.code == "0"){
                    this.groups = res.data.list;
                    this.page.pageSize = res.data.pageSize;
                    this.page.totalCount = res.data.total;
                }else{
                    this.$alert('获取组别信息失败，联系管理员','提示信息');
                }
            });	
        },
        //保存到数据库
        saveOrUpdate(){
            let param = this.form;
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            houseApi.saveOrUpdate(param).then((res)=>{
                if(res.code == "0"){
                    this.$message({
                        message: '提交成功',
                        center: true,
                        type: 'success',
                        customClass:'customClass',
                        offset:300
                    })
                    this.$router.back(-1);
                }else{
                    this.$alert('提交失败，请联系管理员处理','提示信息');
                }
                loading.close();
            });	

        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/custom-module/mobileCommon.css';
.house-panel{
    background-color: grey;
    
    .c-item{
        // display: flex;
        // flex-direction: row;
        line-height: 2rem;
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
