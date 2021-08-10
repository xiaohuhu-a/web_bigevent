$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之内'
            }
        },
    })
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户基本信息失败！')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();

    })

    //监听表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改用户信息失败！')
                }
                layui.layer.msg('修改用户信息成功！');
                //调用父页面的方法，重新渲染用户的头像和信息
                window.parent.getUserInfo();

            }
        })
    })
})