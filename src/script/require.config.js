//主入口文件
require.config({
    // urlArgs: "version=1.0_" +Math.random(),　//解决缓冲，加载模块的时候后面带一个时间。
    // baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/',//公有的路径,如果引入的插件没有相同的路径，不能整理公用路径
    paths:{
        'jquery':'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min',  //插件名称必须交jquery
        'jqcookie':'https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min',
        'lazyload':'https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min'
    }
});
//加载模块渲染
require(["jquery"], function ($) {
    var targetModule = $("#current-page").attr("target-module");
    //mod_index.js    mod_details.js
    if (targetModule) {//判断是否存在目标模块
        require([targetModule], function (targetModule) {//加载目标模块
          targetModule.init();
        });
    }
    //mod_index.js    mod_details.js
 
    
});
