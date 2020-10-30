<template>
    <div class="contract-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore"  class="btnclass head-back"><&nbsp;退回</button>
            <button class="btnclass head-save" @click="saveOrUpdate">保存</button>
        </div>
        <div class="content-panel overflow-content">
            <div class="c-item" v-if="ifNew||showItem==='contractName'">
                <div>合同名称:</div>
                <input placeholder="请输入合同名称"  class="c-input" name="contractName" v-model="form.contractName">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='houseCode'">
            	<div>房屋编号:</div>
            	<el-select v-model="form.houseCode"  placeholder="请选择" filterable style="width:90%" size="small">
                    <el-option-group v-for="group in groupHouseList" :key="group.value" :label="group.label">
                        <el-option
                            v-for="item in group.option"
                            :key="item.houseCode"
                            :label="item.houseName"
                            :value="item.houseCode">
                        </el-option>
                    </el-option-group>
                </el-select> 
            </div>
            <div class="c-item" v-if="ifNew||showItem==='personCode'">
                <div>租客编号:</div>
                <el-select v-model="form.personCode"  placeholder="请选择" filterable style="width:90%" size="small">
                    <el-option
                        v-for="item in personList"
                        :key="item.personCode"
                        :label="item.personName"
                        :value="item.personCode">
                    </el-option>
                </el-select>
            </div>
            <div class="c-item" v-if="ifNew||showItem==='signTime'">
                <div>签约时间:</div>
                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd"   v-model="form.signTime"> </el-date-picker>
            </div>
            <div class="c-item" v-if="ifNew||showItem==='startTime'">
                <div>开始时间:</div>
                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd"  v-model="form.startTime"> </el-date-picker>
            </div>
            <div class="c-item" v-if="ifNew||showItem==='endTime'">
                <div>结束时间:</div>
                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.endTime"> </el-date-picker>
            </div>
            <div class="c-item" v-if="ifNew||showItem==='renter'">
                <div>租金:</div>
                <input type="number" placeholder="请输入租金"  class="c-input" name="renter" v-model="form.renter">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='deposit'">
                <div>押金:</div>
                <input type="number"  placeholder="请输入押金"  class="c-input" name="deposit" v-model="form.deposit">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='waterCloseType'">
                <div>水费结算方式:</div>
                <span class="c-g-item" v-for='(val,key) in waterCloseTypes' :key="key" @click="changeWaterCloseType(key);" :class="{'c-g-item-this':form.waterCloseType==key}">{{val}}</span>
            </div>
            <div class="c-item" v-if="ifNew||showItem==='payType'">
                <div>付款方式:</div>
                <span class="c-g-item" v-for='(val,key) in payTypes' :key="key" @click="changePayType(key);" :class="{'c-g-item-this':form.payType==key}">{{val}}</span>
            </div>
            <div class="c-item" v-if="ifNew||showItem==='status'">
                <div>状态:</div>
                <span class="c-g-item" v-for='(val,key) in statuss' :key="key" @click="changeStatus(key);" :class="{'c-g-item-this':form.status==key}">{{val}}</span>
            </div>
            <div class="c-item" v-if="ifNew||showItem==='orderNum'">
                <div>排序号:</div>
                <input type="number"  placeholder="请输入排序号"  class="c-input" name="orderNum" v-model="form.orderNum">
            </div>
            <div class="c-item" v-if="ifNew||showItem==='remark'">
                <div>备注:</div>
                <textarea placeholder="请输入备注" rows="5" class="c-textarea" name="remark" v-model="form.remark"></textarea>
            </div>
        </div>
        <div class="foot-panel"> </div>
    </div>
</template>
<script>
import {contractApi,personApi,groupApi} from "@/service/rent-api";
export default {
    data() {
        return {
            id:'',
            form:{
            	id:null,
            	contractCode:null,
            	contractName:null,
            	houseCode:null,
            	personCode:null,
            	signTime:null,
            	startTime:null,
            	endTime:null,
            	renter:null,
            	deposit:null,
            	waterCloseType:null,
            	payType:null,
            	status:null,
            	orderNum:null,
            	remark:null,
            	createTime:null,
            	updateTime:null,
            	tenantId:null,
            },
            ifNew:false, //是否为新增，如果新增，则不加一个个过滤
            showItem:'',
            showItemValue:'',
            defaultProps: {
	          label: 'name',
	          isLeaf: 'isLeaf'
            },
            isDetail:false,
            personList:[],
            groupHouseList:[],
            waterCloseTypes:{},//水费结算方式
            payTypes:{},//付款方式
            statuss:{},//付款方式
        }
    },
    computed:{

    },
    mounted(){
        this.showItem = this.$route.query.showItem;
        this.form[this.showItem] = this.$route.query.showItemValue;
        this.ifNew = this.$route.query.ifNew;
        if(!this.ifNew){ //如果不是新的，则查询
            this.detail();
        };
        this.getListByGroup();//获取用户组信息
        this.getPersonList();//获取用户列表信息
        this.initDict();//初始化字典数据
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
        changeStatus(val){
            this.form.status = val;
        },
        changePayType(val){
            this.form.payType = val;
        },
        changeWaterCloseType(val){
            this.form.waterCloseType = val;
        },
        //初始化字典数据
        initDict(){
            //水费结算方式
            this.dictApi.getDictByType({"typeCode":this.dictApi.dict.typeCodeCd.waterCloseType}).then((item)=>{
                this.waterCloseTypes = item;
            });
            //付款方式
            this.dictApi.getDictByType({"typeCode":this.dictApi.dict.typeCodeCd.payType}).then((item)=>{
                this.payTypes = item;
            });
            //付款方式
            this.dictApi.getDictByType({"typeCode":this.dictApi.dict.typeCodeCd.useNo}).then((item)=>{
                this.statuss = item;
            });

        },
        // 获取详情
        detail(){
            let ID = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",ID);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            contractApi.getByCondition(param).then((res)=>{
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
            contractApi.saveOrUpdate(param).then((res)=>{
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
            }).catch(error=>{
                loading.close();
            });	
        },
        //获取房屋列表
        getListByGroup(){
            let param = new URLSearchParams();
            param.append("page",0);
            param.append("size",1000);
            groupApi.getListByGroup(param).then((res)=>{
                if(res.code == "0"){
                    console.log("fangwuliebiao ....");
                    console.dir(res);
                    console.dir(res.data)
                  this.groupHouseList = res.data;
                }else{
                  this.$message({showClose:true,message:'程序出现异常，请联系管理员处理'});
                }
            });
        },
        //获取列表
        getPersonList(){
            let param = new URLSearchParams();
            param.append("page",0);
            param.append("size",1000);
            personApi.list(param).then((res)=>{
                if(res.code == "0"){
                  this.personList = res.data.list;
                }else{
                  this.$message({showClose:true,message:'程序出现异常，请联系管理员处理'});
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/custom-module/mobileCommon.css';
.contract-panel{
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
