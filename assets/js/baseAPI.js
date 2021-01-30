$.ajaxPrefilter(function (options) {
  // 在发起ajax请求之前统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  options.complete =function(res){
    if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！'){
      localStorage.removeItem('token')
      location.href = '/code/login.html'
    }
  }

})