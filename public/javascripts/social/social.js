$(function(){

    $('#accordion').on('click','li', function () {
        $('#accordion>li>.details').css({display:'none'});
        $(this).children('.details').css({display:'block'});
    })

    function queryURLParameter(url) {
        url = url || window.location.href;
        var obj = {},
            reg = /([^?&=]+)=([^?&=]+)/g,
            res = reg.exec(url);
        while (res) {
            obj[res[1]] = res[2];
            res = reg.exec(url);
        }
        return obj;
    }
    var obj = queryURLParameter();

    if($.isEmptyObject(obj)){
        $('.place a:first-child').addClass('active');
        $('.category a:first-child').addClass('active');
        $('.grouping a:first-child').addClass('active');

    }else {
        if(!obj.city){
            $('.place a:first-child').addClass('active');
        }
        if(!obj.gory){
            $('.category a:first-child').addClass('active');
        }
        if(!obj.group){
            $('.grouping a:first-child').addClass('active');
        }

        obj.city = decodeURI(obj.city);
        obj.gory = decodeURI(obj.gory);
        obj.group = decodeURI(obj.group);

        $('.place a').each(function (index,ele) {
            if(ele.attributes['datattr'].nodeValue == obj.city.replace(/'/g,'')){
                ele.setAttribute('class','active');
            }
        });
        $('.category a').each(function (index,ele) {
            if(ele.attributes['datattr'].nodeValue == obj.gory.replace(/'/g,'')){
                ele.setAttribute('class','active');
            }
        });
        $('.grouping a').each(function (index,ele) {
            if(ele.attributes['datattr'].nodeValue == obj.group.replace(/'/g,'')){
                ele.setAttribute('class','active');
            }
        })
    }

    var city = $('.place').children('.active').attr('datattr');  //筛选的城市
    var gory = $('.category').children('.active').attr('datattr');  //筛选的类别
    var group = $('.grouping').children('.active').attr('datattr'); //筛选的组别
    var keyword = {};
    keyword = {city:city,gory:gory,group:group};
    var url = null;

    //给翻页中每个a标签添加后缀
    $('.Flip>li>a').each(function (index,ele) {
        var URL = ele.attributes['href'].nodeValue //获取
        ele.setAttribute("href",URL+'?'+ $.param(keyword)); // 设置
    });
    //给上一页下一页添加后缀
    $('.Flip>div>a').each(function (index,ele) {
        var URL = ele.attributes['href'].nodeValue //获取
        ele.setAttribute("href",URL+'?'+ $.param(keyword)); // 设置
    })


    $(".place").on('click','a',function() {
        keyword.city = $(this).attr('datattr');
        url = '?'+ $.param(keyword);
        window.location.href = url;
    })
    $(".category").on('click','a',function() {
        keyword.gory = $(this).attr('datattr');
        url = '?'+ $.param(keyword);
        window.location.href = url;
    })
    $(".grouping").on('click','a',function() {
        keyword.group = $(this).attr('datattr');
        url = '?'+ $.param(keyword);
        window.location.href = url;
    })
})

