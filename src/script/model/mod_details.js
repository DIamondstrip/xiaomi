define(['jquery', 'jqcookie'], function () {
    return {

        sid: location.search.substring(1).split('=')[1],
        titleName: document.querySelector('.pro-title .name'),
        information: document.querySelector('#J_desc'),
        de_title: document.querySelector('#de_title'),
        de_title1: document.querySelector('#de_title1'),
        phpurl: 'http://10.31.155.80/mi/xiaomi/php/',   
        currentindex: 0,
        timer: null,
        init: function () {
            let _this=this;
            // 头部
            $.ajax({
                url: this.phpurl + 'select.php',
                dataType: 'json'
            }).done(function (arrdata) {
                let strheaderAdv = '';//头部广告
                strheaderAdv += `<a href="javascript:;" class="mm">小米手机</a><div class="erji-1"><div class="center"><ul>`;
                $.each(arrdata, function (index, value) {
                    // 头部广告
                    if (value.type == 'headerAdv') {
                        strheaderAdv += ` <li>
            <div class="box">
                <div class="dao-1">
                    <a href="javascript:;">
                        <img
                            src="${value.url}">
                    </a>
                </div>
                <p><a href="javascript:;">${value.title}</a></p>
                <span>${value.price}￥</span>
            </div>
        </li>`
                    }
                })
                strheaderAdv += `</ul></div></div>`
                $('.xiaomiphone').html(strheaderAdv);
            });
            $.ajax({
                url: this.phpurl + 'details.php',
                data: {
                    id: this.sid
                },
                dataType: 'json'
            }).done(function (arrdata) {
                _this.titleName.innerHTML = arrdata.title;
                _this.information.innerHTML = arrdata.details;
                _this.de_title.innerHTML = arrdata.title;
                _this.de_title1.innerHTML = arrdata.title;

                let de_price = [];
                let de_Model = [];
                let de_banner = [];

                let strde_price = '';
                let strde_banner = '';
                let jjj = 0;
                de_Model = arrdata.Model.split(',')
                de_price = arrdata.Modelprice.split(',')
                de_banner = arrdata.urls.split(',')

                $.each(de_Model, function (index, value) {
                    strde_price += `
        <div class="usechoose">
             <span class="Model">${value}</span>
             <span class="Modelprice">${de_price[index]}元</span>
        </div>
        `
                })

                //轮播
                $.each(de_banner, function (index, value) {
                    strde_banner += `
                    <img  class="smallpic" src="${value}" alt="">`
                    jjj = index + 1;
                })
                strde_banner += ` <div class="de_lunbo">`
                for (let i = 0; i < jjj; i++) {
                    strde_banner += `<a href="javascript:;" class=""></a>`
                }
                strde_banner += `</div>
                <a href="javascript:;" style="top:280px;left:0" class="zuo">1</a>
                        <a href="javascript:;" style="top:280px;right:0" class="you">2</a>
                `
                let strprice = `${arrdata.price}元 <del>${arrdata.oldprice}元</del>`;//价格
                $('.pro-choose').html(strde_price);
                $('.pro-price span').html(strprice);
                $('.de_vive').html(strde_banner)
                $('title').html(arrdata.title);



                //取值
                let detailsobj = {
                    usechoose: $('.usechoose'),
                    smallpic: document.querySelector('#smallpic'),
                     
                }

                _this.setc(detailsobj);
                _this.banner();

            });

        },
        banner: function () {
            let _this = this;
            for (let i = 0; i <$('.de_lunbo a').size(); i++) {
                $('.de_lunbo a').eq(i).on('mouseover' , function () {
                    _this.currentindex = i;
                    _this.tabswitch(i);
                })
            }
            $('.de_vive').on('mouseover', function() {
                clearInterval(_this.timer);
            })

            $('.de_vive').on('mouseout' , function () {
                _this.timer = setInterval(function () {
                   $('.you').trigger('click');

                }, 2000);
            })

           $('.zuo').on('mouseover' , function () {
               $('.zuo').css('backgroundPosition' , '0px 50%');
            })
           $('.you').on('mouseover' ,function () {
               $('.you').css('backgroundPosition' , '-42px 50%');
            })

           $('.zuo').on('mouseout' , function () {
               $('.zuo').css('backgroundPosition' , '-84px 50%');
            })
           $('.you').on('mouseout' , function () {
               $('.you').css('backgroundPosition' , '-125px 50%');
            })
           $('.you').on('click' , function () {
                _this.currentindex++;
                if (_this.currentindex > $('.de_lunbo a').size() - 1) {
                    _this.currentindex = 0;
                }
                _this.tabswitch(_this.currentindex);

            });
           $('.zuo').on('click' , function () {
                _this.currentindex--;
                if (_this.currentindex < 0) {
                    _this.currentindex = $('.de_lunbo a').size() - 1;
                }
                _this.tabswitch(_this.currentindex);

            });

            this.timer = setInterval(function () {
                $('.you').trigger('click');
            }, 2000);

        },
        tabswitch: function (i) {
            console.log( $('.smallpic'))
            for (let j = 0; j < $('.de_lunbo a').size(); j++) {
                $('.de_lunbo a').css('background','#ccc');
                $('.de_vive img').css('opacity','0');
            }
            $('.de_lunbo a').eq(i).css('background','#a3a3a3')
            $('.smallpic').eq(i).animate({
                opacity:"1"
            },1000);

        },
        
        setc: function (t) {
            let Model = $.cookie('Model');
            let _this = this;
            $(window).on('scroll', function () {
                let $top = $(window).scrollTop();
                if ($top >= 210) {
                    $('#de_onav').addClass('nav_fix');
                } else {
                    $('#de_onav').removeClass('nav_fix')
                }
            });
            let bstop = false;
            t.usechoose.on('click', function () {
                $(this).css('borderColor', '#ff6700').siblings().css('borderColor', '#e0e0e0');
                Model = $(this).find('span')[0].innerHTML;
                bstop = true;
            })

            let detalis_xq1 = [];
            let detalis_xq2 = [];

            if ($.cookie('sid') && $.cookie('cookienum')) {
                detalis_xq1 = detalis_xq1.concat($.cookie('sid').split(','));
                detalis_xq2 = detalis_xq2.concat($.cookie('cookienum').split(','));
            }
            $('.de_btn').on('click', function () {
                if (bstop) {
                    let index = location.search.substring(1).split('=')[1];
                    if (detalis_xq1.indexOf(index) == -1) {
                        detalis_xq1.push(index);
                        detalis_xq2.push('1');
                    }
                  
                    $.cookie('sid', detalis_xq1);
                    $.cookie('cookienum', detalis_xq2);
                    alert('添加成功')
                } else {
                    alert('请选择商品')
                    return false;

                }
            })




        },




    }
})