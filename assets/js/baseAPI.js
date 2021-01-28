$.ajaxPrefilter(function(options){
    // 在发起ajax请求之前统一拼接请求的根路径
      options.url = 'http://ajax.frontend.itheima.net'+options.url
})