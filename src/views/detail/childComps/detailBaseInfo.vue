<template>
  <div>
    <div v-if="Object.keys(goods).length !== 0" class="base-info">
      <div class="info-title">{{ goods.title }}</div>
      <div class="info-price">
        <span class="n-price">{{ goods.newPrice }}</span>
        <span class="o-price">{{ goods.oldPrice }}</span>
        <span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
      </div>
      <div class="info-other">
        <span>{{ goods.columns[0] }}</span>
        <span class="shoucang">{{ goods.columns[1] }}</span>
        <span class="fahuo">{{ goods.services[goods.services.length - 1].name }}</span>
      </div>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
.base-info {
  padding: 20px 10px 0 10px;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #333;
  padding: 0 10px;
}
.info-price .n-price {
  font-size: 32px;
  color: brown;
  margin-left: 10px;
}
.info-price .o-price {
  margin-left: 10px;
  font-size: 14px;
  text-decoration: line-through;
}
.discount {
  background: coral;
  border-radius: 6px;
  color: cornsilk;
  margin-top: 5px;
}
.info-service{
    border-bottom:5px solid #f2f5f8;
    padding: 30px 0;
}
.info-service img {
  width: 15px;
}
.info-other{
    margin:20px 10px 5px ;
    color: darkgray;
    font-size: 12px;
}
.info-other .shoucang{
    margin-left:30%;
}
.info-other .fahuo{
    float: right;
}
</style>