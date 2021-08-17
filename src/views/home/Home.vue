<template>
  <div id="home" class="wrapper">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tabcontrol
      :titles="titles"
      @tabClick="tabclick"
      class="tab-control"
      v-show="isTabFixed"
      :class="{ fixed: isTabFixed }"
      ref="topTabCountrol"
    ></tabcontrol>

    <scroll
      class="content"
      :probe-type="3"
      :pull-up-load="true"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @imgLoad="imgLoad"></home-swiper>
      <!-- 十点抢券，好物特卖，内购福利，初秋上新 -->
      <rcommend :recommends="recommends"></rcommend>
      <!-- 一张图片 -->
      <feature-view></feature-view>
      <!-- 流行，新款，推荐栏块 -->
      <tabcontrol
        :titles="titles"
        @tabClick="tabclick"
        ref="tabcontrol"
      ></tabcontrol>
      <!-- 商品显示 -->
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <!-- 如果想对组件的原生事件监听，在后面加.native 修饰符才能进行监听 -->
    <back-top @click.native="topbackClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import Scroll from "../../components/common/BetterSroll/Scroll.vue";
import NavBar from "../../components/common/navbar/NavBar.vue";
import {backTopMixin} from '../../common/mixin.js'
import GoodList from "../../components/content/goods/GoodList.vue";
import Tabcontrol from "../../components/content/tabcontrol/Tabcontrol.vue";
import { getHomeMultidata, getHomeGoods } from "../../network/home.js";
import FeatureView from "./childComps/featureView.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import Rcommend from "./childComps/Rcommend.vue";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    Rcommend,
    FeatureView,
    Tabcontrol,
    GoodList,
    Scroll,
  },
  mixins:[backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "推荐"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,  //是否回到顶部
      topSetOffTop: 0,       //距离顶部的距离
      isTabFixed: false,     //是否固定位置
      saveY:0,               //保存离开时的位置

    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  activated() {
    this.$refs.scroll.scroll.refresh();
    console.log(" activated");
    this.$refs.scroll.scrollTo(0,this.saveY,0); //回来的时候 使用saveY 的值
    
  },
  deactivated() {
    console.log("deactivated");
    this.saveY = this.$refs.scroll.scroll.y;   //保存跳转时候的 y 位置
    console.log('saveY的值'+this.saveY);
  },
  created() {
    this.getHomeMultidata(); //第一次这时候是page1
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    //请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // console.log(res.data);
        this.$refs.scroll.finishPullUp();
      });
    },
    //tabclick
    tabclick(index) {

      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
   //让两个tabcontrol保持一致
   this.$refs.topTabCountrol.currentIndex=index;
   this.$refs.tabcontrol.currentIndex=index;
    },
   
    topbackClick() {
      console.log("返回顶部");
      this.$refs.scroll.scrollTo(0, 0);
    },
    //用@scroll监听到事件，调用contentScroll
    contentScroll(position) {
      //  console.log(position)
      //position.y都是负值的
      // if (-position.y > 500) {
      //   this.isShowBackTop = true;
      //   return;
      // }
      // this.isShowBackTop = false;
      this.isShowBackTop = -position.y > 500;

      //监听当头部的tab-control 滑到 657（this.setofftop）的时候，就固定.且将这个tabcontrol显示出来
      this.isTabFixed = -position.y > this.topSetOffTop;
      //当他小于657时是 false,大于时是true
    },
    loadMore() {
      // console.log("上拉加载更多")
      this.getHomeGoods(this.currentType); //这时候page就变成2了
    },
    imgLoad() {
      this.topSetOffTop = this.$refs.tabcontrol.$el.offsetTop;
      console.log(this.$refs.tabcontrol.$el.offsetTop);
    },
  },
};
</script>

<style scoped>
.home-nav {
  background-color: #ff8198;
  color: #fff;
  /* 在使用浏览器原生滚动时使用 */
  /* position: fixed; 
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control {
  position: sticky;
  top: 44px; /* 距离最上面的home-nav的距离 */
/* z-index: 9;
  background-color: #fff; */
/* }
用了better-scroll之后现在已经不行了 */
.fixed {
  position: fixed;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>