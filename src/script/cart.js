class cart {
    constructor() {
        this.allselect = $('.allselect');
        this.cart_inputs = $('.shop_content input').not('.good_num');
        this.remove = $('.remove')
        this.arrsid = []; //商品的id
        this.arrnum = []; //商品的数量
    }

    init() {
        let _this = this;
        this.allselect.on('click', function () {
            if ($(this).prop('checked')) {//全选被选中
                _this.cart_inputs.prop('checked', true);//设置属性
            } else {
                _this.cart_inputs.prop('checked', false);//设置属性
            }
        });

        let inputslength = this.cart_inputs.size();
        this.cart_inputs.on('click', function () {
            if ($('.shop_content input:checked').not('.allselect').not('.good_num').length === inputslength) {
                _this.allselect.prop('checked', true);
            } else {
                _this.allselect.prop('checked', false);
            }
        });

        this.sun();
        this.delete();
    }


    //数量
    sun() {
        //点击减少
        let _this = this;
        $('.del').on('click', function () {
            alert(1)
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
            alert(1)
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
    }

    //提前获取cookie里面id和num



    //删除
    delete() {
        let _this = this;
        this.remove.on('click', function (ev) {
            _this.cookietoarray();//得到数组,上面的删除cookie需要。
            if (confirm('你确定要删除吗？')) {
                $(this).parent().parent().remove();//通过当前点击的元素找到整个一行列表，删除
            }
            _this.delgoodslist($(this).parents('.content1').attr('data-sid'), _this.arrsid);
        });
    }
    delgoodslist(sid, arrsid) {//sid：当前删除的sid，arrsid:cookie的sid的值
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
    }
    cookietoarray() {
        if ($.cookie('sid') && $.cookie('cookienum')) {
            this.arrsid = $.cookie('sid').split(',');//cookie商品的sid  
            this.arrnum = $.cookie('cookienum').split(',');//cookie商品的num
        }
    }

    setcookie(obj) { //obj:当前操作的对象
        this.cookietoarray();//得到数组
        var $index = obj.parents('.content1').attr('data-sid');//通过id找数量的位置
        this.arrnum[$.inArray($index, this.arrsid)] = obj.parents('.content1').find('.number input').val();
        $.cookie('cookienum', this.arrnum.toString(), 7);
    }
    singlegoodsprice(obj) { //obj:当前元素
        var $dj = parseFloat(obj.parents('.content1').find('.single_price').html());//单价
        var $cnum = parseInt(obj.parents('.content1').find('.number input').val());//数量
        return ($dj * $cnum).toFixed(2);//结果
    }


}

