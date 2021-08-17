<template>
  <div>
    <nav-bar><div slot="center">购物车({{ length }})</div></nav-bar>
    <!-- 商品列表 -->
     <scroll class="content" ref="scroll" :pull-up-load="false">
    <cart-list></cart-list>
     </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "../../components/common/navbar/NavBar.vue";
import CartBottomBar from './childComps/CartBottomBar.vue';
import CartList from "./childComps/CartList.vue";
import scroll from '../../components/common/BetterSroll/Scroll.vue';
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    scroll
  },
  computed: {
    //mapgetters辅助函数 仅仅是将store中的getter映射到局部计算属性
    ...mapGetters({
      length: "cartLength",
    }),
  },
   activated() {
    this.$refs.scroll.scroll.refresh();
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: #ff8198;
  color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 89px;
  overflow: hidden;
  width: 100%;
}
</style>
