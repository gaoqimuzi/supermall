import {request} from "./request.js";
//发送网络请求
export function getDetail(iid){
   return request({
       url:'/detail',
       params:{
           iid:iid,
       }
   })
}
//请求recommend数据
export function getRecommend(iid){
    return request({
        url:'/recommend',
        params:{
            iid:iid,
        }
    })
}
//将详情需要的很多信息抽离到一个对象中
export class Goods{
    constructor(itemInfo,columns,services){
        this.title=itemInfo.title;
        this.desc=itemInfo.desc;
        this.newPrice=itemInfo.price;
        this.oldPrice=itemInfo.lowPrice;
        this.discount=itemInfo.discountDesc;
        this.realPrice=itemInfo.realPrice;
        this.columns=columns;
        this.services=services;
    }
}
export class Shop{
    constructor(shopInfo){
        this.logo=shopInfo.shopLogo;
        this.name=shopInfo.name;
        this.fans=shopInfo.cFans;
        this.sells=shopInfo.cSells;
        this.score=shopInfo.score;
        this.goodsCount=shopInfo.cGoods;
    }
}
export class GoodsParam{
    constructor(info,rule){
        //有些info里面有images有些没有
        this.image=info.images ? info.images[0] : '';
        this.infos=info.set;
        this.infokey=info.key;
        this.rulekey=rule.key;
        this.sizes=rule.tables;
    }
}