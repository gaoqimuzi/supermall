<template>
  <div class="sub-category-list">
    <!-- subcategories.list里面有28个array.每个array里面又有自己的属性 -->
        <div class="item" v-for="(item, index) in subcategories" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div class="item-text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
    name:"SubCategory",
    props:{
        subcategories:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.sub-category-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 30%);
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 15px 0;
}
.item {
  text-align: center;
  font-size: 12px;
}
.item-img {
  width: 80%;
}
.item-text {
  margin-top: 10px;
  margin-bottom: 5px;
}

</style>