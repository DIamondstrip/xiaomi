class lunbo {
    constructor() {
        this.banner = document.querySelector('.banner');
        this.tab_img = document.querySelectorAll('.banner img')
        this.tab_p = document.querySelectorAll('.maodian p a')
        this.banner_left = document.querySelector('.zuo')
        this.banner_right = document.querySelector('.you')
        this.jiadianbtn = $('.tuban-1')
        this.jiadian = $('.youbian')
        this.currentindex = 0;
        this.timer = null;
    }
    init() {
        let _this = this;

        for (let i = 0; i < this.tab_p.length; i++) {
            this.tab_p[i].onmouseover = function () {
                _this.currentindex = i;
                _this.tabswitch(i);

            }
        }
        this.banner.onmouseover = function () {
            clearInterval(_this.timer);
        }

        this.banner.onmouseout = function () {
            _this.timer = setInterval(function () {
                _this.banner_right.onclick();

            }, 4000);
        }

        this.banner_left.onmouseover = function () {
            _this.banner_left.style.backgroundPosition = '0px 50%';
        }
        this.banner_right.onmouseover = function () {
            _this.banner_right.style.backgroundPosition = '-42px 50%';
        }

        this.banner_left.onmouseout = function () {
            _this.banner_left.style.backgroundPosition = '-84px 50%';
        }
        this.banner_right.onmouseout = function () {
            _this.banner_right.style.backgroundPosition = '-125px 50%';
        }
        this.banner_right.onclick = function () {
            _this.currentindex++;
            if (_this.currentindex > _this.tab_p.length - 1) {
                _this.currentindex = 0;
            }
            _this.tabswitch(_this.currentindex);

        };
        this.banner_left.onclick = function () {
            _this.currentindex--;
            if (_this.currentindex < 0) {
                _this.currentindex = _this.tab_p.length - 1;
            }
            _this.tabswitch(_this.currentindex);

        };

        this.timer = setInterval(function () {
            _this.banner_right.onclick();

        }, 4000);

    }

    tabswitch(i) {
        for (let j = 0; j < this.tab_p.length; j++) {
            this.tab_p[j].className = '';
            this.tab_img[j].className = '';
        }
        this.tab_p[i].className = 'p_hover';
        this.tab_img[i].className = 'img_show';

    }

    dianqitab() {
        let _this = this;
        this.jiadianbtn.on('mouseover', function () {
            $(this).addClass('tuban-2').siblings('.tuban-1').removeClass('tuban-2');
            _this.jiadian.eq($(this).index('.tuban-1')).addClass('youbian2').siblings('.youbian').removeClass('youbian2');
        })
    }
}
// 详情页
class details {
    constructor() {
        this.usechoose = $('.usechoose')
    }

    init() {
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
        this.usechoose.on('click', function () {
            $(this).css('borderColor', '#ff6700').siblings().css('borderColor', '#e0e0e0');
            Model = $(this).find('span')[0].innerHTML;
            bstop = true;
        })

        let detalis_xq1 = [];
        let detalis_xq2 = [];
        
        if ($.cookie('sid')&& $.cookie('cookienum')) {
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
                console.log(detalis_xq1,detalis_xq2)
                $.cookie('sid', detalis_xq1);
                $.cookie('cookienum',detalis_xq2);
                alert('添加成功')
            } else {
                alert('请选择商品')
                return false;

            }
        })




    }


}


