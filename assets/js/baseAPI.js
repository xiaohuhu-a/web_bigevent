//注意：每次调用$.get或&.ajax或$.post()的时候会先调用ajaxPrefilter这个函数
//这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    //统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }
    //complete回调
    options.complete = function (res) {
        // console.log('hhh');
        console.log(res);
        //在complete回调函数中，可以使用res.responseJSON拿到
        //服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token');
            //2.强制跳转登录页面
            location.href = '/login.html'
        }
    }
})

