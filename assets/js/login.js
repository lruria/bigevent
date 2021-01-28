$(function () {
    $("#link_reg").on("click", function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $("#link_login").on("click", function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 注册
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/reguser',
            data:{
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val(),
            },
            success(res){
                if(res.status!==0){
                  return  layer.msg(res.message);  
                }
                layer.msg('注册成功，请登录！'); 
                $('#link_login').click()
            }
        })
    })
    // 登录
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success(res){
                if(res.status!==0){
                    return layer.msg('登录失败！')
                }
                layer.msg(res.message); 
                localStorage.setItem('token',res.token)
                location.href = '/code/index.html'
            }
        })
    })
})