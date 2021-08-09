
$(function () {
    //调用函数获取用户信息
    getUserInfo();
    var layer = layui.layer;
    $('#btn-logout').on('click', function () {
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地存储中的token
            localStorage.removeItem('token');
            //2.重新跳转到登录页面
            location.href = '/login.html'
            //关闭询问框
            layer.close(index);
        });

    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败');
            }
            //调用renerAvatar()渲染用户头像
            renderAvatar(res.data);
        },
        //不论成功还是失败都调用
        // complete: function (res) {
        //     // console.log('hhh');
        //     console.log(res);
        //     //在complete回调函数中，可以使用res.responseJSON拿到
        //     //服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.强制清空token
        //         localStorage.removeItem('token');
        //         //2.强制跳转登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username;
    //2.
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //3.按需渲染用户头像
    if (user.user_pic !== null) {
        //图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }

}