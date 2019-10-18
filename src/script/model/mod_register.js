;
define(['require', 'jqcookie'], function () {
    return {
        aSpan: $('span'),
        xingming: $('#username'),
        registrybtn: $('#registry'),
        phpurl: 'http://10.31.155.80/mi/xiaomi/php/',
        tellock: true,
        emaillock: true,
        passlock: true,
        rpasslock: true,
        agreementlock: true,
        init: function () {
            let _this = this
            _this.xingming.on('blur', function () {
                let _this_ = this;
                $.ajax({
                    url: _this.phpurl + 'registry.php',
                    type: 'post',
                    data: {
                        'xingming': _this.xingming.val()
                    }
                }).done(function (arrdata) {
                    console.log(arrdata);
                    var reg = /^1[3578]\d{9}$/;//手机号码验证规则
                    if (_this_.value !== '') {//验证手机号码不能为空
                        if (reg.test(_this_.value)) {//检测手机号码是否合法
                            if (arrdata !== '1') {
                                _this.aSpan.eq(0).html('√');
                                _this.aSpan.eq(0).css('color', 'green');
                            } else {
                                _this.aSpan.eq(0).html('用户名重复');
                                _this.aSpan.eq(0).css('color', 'red');
                            }
                            tellock = true;
                        } else {
                            _this.aSpan.eq(0).html('手机号码格式不正确');
                            _this.aSpan.eq(0).css('color', 'red');
                            _this.tellock = false;
                        }
                    } else {
                        _this.aSpan.eq(0).html('手机号码不能为空');
                        _this.aSpan.eq(0).css('color', 'red');
                        _this.tellock = false;
                    }

                })
            });

            $('#email').on('blur', function () {
                let _this2 = this
                var reg = /^(\w[\w\-\+]*\w)\@(\w[\w\-\+]*\w)\.(\w[\w\-\+]*\w)$/;//电子邮箱验证规则
                if (_this2.value !== '') {
                    if (reg.test(_this2.value)) {
                        _this.aSpan.eq(1).html('√');
                        _this.aSpan.eq(1).css('color', 'green');
                        _this.emaillock = true;
                    } else {
                        _this.aSpan.eq(1).html('电子邮箱格式不正确');
                        _this.aSpan.eq(1).css('color', 'red');
                        _this.emaillock = false;
                    }
                } else {
                    _this.aSpan.eq(1).html('邮箱不能为空');
                    _this.aSpan.eq(1).css('color', 'red');
                    _this.emaillock = false;
                }
            });

            $('#password').on('input', function () {
                let _this3 = this;
                if (_this3.value.length >= 6 && _this3.value.length <= 16) {
                    var regnum = /[0-9]+/g;  //数字
                    var reguppercase = /[A-Z]+/g;  //大写字母
                    var reglowercase = /[a-z]+/g;  //小写字母
                    var other = /[\W\_]+/g;  //其他字符
                    var count = 0;//计算种类
                    if (regnum.test(_this3.value)) {
                        count++;
                    }
                    if (reguppercase.test(_this3.value)) {
                        count++;
                    }
                    if (reglowercase.test(_this3.value)) {
                        count++;
                    }
                    if (other.test(_this3.value)) {
                        count++;
                    }
                    switch (count) {
                        case 1:
                            _this.aSpan.eq(3).html('弱');
                            _this.aSpan.eq(3).css('color', 'red');
                            _this.passlock = false;
                            break;
                        case 2:
                        case 3:
                            _this.aSpan.eq(3).html('中');
                            _this.aSpan.eq(3).css('color', 'orange');
                            _this.passlock = true;
                            break;
                        case 4:
                            _this.aSpan.eq(3).html('强');
                            _this.aSpan.eq(3).css('color', 'green');
                            _this.passlock = true;
                            break;
                    }
                } else {
                    _this.aSpan.eq(3).html('密码长度有误');
                    _this.aSpan.eq(3).css('color', 'red');
                    _this.passlock = false;
                }
            });
            //密码验证

            $('#password').on('blur', function () {
                // alert(1)
                let _this4 = this;
                if (_this4.value !== '') {
                    if (_this.passlock) {
                        _this.aSpan.eq(2).html('√');
                        _this.aSpan.eq(2).css('color', 'green');
                        _this.passlock = true;
                    } else {
                        _this.aSpan.eq(2).html('X');
                        _this.aSpan.eq(2).css('color', 'red');
                        _this.passlock = false;
                    }

                } else {
                    _this.aSpan.eq(2).html('不能为空');
                    _this.aSpan.eq(2).css('color', 'red');
                    _this.passlock = false;
                }
            });

            //重复密码
            $('#rpassword').on('blur', function () {
                let _this5 = this;
                if (_this5.value !== '') {
                    if ($(this).val() === $('#password').val()) {
                        _this.aSpan.eq(4).html('密码正确');
                        _this.aSpan.eq(4).css('color', 'green');
                        _this.rpasslock = true;
                    } else {
                        _this.aSpan.eq(4).html('密码不相同');
                        _this.aSpan.eq(4).css('color', 'red');
                        _this.rpasslock = false;
                    }
                } else {
                    _this.aSpan.eq(4).html('密码不能为空');
                    _this.aSpan.eq(4).css('color', 'red');
                    _this.rpasslock = false;
                }
            });

            $('form').on('submit', function () {
                if (!$('#agreement').is(':checked')) {
                    _this.agreementlock = false;
                    alert('请阅读用户协议')
                }else{
                    _this.agreementlock = true;
                } 



                if ($('#username').val() === '') {
                    _this.aSpan.eq(0).html('手机号码不能为空');
                    _this.aSpan.eq(0).css('color', 'red');
                    _this.tellock = false;

                }
                if ($('#email').val() === '') {
                    _this.aSpan.eq(1).html('邮箱不能为空');
                    _this.aSpan.eq(1).css('color', 'red');
                    _this.emaillock = false;
                }
                if ($('#password').val() === '') {
                    _this.aSpan.eq(2).html('不能为空');
                    _this.aSpan.eq(2).css('color', 'red');
                    _this.passlock = false;
                }
                if ($('#rpassword').val() === '') {
                    _this.aSpan.eq(4).html('密码不能为空');
                    _this.aSpan.eq(4).css('color', 'red');
                    _this.rpasslock = false;
                }

                if (!_this.tellock || !_this.emaillock || !_this.passlock || !_this.rpasslock || !_this.agreementlock) {
                    return false
                }
            })






        }

    }
})