import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/rentHome'
    },
    {
      path: '/chooseCatalog',
      component: resolve => require(['../page/account/addbook/chooseCatalog.vue'], resolve),
    },
    {
      path: '/detail',
      component: resolve => require(['../page/account/addbook/detail.vue'], resolve),
    },
    {
      path: '/login',
      component: resolve => require(['../page/account/login/login.vue'], resolve),
    },
    {
      path: '/register',
      component: resolve => require(['../page/account/login/register.vue'], resolve),
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '首界面' },
      children: [ // 二级路由。对应App.vue
        {
          path: '',
          name: 'mainpage',
          component: resolve => require(['../page/account/main/mainpage.vue'], resolve),
          meta: { title: '主页' }
        },
        {
          path: '/me',
          name: 'me',
          component: resolve => require(['../page/account/me/me.vue'], resolve),
          meta: { title: '我的' }
        },
      ]
    },
    {
      path: '/rentHome',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '首界面' },
      children: [ // 二级路由。对应App.vue
        {
          path: '',
          name: 'mainpage',
          component: resolve => require(['../page/rent/main/mainpage.vue'], resolve),
          meta: { title: '主页' }
        },
        {
          path: '/me',
          name: 'me',
          component: resolve => require(['../page/rent/me/me.vue'], resolve),
          meta: { title: '我的' }
        },
      ]
    },
    //租房-账单管理
    {path: '/rentHouseChoose',component: resolve => require(['../page/rent/rentBill/rentHouseChoose.vue'], resolve)},
    {path: '/rentBill',component: resolve => require(['../page/rent/rentBill/rentBill.vue'], resolve)},
    {path: '/rentBillModify',component: resolve => require(['../page/rent/rentBill/rentBillModify.vue'], resolve)},
    {path: '/rentBillDetail',component: resolve => require(['../page/rent/rentBill/rentBillDetail.vue'], resolve)},
    {path: '/rentReceipt',component: resolve => require(['../page/rent/rentBill/rentReceipt.vue'], resolve)},
  ]
})

//访问之前，都检查下是否登录
// router.beforeEach((to,from,next)=>{
//   console.log("test if login:"+to.path);
//   if(to.path.indexOf('login')>-1){
//     window.sessionStorage.removeItem('access-token');
//   }else{
//     let token = window.sessionStorage.getItem('access-token');
//     console.log("isToken:"+token);
//     if(!token){
//       console.log("her.......");
//       next('/login')
//     }else{
//       next();
//     }
//   }
// })

export default router