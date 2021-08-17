<template>
  <tab-bar>
        <tab-bar-item path="/home" activeColor="deeppink">  
          <img src="@/assets/img/tabbar/home.svg" slot="item-icon" alt="" >
           <img src="@/assets/img/tabbar/home_active.svg" slot="item-icon-active" alt="">
          <div slot="item-next">首页</div>
        </tab-bar-item>
         <tab-bar-item path="/category" activeColor="deeppink">  
          <img src="@/assets/img/tabbar/category.svg" slot="item-icon" alt="">
           <img src="@/assets/img/tabbar/category_active.svg" slot="item-icon-active" alt="">
          <div slot="item-next">分类</div>
        </tab-bar-item>
         <tab-bar-item path="/cart" activeColor="deeppink">  
          <img src="@/assets/img/tabbar/shopcart.svg" slot="item-icon" alt="">
           <img src="@/assets/img/tabbar/shopcart_active.svg" slot="item-icon-active" alt="">
          <div slot="item-next">购物车</div>
        </tab-bar-item>
         <tab-bar-item path="/profile" activeColor="deeppink">  
          <img src="@/assets/img/tabbar/profile.svg" slot="item-icon" alt="">
           <img src="@/assets/img/tabbar/profile_active.svg" slot="item-icon-active" alt="">
          <div slot="item-next">我的</div>
        </tab-bar-item>
      </tab-bar>
</template>

<script>
import TabBar from '../../common/tabbar/TabBar.vue'
import TabBarItem from '../../common/tabbar/TabBarItem.vue'
export default {
 name:"MainTabbar",
 components:{
     TabBar,
   TabBarItem
 }
}
</script>

<style>

</style>