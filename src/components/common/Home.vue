<template>
    <div class="wrapper">
        <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
                <router-view></router-view>
            </keep-alive>
        </transition>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vFooter from './footer.vue';
    import bus from './bus';
    export default {
        name: 'home',
        data(){
            return {
                tagsList: ['mainpage','me'],
                collapse: false
            }
        },
        components:{
            vFooter
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>
<style scoped>

</style>