<template>
  <div class="recommend-info">
      <div class="info-header">热门推荐</div>
      <good-list :goods="recommendInfo"></good-list>
  </div>
</template>

<script>
import GoodList from '../../../components/content/goods/GoodList.vue'
export default {
   name:"detailRecommendInfo",
   props:{
       recommendInfo:{
           type:Array,
           default(){
               return []
           }
       }
   },
   components:{
       GoodList,
   }
}
</script>

<style scoped>
.recommend-info {
  padding: 5px;
}
.info-header {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}

</style>