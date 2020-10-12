<template>
    <div class="bill-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back">< 退回</button>
            <button class="btnclass head-save" @click="save">完成</button>
            <button class="btnclass head-save" @click="toReceipt">生成收据</button>
        </div>
        <div class="content-panel">
            <div class="c-item">
                <div class="cc-name">房屋编号</div>
                <div class="cc-value">{{form.groupName}} {{form.houseName}}</div>
            </div>
            <div class="c-item">
                <div class="cc-name">租金</div>
                <div class="cc-value" @click="toEdit('money',form.money);">{{form.money}}元<span class="ccc-span">></span></div>
            </div>
            <div class="c-item">
                <div class="cc-name">起止时间</div>
                <div class="cc-value" @click="toEdit('startTime',form.startTime);">{{form.startTime}}至 {{form.endTime}}<span class="ccc-span">></span></div>
            </div>
            <div class="c-item">
                <div class="cc-name">上月电度</div>
                <div class="cc-value" @click="toEdit('lastElectric',form.lastElectric);">{{form.lastElectric}}<span class="ccc-span">></span></div>
            </div>
            <div class="c-item">
                <div class="cc-name">本月电度</div>
                <div class="cc-value" @click="toEdit('currElectric',form.currElectric);">{{form.currElectric}}<span class="ccc-span">></span></div>
            </div>
            <div class="c-item">
                <div class="cc-name">水费结算方式</div>
                <div class="cc-value" @click="toEdit('waterPayType',form.waterPayType);">{{form.waterPayTypeName}}<span class="ccc-span">></span></div>
            </div>
            <div class="c-item" v-if="form.waterPayType == '2'">
                <div class="cc-name">租住人数</div>
                <div class="cc-value" @click="toEdit('rentNum',form.rentNum);">{{form.rentNum}}人<span class="ccc-span">></span></div>
            </div>
            <div class="c-item" v-if="form.waterPayType == '1'">
                <div class="cc-name">上月水吨数</div>
                <div class="cc-value" @click="toEdit('lastWater',form.lastWater);">{{form.lastWater}}吨<span class="ccc-span">></span></div>
            </div>
            <div class="c-item" v-if="form.waterPayType == '1'">
                <div class="cc-name">本月水吨数</div>
                <div class="cc-value" @click="toEdit('currWater',form.currWater);">{{form.currWater}}吨<span class="ccc-span">></span></div>
            </div>
            <div class="c-item">
                <div class="cc-name">支付方式</div>
                <div class="cc-value" @click="toEdit('payType',form.payType);">{{form.payTypeName}}<span class="ccc-span">></span></div>
            </div>
            <div class="c-item">
                <div class="cc-name">备注</div>
                <div class="cc-value" @click="toEdit('remark',form.remark);">{{form.remark}}<span class="ccc-span">></span></div>
            </div>
            <div class="c-item">
                <div class="cc-value smallsize">费用小计：{{this.form.money}}元+{{this.waterFee}}(水)+{{this.elecFee}}(电)</div>
            </div>
            <div class="c-item">
                <div class="cc-value cc-amount">合计：{{form.sum}}元</div>
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
            	contractCode:'',
            	houseCode:'',
            	money:'',
            	startTime:'',
            	endTime:'',
            	lastElectric:0,
            	currElectric:0,
                waterPayType:'',
                waterPayTypeName:'',
            	rentNum:0,
            	lastWater:0,
            	currWater:0,
                payType:'',
                payTypeName:'',
            	status:'',
            	orderNum:'',
            	remark:'',
            	sum:0,
            	createTime:'',
            	updateTime:'',
                groupName:null,
                houseName:null

            },
            out:{
                groupName:'',
                houseName:'',
            },
            waterPayTypeArr:{1:'按吨结算',2:'按人计算'},
            payTypeArr:{1:'支付宝',2:'微信',3:'现金'},
            waterFee:0,
            elecFee:0
        }
    },
    computed:{

    },
    mounted(){
        this.doRent();
    },
    watch:{
        "form.sum":function(){
            if(this.form.waterPayType == '1'){//水费按吨结算
                if(this.form.currWater!=null&&this.form.lastWater!=null){
                    this.waterFee = parseFloat(this.form.currWater - this.form.lastWater)*5;
                }
            }else{//按人数算
                if(this.form.rentNum!=null){
                    this.waterFee = this.form.rentNum * 10;
                }
                
            }
            if(this.form.currElectric!=null&&this.form.lastElectric!=null&&this.form.currElectric!=""){
                this.elecFee = this.form.currElectric - this.form.lastElectric;//电费
            }

            this.form.sum = parseFloat(this.form.money==''?0:this.form.money)+parseFloat(this.elecFee)+parseFloat(this.waterFee);
        },
    
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
        //编辑详情
        toEdit(item,value){
            this.$router.push({path:'rentBillModify',query:{id:this.form.id,showItem:item,showItemValue:value,houseCode:this.form.houseCode}});
        },
        //完成
        save(item,value){
            let param = {
                id:this.form.id,
                sum:this.form.sum,
                status:'1'
            };
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            billApi.saveOrUpdate(param).then((res)=>{
                if(res.code == "0"){
                    this.$message({
                        message: '生成成功',
                        center: true,
                        type: 'success',
                        customClass:'customClass',
                        offset:300
                    })
                }else{
                    this.$alert('提交失败，请联系管理员处理','提示信息');
                }
                loading.close();
            });	
        },
        toReceipt(item,value){
            // this.$router.push({path:'rentReceipt',query:{id:this.form.id}});
            let param = {
                id:this.form.id,
                sum:this.form.sum,
                status:'1'
            };
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            billApi.getPdf(param).then((res)=>{
                if(res.code == "0"){
                    this.$message({
                        message: '生成成功',
                        center: true,
                        type: 'success',
                        customClass:'customClass',
                        offset:300
                    })
                }else{
                    this.$alert('提交失败，请联系管理员处理','提示信息');
                }
                loading.close();
            });	
        },
        // 从收租界面跳过来
        doRent(){
            let houseCode = this.$route.query.houseCode;
            let houseId = sessionStorage.getItem("houseId");
            let param = new URLSearchParams();
            param.append("houseCode",houseCode);
            if(!!houseId) {
                param.append("id",houseId);
            }
            // let param = {
            //     houseCode:houseCode
            // }
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            billApi.doRent(param).then((res)=>{
                if(res.code == "0"){
                    console.log("收租完是什么:");
                    console.dir(res.data);
                    if(res.data){    
                        this.form = res.data;
                        this.form.waterPayTypeName = this.waterPayTypeArr[res.data.waterPayType];//水费支付方式
                        this.form.payTypeName = this.payTypeArr[res.data.payType];//电费支付方式
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            });	 
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../common/commonstyle.css';
.bill-panel{
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
