<template>
    <div class="bill-panel">
        <div class="head-panel">
            <button @click="backBefore"  class="btnclass head-back">< 返回</button>
        </div>
        <div class="content-panel">
            <div class="c-item">
                <div class="cc-name">房屋编号</div>
                <div class="cc-value">{{out.groupName}} {{out.houseName}}</div>
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
        this.out.groupName = this.$route.query.groupName;
        this.out.houseName = this.$route.query.houseName;
        this.form.houseCode = this.$route.query.houseCode;
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
            let houseCode = this.$route.query.houseCode;
            let param = new URLSearchParams();
            param.append("houseCode",houseCode);
            let loading = this.$loading({lock:true,text:'获取中....',background:'rgba(0,0,0,0.5)'});
            billApi.getByCondition(param).then((res)=>{
                if(res.code == "0"){
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
