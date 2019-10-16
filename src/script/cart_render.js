const phpurl = 'http://10.31.155.80/mi/xiaomi/php/';

if ($.cookie('sid').split(',')) {
    let strcart = '';
    for (i of $.cookie('sid').split(',')) {
        $.ajax({
            url: phpurl + 'details.php',
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
            console.log($('.del'));
            new cart().init();
        });

    }

}



