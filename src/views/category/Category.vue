<template>
  <div id="category">
    <nav-bar><div slot="center">分类</div></nav-bar>
    <div class="content">
      <tab-menu
        :categories="categories"
        @selectItem="selectItem"
        class="tab-menu"
      ></tab-menu>
      <scroll class="tab-content"
      :probe-type="3"
      :pull-up-load="false"
      ref="scroll"
      @scroll="contentScroll">
      <div>
        <sub-category :subcategories="showSubcategory"></sub-category>
        <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
        <sub-category-detail :detail="showSubcategoryDetail"></sub-category-detail>
      </div>
      </scroll>
      <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import { categoryData, subcategoryData,getCategoryDetail } from "../../network/category.js";
import SubCategory from "./childComps/SubCategory.vue";
import TabMenu from "./childComps/TabMenu.vue";
import TabControl from "@/components/content/tabcontrol/Tabcontrol.vue";
import { NEW, POP, SELL} from "@/common/const.js";
import SubCategoryDetail from './childComps/SubCategoryDetail.vue';
import scroll from '../../components/common/BetterSroll/Scroll.vue';
import {backTopMixin} from '../../common/mixin.js'
export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    SubCategory,
    TabControl,
    SubCategoryDetail,
    scroll,
  },
  mixins:[backTopMixin],
  data() {
    return {
      currentIndex:-1,
      categoryData: {},
      categories: [],
      currentType: POP
    };
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories;
    },
    showSubcategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
    }
  },
  created() {
    this.getCategory();
  },
  methods: {
    //获取分类的数据
    getCategory() {
      categoryData().then((res) => {
        console.log(res);
        this.categories = res.data.category.list;
        console.log(this.categories);
        //初始化每个(16个)类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              POP: [],
              NEW: [],
              SELL: [],
            },
          };
        }
        this.getsubcategory(0);
      });
    },
    getsubcategory(index) {
      //获取每个分类里面的另一大类
      this.currentIndex = index;
      const maitkey = this.categories[index].maitKey;
      subcategoryData(maitkey).then((res) => {
        this.categoryData[index].subcategories = res.data.list;
        this.categoryData = { ...this.categoryData };
        this.getSubCategoryDetail(POP);
        this.getSubCategoryDetail(SELL);
        this.getSubCategoryDetail(NEW);
        console.log(res);
      });
    },
    getSubCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入 miniWallkey 和 type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = {...this.categoryData};
        console.log(res);
      })
    },
    selectItem(index) {
      //点击tabmenu的时候就显示它对应的sub
      console.log(index);
      //获取相应sub的信息
      this.getsubcategory(index);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
      console.log(this.currentType);
    },
    contentScroll(position){
      // console.log(position)
       this.isShowBackTop=(-position.y)>800;
  }
  },
  
   
};
</script>

<style scoped>
.tab-content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 100px;
  overflow: hidden;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-menu {
  height: calc(100% - 44px - 45px);
}
</style>