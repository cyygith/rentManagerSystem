<template>
    <div class="add-panel">
        <div class="cal-panel">
            <div class="momey-panel">
                <div class="money-mark">
                    <div class="m-mark">
                        备注：
                        <input class="mark-input" type="text" v-model="form.mark"/>
                    </div>
                    <div class="m-money">{{sum}}</div>
                </div>
            </div>
            <div class="num-panel">
                <table class="num-table">
                    <tr>
                        <td @click="changeNum(1)">1</td>
                        <td @click="changeNum(2)">2</td>
                        <td @click="changeNum(3)">3</td>
                        <td style="text-align:left">
                            <div class="tip-time">
                                <el-date-picker format="yyyy/MM/dd" value-format="yyyy/MM/dd" size="mini" v-model="form.time"> </el-date-picker>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td @click="changeNum(4)">4</td>
                        <td @click="changeNum(5)">5</td>
                        <td @click="changeNum(6)">6</td>
                        <td @click="changeNum('+')">+</td>
                    </tr>
                    <tr>
                        <td @click="changeNum(7)">7</td>
                        <td @click="changeNum(8)">8</td>
                        <td @click="changeNum(9)">9</td>
                        <td @click="changeNum('-')">-</td>
                    </tr>
                    <tr>
                        <td @click="changeNum('.')">.</td>
                        <td @click="changeNum(0)">0</td>
                        <td @click="backNum">退格</td>
                        <td>
                            <span v-if="!showplus" @click="saveOrUpdate">完成</span>
                            <span v-if="showplus" @click="calSum">=</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {accountApi} from "@/service/account-api";
import {dateTime} from "@/utils/DateUtil";
export default {
    data() {
        return {
            form:{
                id:'',
                type:'',
                money:'',
                time:'',
                mark:'',
                category:'',
                userId:''
            },
            sum:'0',
            showplus:false,
            showTime:false
        }
    },
    mounted(){
        this.queryById();

    },
    props:{
        checkrow:{
            default: ()=>{
                return '';
            }
        }
    },
    computed:{

    },
    created(){

    },
    watch:{
        "form.time":function(){
            this.showTime=true;
        },
        checkrow:{
            deep:true,
            handler(newVal,oldVal){
                console.log("come to linster,newVal:"+newVal);
                console.log("val:"+newVal.type);
                this.type = newVal.type;
            }
        }
    },
    updated(){
        console.log("data update....");
    },
    methods:{
        //退出登录
        logout(){
            this.$router.push('/login');
        },
        //九宫格加减，如果遇到+或者-的时候，直接
        changeNum(num){
            if(this.sum == '0'){
                this.sum = '';
            }
            if(num=='+'||num=='-'){
                let last = this.sum.substring(this.sum.length-1,this.sum.length); 
                if(last=='+'||last=='-'){
                    this.sum = this.sum.substring(0,this.sum.length-1);
                }
                this.showplus = true;
            }
            this.sum = this.sum + num;
        },
        //退格
        backNum(){
            let last = this.sum.substring(this.sum.length-1,this.sum.length); 
            if(last=='+'||last=='-'){
                this.showplus = false;//显示完成
            }
            this.sum = this.sum.substring(0,this.sum.length-1);
        },
        //等于合计
        calSum(){
            let arr = this.sum.split(/[+,-]/);
            let tmpRes = eval(this.sum);
            let res = Math.round(tmpRes * 100) / 100;
            this.sum = res+'';
            this.showplus = false;//显示完成
        },
        //选择时间
        chooseTime(){
            this.showTime = false
        },
        //查询数据
        queryById(){
            let now = new Date();
            this.form.time = dateTime.getFormatTime('yyyy-MM-dd');
            this.form.id = this.checkrow.id;
            this.form.type = this.checkrow.type;
            this.form.category = this.checkrow.category;

            if(this.form.id){
                let param = new URLSearchParams();
                param.append("id",this.form.id);
                
                accountApi.detail(param).then((res)=>{
                    console.log("res:"+ res);
                    if(res.code == "0"){
                        console.log(res.data);
                        this.form = res.data;
                        this.sum = this.form.money;
                    }else{
                        this.$alert('获取信息失败，请联系管理员处理','提示信息');
                    }
                });
            }
            
        },
        //保存到数据库
        saveOrUpdate(){
            let user = JSON.parse(sessionStorage.getItem('user'));
            if(user) {
                this.form.userId = user.userId;
            }else{
                this.form.userId = 0;
            }

            this.form.type = this.checkrow.type;
            this.form.category = this.checkrow.category;

            console.log('when save,type:'+this.form.type);
            console.log('when save,type:'+this.form.category);

            this.form.money = this.sum;
            let param = this.form;
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            accountApi.saveOrUpdate(param).then((res)=>{
                if(res.code == "0"){
                    this.$message({
                        message: '提交成功',
                        center: true,
                        type: 'success',
                        customClass:'customClass',
                        offset:300
                    })
                    this.$emit('closechild');
                }else{
                    this.$alert('提交失败，请联系管理员处理','提示信息');
                }
                loading.close();
            });	

        }
    }
}
</script>

<style lang="scss" scoped>

.cal-panel{
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    height: 30%;
    background-color: rgba(195, 199, 198, 0.596);
    .momey-panel{
        height: 10%;
        padding: 0.5rem 0.2rem 0.4rem 0.2rem;
        .money-mark{
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            font-size: 0.8rem;
            position: relative;
            .m-mark{
                white-space: nowrap;
                .mark-input{
                    background-color:lightgrey;
                    border: 0px;
                }
            }
            .m-money{
                position: absolute;
                right: 0;
                top:0;
                white-space: nowrap;
                font-size: 0.9rem;
                font-weight: bold;
                display: inline-block;
                text-align: right;
            }
        }
        .money-item{
            flex:1;
            display: flex;
            justify-content: end;
        }
    }
}
    /**数字键盘***/
    .num-panel{
        height: 80%;
    }
    .num-table{
        height: 100%;
        width: 100%;
    }
    td{
        text-align: center;
        width: 25%;
        border: 1px solid black;
    }
    td:hover{
        background-color: rgba(240, 236, 237, 0.582);
        color: black;
    }

.tip-time{
    font-size: 0.7rem;
}
.tip-time /deep/ .el-input__icon:before{
    display: none;
}
.tip-time /deep/ .el-input__inner{
    width:5rem;
    padding-left:0px;
    padding-right:0px;
    margin-left: 0.2rem;
    border:1px solid rgba(195, 199, 198, 0.596);
    background-color: rgba(195, 199, 198, 0.596);
    height:20px;
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
</style>
