
$.ajax({
    type: 'post',
    url: 'http://localhost/mi/php/select.php',
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
            strbanner += `<img class="img_show" src="${value.url}">`
        }

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

        // 菜单
        if(value.type=='TwoMenu'){
            strmenu += `
            <li><a href="javascript:;" class="nei"><img src="${value.url}"><span>${value.title}</span></a></li>`
        }

        // 广告
        if(value.type=='Advertisement'){
            strAdv +=`<img src="${value.url}"
            alt="小米">`
        }

        //手机栏
        if(value.type=='phoneAdv'){
            strPhone += `
            <li><div class="kuai"> <div class="biaoti"> <h3>新品</h3>
            </div><div class="kuai-1"><a href="javascript:;">
            <img src="${value.url}" alt=""></a>
            </div>
            <p class="p1"><a href="javascript:;">${value.title}</a>
            </p><p class="p2" style="color: #b0b0b0;">${value.details}</p>
           <span>${value.price}元</span></div></li>
            `
        }

        //热门
        if(value.type=='remen'){
            strremen+=`
            <li class="lili  li7">
            <div class="tuban">
                <a href="javascript:;">
                    <img src="${value.url}"
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
             <img src="${value.url}"alt="">
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
                    <img src="${value.url}"
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
                <img src="${value.url}"
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
});
