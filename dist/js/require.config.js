"use strict";require.config({paths:{jquery:"https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min",jqcookie:"https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min",lazyload:"https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min"}}),require(["jquery"],function(e){var o=e("#current-page").attr("target-module");o&&require([o],function(e){e.init()})});