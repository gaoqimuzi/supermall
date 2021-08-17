//防抖函数
export function debounce(func, delay) {
    let timer = null;
    return function (...arg) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, arg);
      }, delay);
    };
  }

  //时间戳格式化
  
  export function formatDate(date, fmt) {
      //获取年份
      //y+  一个或多个y
      //y*  0个或多个y  y?  0个或者1个y
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      //将regexp.$1也就是传入的y+ 用 (date.getFullYear() + '').substr(4 - RegExp.$1.length)替换
      //date.getFullYear() + '' 就是将它转换成字符串
      //substr(4 - RegExp.$1.length) 截取多余的字符串，如果传入的是yyyy，那RegExp.$1.length的长度就是4，那么截取的就是4-4=0
    }
    //获取
    //M+ ->正则表达式中的一个规则
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  }
  
  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
    //如果str不足2位，比如str=4 就截取第一个0 就成了04
    //如果str没有，就不截取，输出00；
    //如果传入的是43，就截取00，输出43
  }