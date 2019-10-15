

const rap2 = document.querySelector('.rap2');   
const phpurl = 'http://10.31.155.80/mi/xiaomi/php/';
$.ajax({
    url: phpurl+'select.php',
    dataType: 'json'
}).done(function (arrdata) {
    let strbanner = '';//banner图片
    let strheaderAdv = '';//头部广告
    let strAdv='';//广告
    let strmenu='';//菜单
    let strPhone='';  
    let strremen='';
    let strremenall='';
    let strTv='';
    let strTvall=''
    // banner图渲染
    strheaderAdv+=`<a href="javascript:;" class="mm">小米手机</a><div class="erji-1"><div class="center"><ul>`;
    $.each(arrdata, function (index, value) {
        // banner
        if (value.type=='banner') {
            strbanner += `<img class="img_show lazy" style="width:1266px;height:460px" data-original="${value.url}">`
        }

        // 头部广告
        if(value.type=='headerAdv'){
            strheaderAdv+=` <li>
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
        if(value.type=='TwoMenu'){
            strmenu += `
            <li><a href="javascript:;" class="nei"><img class="lazy"  style="width:40px;height:40px" data-original="${value.url}"><span>${value.title}</span></a></li>`
        }

        // 广告
        if(value.type=='Advertisement'){
            strAdv +=`<img class="lazy"  style="width:316px;height:170px" data-original="${value.url}"
            alt="小米">`
        }

        //手机栏
        if(value.type=='phoneAdv'){
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
        if(value.type=='remen'){
            strremen+=`
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
    if(value.type=='remenall'){
            strremenall +=`
            <div class="youx-1"><a href="javascript:;">
             <img class="lazy" style="width:80px;height:80px" data-original="${value.url}"alt="">
             </a>
             </div>
            <h3><a href="javascript:;">${value.title}</a></h3>
            <p>${value.price}元</p>`
    }


        //电视影音
        if(value.type=='Tv'){
            strTv+=`
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
        if(value.type=='Tvall'){
            strTvall+=`
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

   


    strbanner+=`<a href="javascript:;" class="zuo">1</a>
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

    new lunbo().init();
    new lunbo().dianqitab();



    //懒加载 添加lazy类  真实的图片路径添加到data-original  设置图片的宽高
    $(function () { //页面加载完成
            $("img.lazy").lazyload({
                effect: "fadeIn" //效果方式
            });
        });
});
