define(['jquery', 'jqcookie'], function () {
    return {
        arrsid: [], //商品的id
        arrnum: [], //商品的数量
        phpurl: 'http://10.31.155.80/mi/xiaomi/php/',
        init: function () {
            let _this = this;
            if ($.cookie('sid').split(',')) {
                let strcart = '';
                for (i of $.cookie('sid').split(',')) {
                    $.ajax({
                        url: this.phpurl + 'details.php',
                        data: {
                            id: i
                        },
                        dataType: 'json'
                    }).done(function (arrdata) {
                        strcart += `
                                <div class="content1" data-sid="${arrdata.sid}">
                                <input type="checkbox" checked>
                                <div class="good_info"  style="margin-left: 80px;">
                                    <img src="${arrdata.url}"
                                        alt="">
                                    <p>${arrdata.title}</p>
                                    <div>
                                        <p>品牌:小米</p>
                                        <p>型号：${arrdata.Model.split(',')[0]}</p>
                                    </div>
                                </div>
                                <p class="single_price">${arrdata.price}</p>
                                <div class="number">
                                    <button class="del">-</button>
                                    <input type="text" class="good_num" value="1">
                                    <button class="add">+</button>
                                </div>
                                <p class="total_price">${arrdata.price}</p>
                                <div class="opecation">
                                    <button class="remove">移除</button>
                                </div>
                        </div>
                            `
                        $('.shop_content').html(strcart);

                        _this.allcheck();
                        _this.sun();
                        _this.delete();
                    });

                }

            }



        },
        allcheck: function () {
            let _this = this;
            $('.allselect').on('click', function () {
                if ($(this).prop('checked')) {//全选被选中
                    $('.shop_content input').not('.good_num').prop('checked', true);//设置属性
                } else {
                    $('.shop_content input').not('.good_num').prop('checked', false);//设置属性
                }
            });

            let inputslength = $('.shop_content input').not('.good_num').size();
            $('.shop_content input').not('.good_num').on('click', function () {
                if ($('.shop_content input:checked').not('.allselect').not('.good_num').length === inputslength) {
                    $('.allselect').prop('checked', true);
                } else {
                    $('.allselect').prop('checked', false);
                }
            });


        },
        sun() {
            //点击减少
            let _this = this;
            $('.del').on('click', function () {
                var $count = $(this).parents('.content1').find('.number input').val();
                $count--;
                if ($count <= 1 || $count == '') {
                    $count = 1;
                }
                $(this).parents('.content1').find('.number input').val($count);
                $(this).parents('.content1').find('.total_price').html(_this.singlegoodsprice($(this)));//改变后的价格
                _this.setcookie($(this));
            })

            //增加
            $('.add').on('click', function () {
                var $count = $(this).parents('.content1').find('.number input').val();//值
                $count++;
                if ($count >= 99) {
                    $count = 99;
                }
                $(this).parents('.content1').find('.number input').val($count);
                $(this).parents('.content1').find('.total_price').html(_this.singlegoodsprice($(this)));//改变后的价格
                _this.setcookie($(this));

            });
            //直接设置
            $('.number input').on('input', function () {
                var $reg = /^\d+$/g; //只能输入数字
                var $value = parseInt($(this).val());
                if ($reg.test($value)) {//是数字
                    if ($value >= 99) {//限定范围
                        $(this).val(99);
                    } else if ($value <= 0) {
                        $(this).val(1);
                    } else {
                        $(this).val($value);
                    }
                } else {//不是数字
                    $(this).val(1);
                }
                $(this).parents('.content1').find('.total_price').html(_this.singlegoodsprice($(this)));//改变后的价格
                _this.setcookie($(this));
            });
        },

        //删除
        delete: function () {
            let _this = this;
            $('.remove').on('click', function (ev) {
                _this.cookietoarray();//得到数组,上面的删除cookie需要。
                if (confirm('你确定要删除吗？')) {
                    $(this).parent().parent().remove();//通过当前点击的元素找到整个一行列表，删除
                }
                _this.delgoodslist($(this).parents('.content1').attr('data-sid'), _this.arrsid);
            });
        },
        delgoodslist: function (sid, arrsid) {//sid：当前删除的sid，arrsid:cookie的sid的值
            var $index = -1;
            $.each(this.arrsid, function (index, value) {//删除的sid对应的索引位置。 index:数组项的索引
                if (sid == value) {
                    $index = index;//如果传入的值和数组的值相同，返回值对应的索引。
                }
            });
            this.arrsid.splice($index, 1);//删除数组对应的值
            this.arrnum.splice($index, 1);//删除数组对应的值
            $.cookie('sid', this.arrsid.toString(), 7);//添加cookie
            $.cookie('cookienum', this.arrnum.toString(), 7);//添加cookie
        },
        cookietoarray: function () {
            if ($.cookie('sid') && $.cookie('cookienum')) {
                this.arrsid = $.cookie('sid').split(',');//cookie商品的sid  
                this.arrnum = $.cookie('cookienum').split(',');//cookie商品的num
            }
        },

        setcookie: function (obj) { //obj:当前操作的对象
            this.cookietoarray();//得到数组
            var $index = obj.parents('.content1').attr('data-sid');//通过id找数量的位置
            this.arrnum[$.inArray($index, this.arrsid)] = obj.parents('.content1').find('.number input').val();
            $.cookie('cookienum', this.arrnum.toString(), 7);
        },
        singlegoodsprice: function (obj) { //obj:当前元素
            var $dj = parseFloat(obj.parents('.content1').find('.single_price').html());//单价
            var $cnum = parseInt(obj.parents('.content1').find('.number input').val());//数量
            return ($dj * $cnum).toFixed(2);//结果
        },

    }

})