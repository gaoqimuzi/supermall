<template>
   <div class="tab-bar-item" @click="itemClick">
       <slot v-if="!isActive" name="item-icon"></slot>
       <slot v-else name="item-icon-active"></slot>
   <div :style="activeStyle"><slot name="item-next"></slot></div>
   </div>
</template>

<script>
export default {
       name:'TabBarItem',
       props:{
          path:String,
          activeColor:{
             type:String,
          }
       },
       computed:{
             isActive(){
                return this.$route.path.indexOf(this.path)!==-1;
             },
             activeStyle(){
                return this.isActive?{color:this.activeColor}:{}
             }
       },
       methods:{
          itemClick(){
             if(this.$route.path!=this.path)//这个if判断能够 防止连续两次跳转相同的页面会报错
             this.$router.push(this.path)
          }
       }
}
</script>

<style scoped>
 .tab-bar-item{
         flex:1;
         text-align:center;
         height:49px;
         font-size: 14px;
      }
      .tab-bar-item img{
         width:24px;
         height:24px;
         margin-top:3px;
         vertical-align: middle;
         margin-bottom:2px;
      }

</style>