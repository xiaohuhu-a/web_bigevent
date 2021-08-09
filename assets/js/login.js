$(function () {
    //去注册页面的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //去登录页面的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })
    //监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg('注册失败！')
            }
            layer.msg('注册成功，请登录！');
            //模拟人的点击行为
            $('#link_login').click();
        }

        )
    })
    //监听登录表单提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            // data: {
            //     username: $('#form_login [name=username]').val(),
            //     password: $('#form_login [name=password]').val(),
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！');
                //将登录成功的token 字符串，保存到localstorage中
                localStorage.setItem('token', res.token);

                //跳转到后台页面
                location.href = '/index.html';
            }
        })
    })
})