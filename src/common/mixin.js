import {debounce} from "@/common/utils";
import backTop from "@/components/content/backTop/BackTop.vue";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted() {
    // 使用事件总线 bus 解决 BScroll 的小 bug
    // 1.监听item中图片加载完成

    this.refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImageListener = () => {
      this.refresh();
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener);
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    backTop
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  }
}