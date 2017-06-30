$(function(){
    change()
    function change(){
        var winH = $(window).outerHeight();
        var winW = $(window).outerWidth();
        $('#vid').css({
            height: winH+37,
            width:winW
        })
    }

    $("#search").focus(function(){
        $.ajax({
            type: "get",
            url: "mock/test.json",
            success: function(data){
                var ral = data;
                var str = ''
                $.each(ral, function(i, n){
                    str += '<li>'
                    str += '<a href='+n.url+'>'+n.name+'</a>'
                    str += '</li>'
                });
                $('.AJ-list').css({display:'block'}).append(str);
                return;
            }

        });
    });
    $('#search').blur(function(){
        $('.AJ-list').css({display:'none'}).children().remove('li');
    })

    $(".nav").hover(function() {
        $(".center").css("display", "block");
    }, function() {
        $(".center").css("display", "none");
    });

    $(".nav>li").mouseover(function() {
        $(".two-list>li>.three-list").css("background-color", "")
        $(".three-list").children().children().css({ "color": "#ffffff"})
        $(".two-list>li").eq($(this).index()).children(".three-list").css({ "background-color": "#fed900"}).children().children().css({ "color": "#000000"})
        $(".two-list>li>.angle").css({ "display": "none" })
        $(".two-list>li").eq($(this).index()).children(".angle").css({ "display": "block" })
        if ($(this).index() == 0) {
            $(".two-list>li").css("background-color", "")
            $(".two-list>li .angle").css({ "display": "none" })
        }
    });


    //$(window).on("resize", change);//resize 事件会在窗口或框架被调整大小时发生
})