<template>
    <div class="delete">
        <div class="slider">
            <div class="content" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" :style="deleteSlider">
                <!--默认插槽-->
                <slot></slot>
            </div>
            <div class="remove" :style="buttonCount" ref='remove'>
                <div v-if="dealItem.length>0" class="btnFlex deleteDiv" @click="funOne">
                    <div class="center-font">{{dealItem[0].name}}</div>
                </div>
                <div v-if="dealItem.length>1" class="btnFlex useDiv" @click="funTwo">
                    <div class="center-font">{{dealItem[1].name}}</div>
                </div>
                <div v-if="dealItem.length>2" class="btnFlex funThreeDiv" @click="funThree">
                    <div class="center-font">{{dealItem[2].name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'deleteSlider',
        data(){
            return {
                startX: 0,  //触摸位置
                endX: 0,  //结束位置
                MoveX: 0,  //滑动时的位置
                disX: 0,  //移动距离
                deleteSlider: '',  //触滑动时的效果，使用v-bind:style="deleteSlider",
                buttonCount:'',//总共有多少个button
                dealItem:''
            }
        },
        props:['dealArr'],
        created(){
            this.dealItem = this.dealArr;
            if(!!this.dealItem){
                let len = this.dealItem.length;
                this.buttonCount = "width:"+(len*60)+"px";
            }
        },
        methods:{
            touchStart(ev){
                ev = ev || event;
                //touches类数组，等于1时表示此时只有一只手在触摸屏幕
                if(ev.touches.length == 1){
                    this.startX = ev.touches[0].clientX;
                }
            },
            touchMove(ev){
                ev = ev || event;
                //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                let wd = this.$refs.remove.offsetWidth;
                if(ev.touches.length == 1){
                    //滑动时距离浏览器左侧事实距离
                    this.moveX = ev.touches[0].clientX;
                    //起始位置减去 实时的滑动距离，得到手指实时偏离距离
                    this.disX = this.startX - this.moveX;
                    // console.log("this.dix::::"+this.disX);
                    //如果是向右滑动或者不滑动，不改变滑块的位置
                    if(this.disX < 0 ||this.disX == 0){
                        this.deleteSlider = "transform:translateX(0px)";
                    }else if(this.disX > 0){//大于0，表示左滑了，此时滑块开始滑动
                        //具体的滑动距离取的是  手指偏移距离*5
                        this.deleteSlider = "transform:translateX(-"+this.disX*5+"px)";
                        //最大也只能等于删除按钮宽度
                        if(this.disX*5 >=wd){
                            this.deleteSlider = "transform:translateX(-"+wd+"px)";
                        }
                    }

                }
            },
            touchEnd(ev){
                ev = ev || event;
                //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                let wd = this.$refs.remove.offsetWidth;
                if(ev.changedTouches.length == 1){
                    let endX = ev.changedTouches[0].clientX;
                    this.disX = this.startX - endX;
                    // console.log("end  this.dix::::"+this.disX);
                    //如果距离小于删除按钮一半，强行回到起点
                    if((this.disX*5)< (wd/2)){
                        this.deleteSlider = "transform:translateX(0px)";
                    }else{
                        //大于一半 滑动到最大值
                        this.deleteSlider = "transform:translateX(-"+wd+"px)";
                    }
                }
            },
            funOne(){
                this.deleteSlider = "transform:translateX(0px)";
                this.$emit('funOne');
                console.log('funOne');
            },
            funTwo(){
                this.deleteSlider = "transform:translateX(0px)";
                this.$emit('funTwo');
                console.log('funTwo');
            },
            funThree(){
                this.deleteSlider = "transform:translateX(0px)";
                this.$emit('funThree');
            }
        }
    }
</script>
<style scoped>
/****下面是列表css*****/
.slider{
    width:100%;
    height: 90px;
    margin-bottom: 10px;
    position: relative
}
.content{
    position: absolute;
    padding-left: 0.5rem;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    transition: 0.3s;
    background-color: #fff;
    border-bottom: 1px solid #d3d3d3;
}
.remove{
    position: absolute;
    width:120px;
    height:89px;
    background-color: #f60;
    border: 1px solid white;
    right:0;
    top:0;
    color:#fff;
    text-align: center;
    display: flex;
    align-items: center;
}
.btnFlex{
    flex:1;
    width: 100%;
    height: 100%;
}
.deleteDiv{
    background-color: lightgrey;
}
.useDiv{
    background-color: #f60;
}
.funThreeDiv{
    background-color: orange;
}
.center-font{
    padding-top:50%;
}
</style>