<template>
  <div class="goods-item" @click="itemClick">
      <img :src="showImage" alt=" ">
      <div class="goods-info">
         <p> {{goodsItem.title}}</p>
         <span class="price">¥{{goodsItem.price}}</span>
         <span class="collect">⭐️ {{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
     name:"GoodListItem",
     props:{
         goodsItem:{
             type:Object,
             default(){
                 return {}
             }
         }
     },
     methods:{
         itemClick(){
             console.log(1);
             this.$router.push({
                 path:'detail',
                 query:{
                     iid:this.goodsItem.iid ||this.goodsItem.item_id
                     }
             }).catch(err=>err);//点击商品就会掉转路由
         }
     },
     computed:{
         showImage(){
             return this.goodsItem.img||this.goodsItem.image || this.goodsItem.show.img
         }
     }
}
</script>

<style scoped>
.goods-item{
    padding-bottom:40px;
    position:relative;
     width: 48%;
}
.goods-item img{
   width:100%;
    border-radius: 5px;
}
.goods-info{
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    bottom: 5px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
}
.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.goods-info .price{
    color: tomato;
    margin-right: 20px;
}
.goods-info .collect{
    position: relative;
}
.goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    /* background: url("@assets/img/tabbar/home.svg") 0 0/14px 14px; */
  }


</style>