;
define(['require','jqcookie'], function() {
    return{
    username:$('#username'),
    password:$('#password'),
    loginbtn:$('#login'),
    phpurl: 'http://10.31.155.80/mi/xiaomi/php/',
        init:function(){
            let _this = this;
            this.loginbtn.on('click',function(){
                $.ajax({
                    url:_this.phpurl+'login.php',
                    type:'post',
                    data:{
                        'username':_this.username.val(),
                        'password':_this.password.val()
                    } 
                }).done(function(arrdata){
                    if(arrdata){//登录成功
                        location.href='index.html';
                        //存储用户信息
                        localStorage.setItem('xingming',username.value);
                   }else{
                       alert('用户名或者密码错误');
                   }
                })
            })
        }

    }
})