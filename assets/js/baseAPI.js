//注意：每次调用$.get或&.ajax或$.post()的时候会先调用ajaxPrefilter这个函数
//这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);

})