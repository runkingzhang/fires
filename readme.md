# Fires

## 前言
- Fires 的名字来自多火，我以前在在的团队，中文名字叫做艾斯，来自海贼王的火拳艾斯。
- Fires 星星之火，可以燎原。
- Fires 是一种解决方案，并不是一个框架。
- Fires 是火柴，并不是火把。
- Fires是基于原型，面向设计开发的前端解决方案。

![logo](http://runkeji.com/github/ace.png "logo")
## 设计思想

设计思想参考：MVC思想，面向对象和基于原型

理论基础：标准盒子模型，css分类、书写顺序和继承   css层叠机制 (优先级和权重)  css拉伸和包裹  浏览器对css的解析机制 。

## 从面向效果的开发向面向设计开发的转变

前端一般将页面开发分为内容（HTML），样式（CSS），行为（javascript）。
在页面开发的时候做到相互分离，其实我感觉这边有一个MVC思想的延伸，
我们把HTML看做是View，是内容，是数据，
把CSS看做是model看做是容器，是模型，
把javascript看做是Controller是控制，是行为。

在以往的开发中，我们一般是做出一个页面，做出一个网站，给每个页面效果都写html和css实现，
后来我们有了html语义化的要求，有了css模块化的要求。

fires在这个基础上在对内容（HTML）和样式（CSS）借鉴MVC的思想来进行细分。
HTML分为layout（布局层）、model（模型层）、content（内容层）
把CSS属性分为展现属性(Controller)，自身属性(model)和文本属性(view)。

把一个页面设计图通过分析，提取出可以复用的模块，做到模块间的解藕。
每个模块可以看做是一个独立的整体，相互嵌套，组装成页面效果。
再利用原型的思想来实现原有css模块的页面设计图的不同效果实现。

- layout 层 ：主要控制页面大区块的布局，典型模块是header.footer
- model层：主要页面的可嵌套容器，典型模块是box，tab,nav
- content层:主要控制页面的内容展现样式，典型模块是list

对model和content的分类依据是模块内部是不是可以嵌套其他的model和content。可以那么是model，不可以是content。
这边有点像是结构化块状元素，多目标块状元素和终端块状元素的分法。


## css模块化向css模块原型化的转变

其实这边有点OOP的思想，但是我感觉用js中原型的思想更加容易理解，
考虑到浏览器的解析机制，和html、css和javascript一样是解析执行，
原型的理解可能也更加符合实际底层的机制。

这边的一个基础是：css优先级+css权重+css书写顺序来计算页面html到底会显示那些css属性，也就是css的层叠机制，
Cascading Style Sheets的Cascading。

下面我利用alice中的box来进行改造和讲解。
[alice-box](http://aliceui.org/box/#)
[alice-box github](https://github.com/aliceui/box)
修改前的效果
![alcie show](http://runkeji.com/github/alice.png "show")

上图是alice中box在500px宽度下面的实现效果。
代码如下：
HTML：
```html
<div class="lay-container">
        <div class="ui-box">
            <div class="ui-box-head">
                 <h3 class="ui-box-head-title">区块标题</h3>
                 <span class="ui-box-head-text">其他文字</span>
                 <a href="#" class="ui-box-head-more">更多</a>
             </div>
            <div class="ui-box-container">
                <div class="ui-box-content">ui-box-content 有默认内边距</div>
            </div>
        </div>
        <div style="margin:15px 0 0 0"></div>
        <div class="ui-box">
            <div class="ui-box-head">
                <h3 class="ui-box-head-title">没有内容</h3>
                <span class="ui-box-head-text">其他文字</span>
                <a href="#" class="ui-box-head-more">更多</a>
            </div>
            <div class="ui-box-container" style="display: none;">
                <div class="ui-box-content">ui-box-content 有默认内边距</div>
            </div>
        </div>
        <div style="margin:30px 0 0 0"></div>
        <div class="ui-box">
            <div class="ui-box-head">
                <h3 class="ui-box-head-title">区块标题</h3>
                <span class="ui-box-head-text">其他文字</span>
                <a href="#" class="ui-box-head-more">更多</a>
            </div>
            <div class="ui-box-container">
                <div class="ui-box-content">ui-box-content 有默认内边距</div>
            </div>
        </div>
        <div class="ui-box ui-box-follow">
            <div class="ui-box-head">
                <h3 class="ui-box-head-title">连着上面的box</h3>
                <span class="ui-box-head-text">其他文字</span>
                <a href="#" class="ui-box-head-more">更多</a>
            </div>
            <div class="ui-box-container">
                <div class="ui-box-content">ui-box-content 有默认内边距</div>
            </div>
        </div>
    </div>
```
CSS：
```css
.lay-container{width:500px;margin:20px auto ;}

.ui-box{border:1px solid #ccc;zoom:1;font-size:12px;margin:0;padding:0;border-bottom:0}
.ui-box:after{clear:both;content:" ";display:block;font-size:0;height:0;visibility:hidden}
.ui-box-follow{border-top:0}
.ui-box-head{border-bottom:1px solid #ccc;position:relative;padding:10px;height:16px;line-height:16px;
    background:-webkit-gradient(linear,left top,left bottom,from(#fcfcfc),to(#f9f9f9));
    background:-moz-linear-gradient(top,#fcfcfc,#f9f9f9);
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#f9f9f9');
    background:-o-linear-gradient(top,#fcfcfc,#f9f9f9);
    background:linear-gradient(top,#fcfcfc,#f9f9f9);zoom:1}
.ui-box-head .ui-box-head-title{color:#656565;font-size:14px;font-weight:700;float:left;
    display:inline;margin:0;padding:0}
.ui-box-head .ui-box-head-more{float:right}
.ui-box-head .ui-box-head-text{margin-left:10px;color:gray;float:left}
.ui-box-container{background:#fff;border-bottom:1px solid #ccc}
.ui-box-content{padding:10px}
```
我们可以看到源代码已经把浮动清除的方法:
 .clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }
.clearfix { *zoom:1; }
内置在在css中，这边的浮动清除还应该是清除错误的。

上面效果可以看做是一个box模型在四种场景中的使用（这边是设置不同的margin）。
我利用fires的规范来对alice box模型进行改造。

box是一个可以嵌套的内容的元素，所以应该属于model层。
用mod-box来代替原来的ui-box命名规范。我们把mod-box叫做box原型，
把new-mod-box-hidden、new-mod-box-margin、new-mod-box-follow叫做是box实例。
修改后的效果
![fires show](http://runkeji.com/github/fires.png "show")
改造后代码如下：
HTML：
```html
    <div class="lay-container">
        <!-- 下面是mod-box的原型 -->
        <div class="mod-box">
            <div class="mod-box-head">
                 <h3 class="mod-box-head-title">区块标题</h3>
                 <span class="mod-box-head-text">其他文字</span>
                 <a href="#" class="mod-box-head-more">更多</a>
             </div>
            <div class="mod-box-container">
                <div class="mod-box-content">mod-box-content 有默认内边距</div>
            </div>
        </div>
       <!--  下面是mod-box的实例 -->
        
        <div class="mod-box new-mod-box-hidden">
            <div class="mod-box-head">
                <h3 class="mod-box-head-title">没有内容</h3>
                <span class="mod-box-head-text">其他文字</span>
                <a href="#" class="mod-box-head-more">更多</a>
            </div>
            <div class="mod-box-container" >
                <div class="mod-box-content">mod-box-content 有默认内边距</div>
            </div>
        </div>
        
        <!--  下面是mod-box的实例 -->
        <div class="mod-box new-mod-box-margin">
            <div class="mod-box-head">
                <h3 class="mod-box-head-title">区块标题</h3>
                <span class="mod-box-head-text">其他文字</span>
                <a href="#" class="mod-box-head-more">更多</a>
            </div>
            <div class="mod-box-container">
                <div class="mod-box-content">mod-box-content 有默认内边距</div>
            </div>
        </div>
        <!--  下面是mod-box的实例 -->
        <div class="mod-box new-mod-box-follow">
            <div class="mod-box-head">
                <h3 class="mod-box-head-title">连着上面的box</h3>
                <span class="mod-box-head-text">其他文字</span>
                <a href="#" class="mod-box-head-more">更多</a>
            </div>
            <div class="mod-box-container">
                <div class="mod-box-content">mod-box-content 有默认内边距</div>
            </div>
        </div>
    </div>
```
在HTML中和alice的不同是去重新设置class name，去掉了原来的两个有margin的div和原来内嵌在html中的
display:none。

CSS：
```css
.lay-container{width:500px;margin:20px auto ;}
/*下面是box原型的css*/
.mod-box{border:1px solid #ccc;zoom:1;font-size:12px;margin:0;padding:0;border-bottom:0;}
.mod-box-head{border-bottom:1px solid #ccc;position:relative;
padding:10px;line-height:16px;
background:-webkit-gradient(linear,left top,left bottom,from(#fcfcfc),to(#f9f9f9));
background:-moz-linear-gradient(top,#fcfcfc,#f9f9f9);
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#f9f9f9');
background:-o-linear-gradient(top,#fcfcfc,#f9f9f9);
background:linear-gradient(top,#fcfcfc,#f9f9f9);
zoom:1;}
.mod-box-head:after{content:"."; display:block; height:0; visibility:hidden; clear:both; }
.mod-box-head-title{color:#656565;font-size:14px;font-weight:700;float:left;display:inline;margin:0;padding:0}
.mod-box-head-more{float:right}
.mod-box-head-text{margin-left:10px;color:gray;float:left}
.mod-box-container{background:#fff;border-bottom:1px solid #ccc}
.mod-box-content{padding:10px}
/*下面是box实例的css*/
.new-mod-box-hidden{margin: 15px 0 0 0;}
.new-mod-box-hidden .mod-box-container{display: none;}
.new-mod-box-margin{margin: 30px 0 0 0;}
.new-mod-box-follow{border-top:0}
```
改动是把css选择器都改成是class选择器，没有使用子类选择器。
把clearfix的方法从原来的ui-box移动到mod-box-head中，去掉了mod-box-head的height
还有就是对实例的属性书写。
在上面的例子中，我们把mod-box叫做box原型，
把new-mod-box-hidden、new-mod-box-margin、new-mod-box-follow叫做是box实例。
mod-box作为原型，应该做到对外的是拉伸，对内是包裹，浮动清除方法内置。

利用css层叠机制实例继承了原型中的属性，
利用css层叠机制实例可以对属性重新赋值和增加属性。

<div class="mod-box new-mod-box-hidden">...</div>
我们通过这种方式来写，new-mod-box-hidden实例写在原型的后面，用new来标记是实例。
在css代码中
.new-mod-box-hidden{margin: 15px 0 0 0;}//利用css的熟悉书序
.new-mod-box-hidden .mod-box-container{display: none;}//利用css的权重计算

mod实例是写在mod原型后面，这边要特别注意，因为只有写在后面实例属性才会对原型中已有的属性进行重新赋值。
.new-mod-box-hidde用css属性书写顺序来实现层叠，
.new-mod-box-hidden .mod-box-container使用权重来实现层叠。
通过这种方式来分离原来在alice中的模型，把特殊的三个应用提取到实例中来。
把第一个mod-box当做是原型的实例。

这种css模块原型花对layout、model、content都是适用的，css模块分为css模块原型和css模块实例。
原型是通用类库，实例是实际应用。

大体就是如此。
其实如果我讲明白了的话就是：
页面分层，模块实例。

至于css属性的分类，书写书序、标准盒子模型的理解以及对外的拉伸和对内的、模块的浮动清除等内容应该是内置
在模块的css中的。


