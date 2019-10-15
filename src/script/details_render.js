let sid = location.search.substring(1).split('=')[1];
const phpurl = 'http://10.31.155.80/mi/xiaomi/php/';
let smallpic=document.querySelector('#smallpic');
let titleName = document.querySelector('.pro-title .name')
let information = document.querySelector('#J_desc')
let de_title = document.querySelector('#de_title')
let de_title1 = document.querySelector('#de_title1')


// 头部
$.ajax({
    url: phpurl+'select.php',
    dataType: 'json'
}).done(function (arrdata) {
    let strheaderAdv = '';//头部广告
    strheaderAdv+=`<a href="javascript:;" class="mm">小米手机</a><div class="erji-1"><div class="center"><ul>`;
    $.each(arrdata, function (index, value) {
        // 头部广告
        if(value.type=='headerAdv'){
            strheaderAdv+=` <li>
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
})    
// 头部
$.ajax({
    url: phpurl + 'details.php',
    data: {
        id: sid
    },
    dataType: 'json'
}).done(function (arrdata) {
    smallpic.src = arrdata.url;
    titleName.innerHTML = arrdata.title;
    information.innerHTML = arrdata.details;
    de_title.innerHTML=arrdata.title;
    de_title1.innerHTML=arrdata.title;

    let de_price =[];
    let de_Model =[];

    let strde_price = '';
    de_Model=arrdata.Model.split(',')
    de_price=arrdata.Modelprice.split(',')
    console.log(de_price)
    console.log(de_Model)
    $.each(de_Model, function (index, value) {
        strde_price+=`
        <div class="usechoose">
             <span class="Model">${value}</span>
             <span class="Modelprice">${de_price[index]}元</span>
        </div>
        `
    })
    let strprice = `${arrdata.price}元 <del>${arrdata.oldprice}元</del>`;//价格
    $('.pro-choose').html(strde_price);
    $('.pro-price span').html(strprice);

    new details().init();
});
