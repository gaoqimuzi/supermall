<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" 
    class="tab-control-item" 
    :class="{active:index===currentIndex}"
     @click="tabclick(index)">
        <span>{{item}}</span>
    </div>
  </div>

</template>

<script>
export default {
  name:"Tabcontrol",
  props:{
      titles:{
          type:Array,
          default(){
              return []
          }
      }
  },
  methods:{
   tabclick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index)

   }
  },
  data(){
      return {
          currentIndex:0
      }
  }
}
</script>

<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15px; 
    height: 40px;
    line-height: 40px;
    background-color:#fff;
   
}
.tab-control-item{
    flex:1;
}
.active{
    color: tomato;
    
}
.active span{
    border-bottom:3px solid tomato; 
    padding: 10px;
}
</style>