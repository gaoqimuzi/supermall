<template>
  <div>
    <good-list :goods="detail"></good-list>
  </div>
</template>

<script>
import GoodList from "@/components/content/goods/GoodList.vue";
export default {
  name: "SubCategoryDetail",
  components: {
    GoodList
  },
  props: {
    detail: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
</style>