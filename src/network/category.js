import {request} from './request.js'

export function categoryData(){
    return request({
         url: '/category',
    })
}
export function subcategoryData(maitKey){
     return request({
         url:'/subcategory',
         params:{
             maitKey,
         }
     })
}
export function getCategoryDetail(miniWallkey, type) {
    return request({
      url: '/subcategory/detail',
      params: {
        miniWallkey,
        type
      }
    })
}