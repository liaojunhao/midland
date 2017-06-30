$(function () {
    //淡入淡出
    $(".nav").hover(function() {
        $(".center").stop().fadeIn("slow");
    }, function() {
        $(".center").stop().fadeOut("slow");
    });

    $('.nav .ser').mouseover(function () {
        $('.two-list>li').css("background-color", "");
        $('.two-list>li .angle').css({'display':'none'});
        $(".two-list>li").eq($(this).index()).css({ "background-color": "#f7f7f7"}).children('.angle').css({'display':'block'});
    })
    //banner插件
    $('.banner').myBanner({Time:3600,control:false,automatic:true});

    $('.down').hover(function () {
        $('.nav-user-wrapper').show()
    }, function () {
        $('.nav-user-wrapper').hide()
    });

    //动态定义导航的active值
    var Linknama = window.location.pathname;
    var reg = /^\/([A-Za-z]+)/gi
    reg.exec(Linknama);
    var Route = RegExp.$1;
    $('.nav>.ser>a').each(function (index,ele) {
        if( ele.attributes['title'].nodeValue == Route ){
            ele.setAttribute('class','active');
        }
    })
})
