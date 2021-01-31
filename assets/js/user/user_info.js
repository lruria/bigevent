$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return 'n昵称长度在1-6个字符之间'
            }
        }
    })
    initUserinfo()
    function initUserinfo() {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);  
                form.val('formUserinfo',res.data)
            }
        })
    }
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserinfo()
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$('.layui-form').serialize(),
            success(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败！')
                }
                window.parent.getUserInfo()
            }
        })
    })
})