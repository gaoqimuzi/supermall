<template>
  <swiper>

    <swiper-item v-for=" (item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt=" " @load="imgLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "../../../components/common/swiper/index.js";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
   return{
     isLoad:false
   }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods:{
     imgLoad(){
       if(!this.isLoad)   //因为轮播图里面有4张图片，使用了这个就不会调用4次了
       this.$emit('imgLoad');
       this.isLoad = true
     }
  },
  created(){
    console.log(this)
  }
};
</script>

<style>
</style>