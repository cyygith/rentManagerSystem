<template>
    <div class="house-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back"><&nbsp;退回</button>
            <button class="btnclass head-save" @click="saveOrUpdate">保存</button>
        </div>
        <div class="content-panel">
            <div class="c-item" v-if="showItem=='houseCode'">
                <input type="number" placeholder="请输入房屋编号"  class="c-input" name="houseCode" v-model="form.houseCode">
            </div>
            <div class="c-item" v-if="ifNew|showItem=='houseName'"> 
                <input type="number" placeholder="请输入房屋名称"  class="c-input" name="houseName" v-model="form.houseName">
            </div>
            <div class="c-item" v-if="showItem=='groupCode'">
                <input type="number" placeholder="请输入房组编号"  class="c-input" name="groupCode" v-model="form.groupCode">
            </div>
            <div class="c-item" v-if="showItem=='houseAddress'">
                <input type="number" placeholder="请输入房屋地址"  class="c-input" name="houseAddress" v-model="form.houseAddress">
            </div>
            <div class="c-item" v-if="showItem=='houseArea'">
                <input type="number" placeholder="请输入面积"  class="c-input" name="houseArea" v-model="form.houseArea">
            </div>
            <div class="c-item" v-if="showItem=='housePrice'">
                <input type="number" placeholder="请输入租金"  class="c-input" name="housePrice" v-model="form.housePrice">
            </div>
            <div class="c-item" v-if="showItem=='status'">
                <input type="number" placeholder="请输入状态"  class="c-input" name="status" v-model="form.status">
            </div>
            <div class="c-item" v-if="showItem=='orderNum'">
                <input type="number" placeholder="请输入排序号"  class="c-input" name="orderNum" v-model="form.orderNum">
            </div>
            <div class="c-item" v-if="showItem=='remark'">
                <input type="number" placeholder="请输入备注"  class="c-input" name="remark" v-model="form.remark">
            </div>
        </div>
    </div>
</template>
<script>
import {houseApi} from "@/service/rent-api";
export default {
    data() {
        return {
            id:'',
            form:{
            	id:null,
            	houseCode:null,
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
            showItemValue:''
        }
    },
    computed:{

    },
    mounted(){
        this.detail();
        this.id = this.$route.query.id;
        this.form.id = this.$route.query.id;
        this.showItem = this.$route.query.showItem;
        this.form[this.showItem] = this.$route.query.showItemValue;
        this.ifNew = this.$route.query.ifNew;
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
        // 获取详情
        detail(){
            let ID = this.$route.query.ID;
            let param = new URLSearchParams();
            param.append("ID",ID);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            houseApi.getByCondition(param).then((res)=>{
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
    position: relative;
    .c-item{
        display: flex;
        flex-direction: row;
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
