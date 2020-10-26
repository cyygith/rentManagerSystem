<template>
    <div class="float_button">
        <div @click="onBtnClicked" ref="floatButton" class="float_info" :style="{'width':itemWidth+'px','height':itemHeight+'px','left':left+'px','top':top+'px'}">
        	<img src="../../assets/img/img.jpg"></img>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                clientWidth:0,
                clientHeight: 0,
                timer: null,
                currentTop: 0,
                left: 0,
                top: 0,
            }
        },
        props:{
        	text:{type:String,default:"首页"},   //按钮文本内容
        	itemWidth:{type:Number,default:40},   //悬浮按钮宽度
        	itemHeight:{type:Number,default:50},   //悬浮按钮高度
        	gapWidth:{type:Number,default:0},   //距离左右两边距离
        	coefficientHeight:{type:Number,default:0.55},   //从上到下距离比例
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
           this.clientWidth = document.documentElement.clientWidth;
		   this.clientHeight = document.documentElement.clientHeight;
		   
           this.left = this.clientWidth - this.itemWidth - this.gapWidth;
		   this.top = this.clientHeight*this.coefficientHeight;
        },
        methods:{
            onBtnClicked(){
				// this.$emit("onFloatBtnClicked");
				this.$router.push('/rentHome');
            },
            handleScrollStart(){
            	this.timer&&clearTimeout(this.timer);
            	this.timer = setTimeout(()=>{
            		this.handleScrollEnd()
            	},300);
            	this.currentTop = document.documentElement.scrollTop||document.body.scrollTop;
            	if(this.left > this.clientWidth/2){
            		this.left = this.clientWidth - this.itemWidth/2
            	}else{
            		this.left = -this.itemWidth/2;
            	}
            },
            handleScrollEnd(){
            	let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            	if(scrollTop === this.currentTop){
            		if(this.left> this.clientWidth/2){
            			this.left = this.clientWidth - this.itemWidth - this.gapWidth;
            		}else{
            			this.left = this.gapWidth;
            		}
            		clearTimeout(this.timer);
            	}
            },
        },
        mounted(){
        	this.$nextTick(()=>{
        		const floatButton = this.$refs.floatButton;
        		floatButton.addEventListener("touchstart",()=>{
        			floatButton.style.transition = 'none';
        		});
        		
        		//在拖拽的过程中，组件应该跟随手指的移动而移动
        		floatButton.addEventListener("touchmove",(e)=>{
        			console.log("移动中",e);
        			if(e.targetTouches.length === 1){   //一根手指
        				let touch = e.targetTouches[0];
        				this.left = touch.clientX - 20;
        				this.top = touch.clientY - 25;
        			}
        		});
        		
        		//拖拽结束以后，重新调整组件的位置并重新设置过度动画
        		floatButton.addEventListener("touchend",()=>{
        			floatButton.style.transition = 'all 0.3s';
        			if(this.left>document.documentElement.clientWidth/2){
        				this.left = document.documentElement.clientWidth - 40;
        			}else{
        				this.left = 0;
        			}
        		});
        	});    
        },
        beforeDestroy(){
        	//添加监听页面滚动
        	window.removeEventListener('scroll',this.handleScrollStart);
        },
        destroyed(){
        
        }
        
    }
</script>

<style lang="scss" scoped> 
/***float-button相关css*****/    
.float_button{
    .float_info{
    	box-shadow:0 2px 10px 0 rgba(0,0,0,0.1);
    	color:#666666;
    	transition: all 0.3s;
    	position:fixed;
    	bottom:436px;
    	right:0;
    	width:80px;
    	height:100px;
    	display:flex;
    	flex-flow: column;
    	justify-content:center;
    	align-items:center;
    	z-index:999;
    	background:rgba(0,0,0,0.5s);
    	border-radius:14px;
    	cursor:pointer;
    	.text{
    		font-size:24px;
    		color:#fff
    	}
    	img{
    		width:55px;
			height:55px;
			border-radius:50px;
    	}
    
    }
}


</style>
