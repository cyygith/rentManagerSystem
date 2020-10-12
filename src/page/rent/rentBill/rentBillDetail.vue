<template>
    <div class="bill-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back">< 返回</button>
            <button class="btnclass head-save" @click="toReceipt">生成收据</button>
        </div>
        <div class="content-panel">
            <div class="c-item">
                <div class="cc-name">房屋编号</div>
                <div class="cc-value">{{form.groupName}} {{form.houseName}}</div>
            </div>
            <div class="c-item">
                <div class="cc-name">租金</div>
                <div class="cc-value">{{form.money}}元</div>
            </div>
            <div class="c-item">
                <div class="cc-name">起止时间</div>
                <div class="cc-value">{{form.startTime}}至 {{form.endTime}}</div>
            </div>
            <div class="c-item">
                <div class="cc-name">上月电度</div>
                <div class="cc-value">{{form.lastElectric}}</div>
            </div>
            <div class="c-item">
                <div class="cc-name">本月电度</div>
                <div class="cc-value">{{form.currElectric}}</div>
            </div>
            <div class="c-item">
                <div class="cc-name">水费结算方式</div>
                <div class="cc-value">{{form.waterPayTypeName}}</div>
            </div>
            <div class="c-item" v-if="form.waterPayType == '2'">
                <div class="cc-name">租住人数</div>
                <div class="cc-value">{{form.rentNum}}人</div>
            </div>
            <div class="c-item" v-if="form.waterPayType == '1'">
                <div class="cc-name">上月水吨数</div>
                <div class="cc-value">{{form.lastWater}}吨</div>
            </div>
            <div class="c-item" v-if="form.waterPayType == '1'">
                <div class="cc-name">本月水吨数</div>
                <div class="cc-value">{{form.currWater}}吨</div>
            </div>
            <div class="c-item">
                <div class="cc-name">支付方式</div>
                <div class="cc-value">{{form.payTypeName}}</div>
            </div>
            <div class="c-item">
                <div class="cc-name">备注</div>
                <div class="cc-value">{{form.remark}}</div>
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
        this.detail();
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
        // 获取详情
        detail(){
            let id = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",id);
            console.log("param....");
            console.dir(id);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            billApi.getByCondition(param).then((res)=>{
                if(res.code == "0"){
                    console.log("rentBillDetail.....");
                    console.dir(res.data);
                    if(res.data){    
                        this.form = res.data;
                        this.form.waterPayTypeName = this.waterPayTypeArr[res.data.waterPayType];
                        this.form.payTypeName = this.payTypeArr[res.data.payType];
                    }
                }else{
                    this.$alert('获取信息失败，联系管理员','提示信息');
                }
                loading.close();
            });	
        },
        //生成房屋收据
        toReceipt(item,value){
            let id = this.$route.query.id;
            let param = new URLSearchParams();
            param.append("id",id);
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
                    this.$alert('提交失败，请联系管理员处理',res.msg);
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
