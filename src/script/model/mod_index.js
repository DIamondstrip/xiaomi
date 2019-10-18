;
define(['jquery', 'lazyload'], function () {
    return {

        phpurl: 'http://10.31.155.80/mi/xiaomi/php/',
        init: function () {
            let _this_ = this;
            var uid = null;
            uid = JSON.parse(localStorage.getItem('xingming'));
            if(uid!=null){
                $('.left-1').html(`
                <a href="javascript:;">${uid}</a>
                    <span>|</span>
                    <a href="javascript:;" class="zhuxiao">注销</a>
                    <span>|</span>
                    <a href="javascript:;">消息通知</a>
                `)
            }
            
            $.ajax({
                url: this.phpurl + 'select.php',
                dataType: 'json'
            }).done(function (arrdata) {
                let strbanner = '';//banner图片
                let strheaderAdv = '';//头部广告
                let strAdv = '';//广告
                let strmenu = '';//菜单
                let strPhone = '';
                let strremen = '';
                let strremenall = '';
                let strTv = '';
                let strTvall = ''
                // banner图渲染
                strheaderAdv += `<a href="javascript:;" class="mm">小米手机</a><div class="erji-1"><div class="center"><ul>`;
                $.each(arrdata, function (index, value) {
                    // banner
                    if (value.type == 'banner') {
                        strbanner += `<img class="img_show lazy" style="width:1266px;height:460px" data-original="${value.url}">`
                    }

                    // 头部广告
                    if (value.type == 'headerAdv') {
                        strheaderAdv += ` <li>
                        <div class="box">
                            <div class="dao-1">
                                <a href="javascript:;">
                                    <img class="lazy" style="width:160px;height:100px" data-original="${value.url}">
                                </a>
                            </div>
                            <p><a href="javascript:;">${value.title}</a></p>
                            <span>${value.price}￥</span>
                        </div>
                    </li>`
                    }

                    // 菜单
                    if (value.type == 'TwoMenu') {
                        strmenu += `
                        <li><a href="javascript:;" class="nei"><img class="lazy"  style="width:40px;height:40px" data-original="${value.url}"><span>${value.title}</span></a></li>`
                    }

                    // 广告
                    if (value.type == 'Advertisement') {
                        strAdv += `<img class="lazy"  style="width:316px;height:170px" data-original="${value.url}"
                        alt="小米">`
                    }

                    //手机栏
                    if (value.type == 'phoneAdv') {
                        strPhone += `
                        <li><a class="kuai" href="details.html?sid=${value.sid}" target="_blank">
                         <div class="biaoti"> 
                         <h3>新品</h3>
                        </div><div class="kuai-1">
                        <img class="lazy"  style="width:153px;height:153px" data-original="${value.url}" alt="">
                        </div>
                        <p class="p1">
                        <span style="color:#333;">${value.title}</span>
                        </p><p class="p2" style="color: #b0b0b0;margin-bottom:8px;">${value.details}</p>
                       <span style="margin-top:5px;">${value.price}元</span>
                       </a>
                      
                       </li>
                        `
                    }

                    //热门
                    if (value.type == 'remen') {
                        strremen += `
                        <li class="lili  li7">
                        <div class="tuban">
                            <a href="javascript:;">
                                <img class="lazy"  style="width:150px;height:150px" data-original="${value.url}"
                                    alt="">
                            </a>
                        </div>
                        <h3><a href="javascript:;">${value.title}</a></h3>
                        <p>${value.price}元 &nbsp;<del style="color: #c0c0c0;">${value.oldprice}元</del></p>
                        <div class="yinz">
                            <a href="javascript:;">
                                <span class="sp1">65的在我这客厅小了点.画面清晰值得购买</span>
                                <span class="sp2">来自 忧郁 的评价</span>
                            </a>
                        </div>
                    </li>
                        `
                    }

                    //更多热门
                    if (value.type == 'remenall') {
                        strremenall += `
                        <div class="youx-1"><a href="javascript:;">
                         <img class="lazy" style="width:80px;height:80px" data-original="${value.url}"alt="">
                         </a>
                         </div>
                        <h3><a href="javascript:;">${value.title}</a></h3>
                        <p>${value.price}元</p>`
                    }


                    //电视影音
                    if (value.type == 'Tv') {
                        strTv += `
                        <li class="lili  li7">
                        <div class="tuban">
                            <a href="javascript:;">
                                <img class="lazy" style="width:150px;height:150px" data-original="${value.url}"
                                    alt="">
                            </a>
                        </div>
                        <h3><a href="javascript:;">${value.title}</a></h3>
                        <p>${value.price}元 &nbsp;<del style="color: #c0c0c0;">${value.oldprice}元</del></p>
                        <div class="yinz">
                            <a href="javascript:;">
                                <span class="sp1">65的在我这客厅小了点.画面清晰值得购买</span>
                                <span class="sp2">来自 忧郁 的评价</span>
                            </a>
                        </div>
                    </li>
                        `
                    }

                    //更多电视
                    if (value.type == 'Tvall') {
                        strTvall += `
                        <div class="youx-1">
                        <a href="javascript:;">
                            <img class="lazy" style="width:80px;height:80px" data-original="${value.url}"
                                alt="">
                        </a>
                    </div>
                    <h3><a href="javascript:;">${value.title}</a></h3>
                    <p>${value.price}元</p>`
                    }


                });




                strbanner += `<a href="javascript:;" class="zuo">1</a>
                        <a href="javascript:;" class="you">2</a>`

                strheaderAdv += `</ul></div></div>`
                $('.banner').html(strbanner);
                $('.xiaomiphone').html(strheaderAdv);
                $('.right-to a').html(strAdv);
                $('.tu-1 ul').html(strmenu);
                $('.rap2 ul').html(strPhone);
                $('.jiadian1 ul').html(strremen);
                $('.jiadian1 .li8').html(strremenall);
                $('.jiadian2 ul').html(strTv);
                $('.jiadian2 .li8').html(strTvall);
                // 头部广告渲染

                //懒加载 添加lazy类  真实的图片路径添加到data-original  设置图片的宽高
                $(function () { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //效果方式
                    });
                });

                $('.zhuxiao').on('click',function(){
                    if (confirm('你确定要注销？')) {
                        localStorage.removeItem('xingming');
                        location.reload();
                    }
                })

                let indexobj=
                { 
                banner: document.querySelector('.banner'),
                tab_img: document.querySelectorAll('.banner img'),
                tab_p: document.querySelectorAll('.maodian p a'),
                banner_left: document.querySelector('.zuo'),
                banner_right: document.querySelector('.you'),
                jiadianbtn: $('.tuban-1'),
                jiadian: $('.youbian'),
                }
                let _this = indexobj;
                console.log(indexobj.banner)
                console.log(document.querySelector('.banner'))
                _this_.banner(indexobj);
                _this_.dianqitab(indexobj);
            });


        },

        currentindex: 0,
        timer: null,
        banner: function (t) {
            let _this = this;
            console.log(t.banner_right)
            for (let i = 0; i < t.tab_p.length; i++) {
                t.tab_p[i].onmouseover = function () {
                    _this.currentindex = i;
                    _this.tabswitch(i,t);

                }
            }
            t.banner.onmouseover = function () {
                clearInterval(_this.timer);
            }

            t.banner.onmouseout = function () {
                _this.timer = setInterval(function () {
                    t.banner_right.onclick();

                }, 4000);
            }

            t.banner_left.onmouseover = function () {
                t.banner_left.style.backgroundPosition = '0px 50%';
            }
            t.banner_right.onmouseover = function () {
                t.banner_right.style.backgroundPosition = '-42px 50%';
            }

            t.banner_left.onmouseout = function () {
                t.banner_left.style.backgroundPosition = '-84px 50%';
            }
            t.banner_right.onmouseout = function () {
                t.banner_right.style.backgroundPosition = '-125px 50%';
            }
            t.banner_right.onclick = function () {
                _this.currentindex++;
                if (_this.currentindex > t.tab_p.length - 1) {
                    _this.currentindex = 0;
                }
                _this.tabswitch(_this.currentindex,t);

            };
            t.banner_left.onclick = function () {
                _this.currentindex--;
                if (_this.currentindex < 0) {
                    _this.currentindex = t.tab_p.length - 1;
                }
                _this.tabswitch(_this.currentindex,t);

            };

            this.timer = setInterval(function () {
                t.banner_right.onclick();

            }, 4000);

        },
        tabswitch: function (i,o) {
            for (let j = 0; j < o.tab_p.length; j++) {
                o.tab_p[j].className = '';
                o.tab_img[j].className = '';
            }
            o.tab_p[i].className = 'p_hover';
            o.tab_img[i].className = 'img_show';

        },
        dianqitab: function (n) {
            let _this = this;
            n.jiadianbtn.on('mouseover', function () {
                $(this).addClass('tuban-2').siblings('.tuban-1').removeClass('tuban-2');
                n.jiadian.eq($(this).index('.tuban-1')).addClass('youbian2').siblings('.youbian').removeClass('youbian2');
            })
        },


    }
})