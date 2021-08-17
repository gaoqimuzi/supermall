<template>
  <div id="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="" />
      </div>
      <!-- 遍历出标题 -->
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          @click="titleClick(index)"
          :class="{ active: index === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :detail-image="detailImage"></detail-swiper>
      <!-- {{this.detailTitle}} -->
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shops="shops"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-goods-param
        :paramInfo="paramInfo"
        ref="param"
      ></detail-goods-param>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <detail-recommend-info
        :recommendInfo="recommendInfo"
        ref="recommend"
      ></detail-recommend-info>
      <!-- {{ this.iid }} -->
      {{this.$store.state.cartList}}
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backTopClick"></back-top>
  <!-- 监听组件里面加入购物车的事件 -->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"></toast> -->
  
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "../../network/detail.js";
import DetailSwiper from "./childComps/detailSwiper.vue";
import detailBaseInfo from "./childComps/detailBaseInfo.vue";
import DetailShopInfo from "./childComps/detailShopInfo.vue";
import Scroll from "../../components/common/BetterSroll/Scroll.vue";
import DetailGoodsInfo from "./childComps/detailGoodsInfo.vue";
import DetailGoodsParam from "./childComps/detailGoodsParam.vue";
import DetailCommentInfo from "./childComps/detailCommentInfo.vue";
import DetailRecommendInfo from "./childComps/detailRecommendInfo.vue";
import { debounce } from "../../common/utils.js";
import DetailBottomBar from './childComps/detailBottomBar.vue';
import {backTopMixin} from '../../common/mixin.js'
import {mapActions} from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      detailImage: [], //商品照片
      // detailTitle:null,
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      getThemeTopY: null,
    };
  },
  mixins:[backTopMixin],
  components: {
    NavBar,
    DetailSwiper,
    detailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
  },
  updated() {},
  methods: {
    ...mapActions({
      "addCart": "addCart"
    }),
    titleClick(index) {
      this.currentIndex = index;
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.getThemeTopY[index], 100); //点谁就滑动到它的位置
    },
    backClick() {
      this.$router.back();
    },
    detailImageLoad() {
      this.$refs.scroll.scroll.refresh;
      this.getThemeTopY(); //在图片加载完毕之后调用getThemeTopY,获取正确的offsetTop位置
    },
    contentScroll(position) {
      //当内容滚动到标签的内容时，标签的样式也进行变化
      const positionY = -position.y;
      for (let i = 0; i < this.getThemeTopY.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.getThemeTopY[i] &&
          positionY < this.getThemeTopY[i + 1]
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
        }
      }
      //当positionY的值为-1000时，isShowBackTop的值设置为true
     this.isShowBackTop = -position.y > 500;
    },
    addToCart(){
      //获取购物车需要展示的信息
      const product={};
      product.image =this.detailImage[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.oldPrice;
      product.iid=this.iid;
      //将商品添加到购物车界面
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res);
      // });
      this.addCart(product).then(res=>{
        this.$toast.show(res,2000);
        // console.log(res);
        // console.log(this.$toast)
      })
    }
  },
  created() {
    // this.iid = this.$route.query.iid; 在created里面写这句话iid就不会变化了，只获取第一次的。
    this.getThemeTopY = debounce(() => {
      this.getThemeTopY = [];
      this.getThemeTopY.push(0);
      this.getThemeTopY.push(this.$refs.param.$el.offsetTop);
      this.getThemeTopY.push(this.$refs.comment.$el.offsetTop);
      this.getThemeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.getThemeTopY.push(Number.MAX_VALUE);//获取最大值
    });
  },
  activated() {
    this.iid = this.$route.query.iid;
    // console.log(this.$route.query.iid);
    //请求数据
    getDetail(this.iid).then((res) => {
      console.log("=============");
      console.log(res);
      console.log("=============");
      this.detailImage = res.result.itemInfo.topImages;
      // this.detailTitle=res.result.itemInfo.title,
      //获取商品信息
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      console.log(this.goods);
      //创建店铺信息的对象
      this.shops = new Shop(res.result.shopInfo);
      console.log(this.shops);
      //保存商品的详情数据
      this.detailInfo = res.result.detailInfo;
      console.log(this.detailInfo)
      //获取商品参数
      this.paramInfo = new GoodsParam(
        res.result.itemParams.info,
        res.result.itemParams.rule
      );
      console.log(this.paramInfo)
      //获取评价
      if (res.result.rate !== 0) this.commentInfo = res.result.rate.list[0];
      console.log(this.commentInfo)
    });
    //获取推荐信息
    getRecommend(this.iid).then((res) => {
      this.recommendInfo = res.data.list;
      //  console.log(this.recommendInfo);
    });
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
.content {
  position: absolute;
  top: 44px;
  right: 0;
  left: 0;
  bottom: 49px;
  overflow: hidden;
}
</style>