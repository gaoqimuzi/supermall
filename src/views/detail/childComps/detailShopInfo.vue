<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shops.logo" alt="" />
      <span class="title">{{ shops.name }}</span>
    </div>
    <div class="shop-middle">
        <div class="shop-middle-item shop-middle-left">
            <div class="info-sells">
                <div class="sells-count">
                    {{shops.sells|sellCountFilter}}
                </div>
                <div class="sells-text">总销量</div>
            </div>
            <div class="info-goods">
                <div class="goods-count">
                    {{shops.goodsCount}}
                </div>
                <div class="goods-text">全部宝贝</div>
            </div>
        </div>
        <div class="shop-middle-item shop-middle-right">
            <table>
                    <tr v-for="(item,index) in shops.score" :key="index"> 
                        <td>{{item.name}}</td>
                        <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
                         <td class="better" :class="{'better-more':item.isBetter}">  
                            <span>{{item.isBetter?'高':'低'}}</span>
                        </td>

                    </tr>
            </table>
        </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailShopInfo",
  props: {
    shops: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  //过滤器,如果数据大于1万
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) {
        return value;
      } else {
        return (value / 10000).toFixed(1) + '万';
      }
    }
  }
};
</script>

<style scoped>
.shop-info{
  padding:20px 20px;
  border-bottom:5px solid #f2f5f8 ;
}
.shop-top{
    line-height: 45px;
    display: flex;
    align-items: center;
}
.shop-top img{
    width: 15%;
    border-radius:50%;
    border:1px solid rgba(0,0,0,.1);
}

.shop-top .title{
    vertical-align: center;/* 垂直居中 */
    font-size: 14px;
    margin-left:10px ;
}
.sells-count .goods-count{
    font-size: 18px;
}
.sells-text .goods-text{
 margin-top:10px;
 font-size: 12px;
}
.shop-middle{
   display: flex;
   margin-top:15px;
   align-items: center;
}
.shop-middle-item{
    flex:1;
}
.shop-middle-left{
   justify-content: space-evenly;
    color:#333;
    display: flex;
    text-align: center;
    border-right:1px solid rgba(0,0,0,.1);
}

   .shop-middle-right{
       color:#333;
       font-size: 13px;
   }
   .shop-middle-right table{
       margin-left: 30px;
       width: 120px;
   }
   .shop-middle-right .score{
       color:#5ea732;
   }
  .shop-middle-right .better span {     
  background-color: #5ea732;
  color: #fff;
  text-align: center;
  }
.shop-middle-right .better-more span {
  background-color: #f13e3a;
 }
 .shop-bottom {
  text-align: center;
  margin-top: 10px;
}
.shop-bottom .enter-shop {
  display: inline-block;
  width: 150px;
  line-height: 30px;
  vertical-align: center;
  font-size: 14px;
  background-color: #f2f5f8;
  border-radius: 10px;
}

</style>