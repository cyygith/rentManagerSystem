<template>
    <div class="billItem-panel">
        <div class="head-panel fixed-head">
            <button @click="backBefore"  class="btnclass head-back"><&nbsp;退回</button>
            <button class="btnclass head-save" @click="saveOrUpdate">保存</button>
        </div>
        <div class="content-panel overflow-content">
            <div class="c-item" v-if="showItem=='money'">
                <input type="number" placeholder="请输入租金"  class="c-input" name="money" v-model="form.money">元
            </div>
            
            <div class="c-item" v-if="showItem=='startTime'">
                <el-date-picker placeholder="请输入开始时间"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" v-model="form.startTime" type="date"> </el-date-picker>
            </div>
            <div class="c-item" v-if="showItem=='startTime'">
                <el-date-picker placeholder="请输入结束时间"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"  size="small" v-model="form.endTime" type="date"> </el-date-picker>
            </div>

            <div class="c-item" v-if="showItem=='lastElectric'">
                <input type="number" placeholder="请输入上月电度数"  class="c-input" name="lastElectric" v-model="form.lastElectric">度
            </div>
            <div class="c-item" v-if="showItem=='currElectric'">
                <input type="number" placeholder="请输入本月电度数"  class="c-input" name="currElectric" v-model="form.currElectric">度
            </div>

            <div class="c-group c-item" v-if="showItem=='waterPayType'">
                <span class="c-g-item" @click="changeWaterPayType('1');" :class="{'c-g-item-this':form.waterPayType=='1'}">按吨结算</span>
                <span class="c-g-item" @click="changeWaterPayType('2');" :class="{'c-g-item-this':form.waterPayType=='2'}">按人结算</span>
            </div>
            <div class="c-item" v-if="showItem=='rentNum'">
                <input type="number" placeholder="请输入租住人数"  class="c-input" name="rentNum" v-model="form.rentNum">
            </div>

            <div class="c-item" v-if="showItem=='lastWater'">
                <input type="number" placeholder="请输入上月水吨数"  class="c-input" name="lastWater" v-model="form.lastWater">吨
            </div>
            <div class="c-item" v-if="showItem=='currWater'">
                <input type="number" placeholder="请输入本月水吨数"  class="c-input" name="currWater" v-model="form.currWater">吨
            </div>

            <div class="c-group c-item" v-if="showItem=='payType'">
                <span class="c-g-item" @click="changePayType('1');" :class="{'c-g-item-this':form.payType=='1'}">支付宝</span>
                <span class="c-g-item" @click="changePayType('2');" :class="{'c-g-item-this':form.payType=='2'}">微信</span>
                <span class="c-g-item" @click="changePayType('3');" :class="{'c-g-item-this':form.payType=='3'}">现金</span>
            </div>
            <div class="c-item" v-if="showItem=='personCodes'">
                <div class="addBtnDiv">
                    <span class="clearSpan" @click="addPerson">Add</span>
                    <span class="clearSpan" @click="searchPerson">search</span>
                </div>
				<div class="addContent" v-for='(tItem,tIndex) in form.personList' :key="tIndex">
					<input placeholder="请输入姓名"  class="b-c-name" name="personName" v-model="tItem.personName" >
					<input type="number" placeholder="请输入电话" class="b-c-phone" name="tel" v-model="tItem.tel">
                    <div class="delBtn" @click="delPerson(tIndex)"><strong>×</strong></div>
				</div>
            </div>

            <div class="c-item" v-if="showItem=='remark'" >
                <textarea placeholder="请输入备注" rows="5" class="c-textarea" name="remark" v-model="form.remark"></textarea>
            </div>
            <div class="clearDiv"><span class="clearSpan" @click="clearItem">清空</span></div>
        </div>
    </div>
</template>

<script>
import {billApi} from "@/service/rent-api";
import {dateTime} from "@/utils/DateUtil";
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
                personCodes:null,
                personList:[]
            },
            showItem:'',
            showItemValue:'',
        }
    },
    computed:{

    },
    mounted(){
        // this.detail();
        this.id = this.$route.query.id;
        this.form.id = this.$route.query.id;
        this.form.startTime = this.$route.query.startTime;
        this.form.houseCode = this.$route.query.houseCode;
        this.form.endTime = this.$route.query.endTime;
        this.showItem = this.$route.query.showItem;
        this.form[this.showItem] = this.$route.query.showItemValue;
        //如果是用户列表，则从后端获取数据
        if(this.showItem == 'personCodes'){
            this.detail();
        }
    },
    watch:{
        "form.startTime":function(){
            if(!!this.form.startTime)  
                this.form.endTime = dateTime.getNextMonthDate(this.form.startTime);
        }
    },
    methods:{
        //返回上一页
        backBefore(){
            this.$router.back(-1);
        },
        //更改付款方式
        changePayType(val){
            this.form.payType = val;
        },
        //更改水费付款方式
        changeWaterPayType(val){
            this.form.waterPayType = val;
        },
        //保存到数据库
        saveOrUpdate(){
            let param = this.form;

            if(this.validate()){
                let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
                billApi.saveOrUpdateBillAndPerson(param).then((res)=>{
                    if(res.code == "0"){
                        this.$message({
                            message: '保存成功',
                            center: true,
                            type: 'success',
                            customClass:'customClass',
                            offset:300
                        })
                        // this.$router.back(-1);
                    }else{
                        this.$alert('提交失败，请联系管理员处理','提示信息');
                    }
                    loading.close();
                }).catch(error=>{
                    loading.close();
                });	
            }


        },
        validate(){
            let flag = true;
            if(this.showItem == 'personCodes'){
                let ifAll = this.form.personList.some((item)=>{
                    if(item.personName.trim() == "" || item.tel == "") return true;
                })
                if(ifAll) {
                    this.$alert('人员列表中，用户名和手机号不能玩为空');
                    return false;
                }
            }
            return flag;
        },
        // 获取详情
        detail(){
            let id = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",id);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            billApi.getByCondition(param).then((res)=>{
                if(res.code == "0"){
                    if(res.data){    
                        // this.form = res.data;
                        if(res.data1!=null)
                            this.form.personList = res.data1;
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            });	
        },
        //清空
        clearItem(){
            this.form[this.showItem] = "";
        },
        //获取下个月当天
        getNextMonthDate(){
            this.form.endTime = dateTime.getNextMonthDate(this.form.startTime);
        },
        //新增用户
        addPerson(){
            let obj = {personName:'',tel:''};
            this.form.personList.push(obj);
        },
        //删除用户
        delPerson(index){
            this.form.personList.splice(index,1);
        },
        //通过手机号，搜索用户
        searchPerson(){
            console.log("search person")
        }
        
    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
.billItem-panel{
    background-color: grey;
    .content-panel{
        background-color: white;
    }
    .clearDiv{
        padding:1rem;
        text-align: right;
        margin-right: 1rem;
    }
    .clearSpan{
        padding:7px;
        background-color:lightblue;
    }
    .addBtnDiv{
		margin-bottom:0.7rem;
	}
    .addContent{
		display:flex;
        align-items:center;
        margin-bottom:0.5rem;
	}
		.b-c-name{
			width:25%;
			height:2rem;
			margin-right:0.5rem;
		}
		.b-c-phone{
			height:2rem;
			width:60%;
            margin-right:0.3rem;
		}
	.delBtn{
		width:20px;
		background-color:none;
		font-size:16px;
		color:red;
		border:1px solid red;
		border-radius:20px;
		text-align:center;
		cursor:pointer;
	}
}    
</style>
