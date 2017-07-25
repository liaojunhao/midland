# 美联招聘项目
初学nodejs时曾在网上搜索nodejs的实战项目源码，无奈大部分都是简单的demo，对于学习nodejs没有太大的帮助，剩下的一些大部分都是像音乐播放器之类的展示型静态资源项目，交互没有预期那么复杂。

在初期接到这个项目的时候，感觉实现的逻辑并不是特别的复杂，加上公司人力有限，想着自己用nodejs去单独开发这一套网站。因为初学的nodejs，项目中有很多不成熟的地方，还望大家多多指教

在做技术选型的时候，我对vue、React框架还不是很成熟，项目也是催的比较着急，所以确定还是采用传统的MVC架构的方式去开发网站。多页面应用，前端还是用html+css+jQuery传统的方式去搭建，网站还大量采用了自己写的基于jQuery开发的插件库 jQueryPlugin：<https://github.com/liaojunhao/jQueryPlugin>，后台用nodejs环境，express开发框架，数据库方面用的是mongodb，而且会大量使用es6/7的语法，模板引擎用nodejs自带的ejs。

由于后台系统不是我这边开发，所以我只需要负责构建出前端页面就可以，现在的后台接口都用nodejs开发的临时接口，都是mock数据，后期等后台接口都发开完之后会改成用ajax开读取数据。


## 技术栈
##### 前端技术
`html`+`css`+`jQuery`+`less`
##### 后台技术
`nodejs` + `express` + `mongodb `+ `mongoose` + `es6/7` + `ejs`
##### 打包工具
`webpack `+ `gulp`

## 项目运行
```
git clone https://github.com/liaojunhao/midland
cd midland
npm instal
npm run start (启服务之前需先开启mongodb数据库)
访问: http://localhost:3000
```
## 项目演示
项目演示地址：<https://github.com/liaojunhao/midland>

## 功能实现
- [x] IP定位 -- 完成
- [x] 城市列表 -- 完成
- [x] 搜索地址 -- 完成
- [x] 上传图片 -- 完成
- [x] 登录注册 -- 完成
- [x] 岗位筛选 -- 完成
- [x] 模糊搜索 -- 完成
- [x] 修改密码 -- 完成
- [x] 设置简历 -- 完成
- [x] 投递简历 -- 完成
- [x] 设置个人信息 -- 完成
- [x] 统计投递人数 -- 完成
- [x] 发布校招行程 -- 完成
- [x] 地图展示 -- 完成
- [x] 流量统计 -- 待上线完成
- [x] 部署上线 -- 未完成

## 项目截图
![image](https://github.com/liaojunhao/midland/blob/master/screenshot/photo1.jpg)

![image](https://github.com/liaojunhao/midland/blob/master/screenshot/photo2.jpg)

![image](https://github.com/liaojunhao/midland/blob/master/screenshot/photo3.jpg)

![image](https://github.com/liaojunhao/midland/blob/master/screenshot/photo4.jpg)

![image](https://github.com/liaojunhao/midland/blob/master/screenshot/photo5.jpg)

![image](https://github.com/liaojunhao/midland/blob/master/screenshot/photo6.jpg)

![image](https://github.com/liaojunhao/midland/blob/master/screenshot/photo7.jpg)
## 项目布局

```
├── bin                        启动服务
│   ├── www.js                 启动服务文件
├── db                         配置数据库
│   ├── index.js                  数据库配置文件mongoose框架
├── public                   项目源代码
│   ├── images           图片资源
│   ├── javascript       js文件目录
│   │   ├── pulgs                插件目录
│   │   ├── social                岗位列表主js目录
│   │   ├── index.js             页面主逻辑js
│   │   ├── publicJS.js         公用代码
│   ├── lib                   第三方库
│   ├── mock              虚拟数据
│   ├── stylesheets     样式文件目录
│   │   ├── aboutStyle      关于我们样式目录
│   │   ├── indexStyle       首页样式目录
│   │   ├── publicStyle      公共样式目录
│   │   ├── welfareStyle    福利薪酬样式目录
│   │   ├── header.less      头部样式文件
│   │   ├── footer.less       头部样式文件
│   │   ├── reset.css          重置样式文件
│   │   ├── resume.less     简历样式文件
│   │   ├── social.less        岗位样式文件
│   ├── video              视频
│   ├── favicon.ico      收藏图标
├── routes                  路由配置目录
│   ├── about.js      关于我们路由
│   ├── contact.js    联系我们路由
│   ├── index.js       首页路由
│   ├── release.js    发布岗位路由（为了提供岗位数据设置的测试路由）
│   ├── resume.js   简历页面路由
│   ├── social.js      岗位列表路由
│   ├── user.js        用户路由
│   ├── welfare.js   福利页面路由
├── views              视觉层
│   ├── about                  关于我们目录
│   ├── include                共用组件目录
│   ├── resum                  简历页面目录
│   ├── socialRecruit       岗位列表目录
│   ├── user                    用户页面目录
│   ├── welfare               福利薪酬目录
│   ├── contact.html      联系我们页面
│   ├── error.html          404页面
│   ├── index.html         首页
│   ├── Release.html     发布职位页面（为测试页面，提供数据给数据库）
├── babelrc
├── bowerrc
├── gitignore
├── app.js                    项目主配置文件
├── package.json
├── README.md
├── settings.js                       数据库配置文件
├── webpack.config.js           webpack配置文件
```
## 项目总结
项目比较赶，很多细节都没有完善，性能还没有优化，好在整体逻辑不算复杂，前端的js代码不多所以自己嵌入到html页面中去。

初学的nodejs，第一次尝试运用到项目当中，有很多不完善的地方，nodejs也不是一天半天就能学会的，前面的路还长学无止境。后期会慢慢的补充完善项目，区分开发环境跟生产环境，模块化、组件化、工程化的开发方式来开发项目。

项目开发者：冰河末日


