$(function () {
    var layer = layui.layer
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        // console.log(e.target.files);
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('未选择文件！')
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)
    })
    $('#btnUpload').on('click', function () {
          var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data:{
                avatar: dataURL
            },
            success(res) {
                // console.log(res);
                if(res.status!==0){
                    return layer.msg('更换头像失败！')
                }
                // console.log(res);
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()

            }
        })
    })
})