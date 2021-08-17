<template>
  <div>
      <swiper class="detail-swiper">
          <swiper-item v-for="item in detailImage" :key="item"><img :src="item" alt=""></swiper-item>
      </swiper>
   
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper/index.js'
export default {
 name:"detailSwiper",
 components:{
     Swiper,
    SwiperItem
 },
 props:{
     detailImage:{
         type:Array,
         default(){
             return []
         }
     }
 }
 
}
</script>

<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
</style>