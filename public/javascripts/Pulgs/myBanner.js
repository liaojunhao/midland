/**
 * name：myBanner
 * author：Andyjhl
 * Date：2017-06-23
 *
 * @automatic：Sets whether to scroll
 * @control：Sets whether to display controls
 * @Time：Set scroll time
 */

(function ($) {
    $.fn.extend({
        'myBanner': function (options) {
            var opts = $.extend(settings, options)
            var i = 0;
            var t = null;
            var clone = this.children('.b-list').children().first().clone();
            var size = this.children('.b-list').children().length+1
            this.children('.b-list').append(clone);
            this.css({position:"relative"})

            var BannerWidth = parseInt(this.children().first().children().css('width'));//获取宽度
            var Bannerheight = parseInt(this.children().first().children().css('height'));//获取高度
            var windowWidth = parseInt($(window).width());
            var w = (BannerWidth-windowWidth) / 2;//计算图片的居中位置

            /*设置显示控件*/
            if(opts.control){
                var btn = $('<div class="btn btn-l">&lt;</div><div class="btn btn-r">&gt;</div>');
                this.append(btn);
                this.children('.btn').css({
                    width:30,
                    height:50,
                    background:'rgba(0,0,0,0.5)',
                    position:'absolute',
                    top:'50%',
                    marginTop:'-25px',
                    cursor:'pointer',
                    textAlign:'center',
                    lineHeight:'50px',
                    color:'#fff',
                    fontSize:30,
                    display:'block',
                    fontFamily:'宋体'
                });
                this.children('.btn-l').css({left:100});
                this.children('.btn-r').css({right:100});
            }

            this.children().first().css({width:BannerWidth*size,height:Bannerheight,position: 'absolute',left:-w});
            this.css({position:'relative'});

            for(var j=0;j<size-1;j++){
                this.children('.num').append("<li></li>");
            }
            this.children('.num').children().first().addClass("on");
            this.children('.num').css({bottom:10});

            /*鼠标划入圆点*/
            this.children('.num').children().hover(function(){
                var index=$(this).index();
                i=index;//0
                $('.b-list').stop().animate({left:-((i*BannerWidth)+w)},200);
                $(this).addClass("on").siblings().removeClass("on")
            });

            /*设置是否自动播放*/
            if(opts.automatic){
                /*设置自动播放*/
                t = setInterval(function () {
                    i++;
                    move.call(this)//改变move函数this指向问题
                }.bind(this),opts.Time);//bind改变函数执行时this的指向问题
                this.hover(function(){
                    clearInterval(t)
                }, function () {
                    t = setInterval(function () {
                        i++;
                        move.call(this)
                    }.bind(this),opts.Time);
                }.bind(this));
            }

            /*设置是否显示控件*/
            if(opts.control){
                /*向左的按钮*/
                this.on('click','.btn-l',function(){
                    i++
                    move.call(this);
                }.bind(this))
                /*向右的按钮*/
                this.on('click','.btn-r',function(){
                    i--
                    move.call(this);
                }.bind(this));
            }

            /*滚动配置函数*/
            function move(){
                if(i==size){
                    this.children().first().css({left:-w});
                    i=1;
                }
                if(i==-1){
                    this.children().first().css({left:-(size-1)*BannerWidth})//3-1 2
                    i=size-2;
                }
                this.children('.b-list').stop().animate({left:-((i*BannerWidth)+w)},200);

                if(i==size-1){
                    this.children('.num').children().eq(0).addClass("on").siblings().removeClass("on")
                }else{
                    this.children('.num').children().eq(i).addClass("on").siblings().removeClass("on")
                }
            }
        }
    })

    //默认参数
    var settings = {
        automatic: true,  //设置是否自动滚动,如果是false就要通过num或者左右控件来切换左右滚动
        control: true,    //设置是否显示左右控件
        Time:2000         //设置banner过度时间
    };

})(jQuery);
