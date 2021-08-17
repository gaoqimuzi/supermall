<template>
<div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot> 
    </div>
</div>
  
</template>

<script>
import BScroll from 'better-scroll'




export default {
       name:"Scroll",
       props:{
          probeType:{
              type:Number,
              default:0
          },
          pullUpLoad:{
              type:Boolean,
              default:false
          }

       },
       data(){
             return{
                 scroll:null
             }
       },
       methods:{
           //点击backtop时
           scrollTo(x,y,time=300){
               this.scroll.scrollTo(x,y,time)
           },
           finishPullUp(){
               this.scroll && this.scroll.finishPullUp()
           }
       },
       mounted(){
           //创新scroll对象
         
                this.scroll = new BScroll(this.$refs.wrapper,{
                //   pullUpLoad:true,
                click:true,
               probeType:this.probeType,
               pullUpLoad: this.pullUpLoad,
               //下面这两个不加的话还是不能滑动的
               observeDOM:true,
               observeImage:true
           })
           //监听滚动的位置
           this.scroll.on('scroll',(position) =>{
            //    console.log(position);
            this.$emit('scroll',position)//用scroll事件将position传出去，谁想用，就在外面用 @scroll 来监听
           }),
           //监听上拉事件
           this.scroll.on('pullingUp',()=>{
            //    console.log("下拉加载更多")
            this.$emit('pullingUp')
           })

       }
}
</script>

<style>

</style>