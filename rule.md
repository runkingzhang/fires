# Fires 

### 1.css书写规范
css书写顺序学习bootstrap的声明顺序。
相关的属性声明应当归为一组，并按照下面的顺序排列：
  - **Positioning**
  - **Box model**
  - **Typographic**
  - **Visual**
 
  
```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box-model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;

  /* Typography */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Misc */
  opacity: 1;
}
```
Typography的属性是子元素可以继承的。

### 2.注释规范
注释旨在指明团队协作中的创作、个性者和代码作用。
在 CSS 中，无论块组还是单行注释，均使用 '/* '注释 '*/'。
由于中文注释可能导致代码失效，但中文作为团队最有效的沟通文字，最好的使用方法是，
保证在'/*'和'*/'之间的中文前后都有空格，以保证 CSS 不会失效。 
```css
/* mod-box model层的box模块                                                         --- 简单描述
 * author: runkingzhang@163.com                                                   --- 作者
 * require: button                                                                                --- 依赖（可选）
 * father:                                                                                              --- 基类（可选）
 */
 
.mod-box{
font-family:serif\0/; /* solution:win7 ie8 line-height bug */      --- 行内注释
}

/* new-mod-box-favar  model层的box模块的实例                                              --- 简单描述
 * author: runkingzhang@163.com                                                                     --- 作者
 * require:                                                                                                               --- 依赖（可选）
 * father:   mod-box                                                                                              --- 基类（可选）
 */
```
### 3.模块命名规范
#### 页面分层，依据一页面结构和面向效果编程原理。把页面的模块分类三层。

  - **layout 层 **: 主要控制页面大区块的布局，典型模块是header
  	  + `lay`-+ `{位置}`-+ `[名称(可选)]`
	
	   ```css
	  .lay-header{}
	  .lay-container{}
	  .lay-content{}
	  .lay-footer{}
	   ```
  - **model层 **: 主要页面可以前台的模块，box，tab
  	  + `mod`-+ `[名称]`-+ `[名称(可选)]`
	
	   ```css
	  .mod-box{border: 1px solid #F5F5F5; width:100%;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);}
	  .mod-box-head{}
	  .mod-box-head-title{ float: left;display: inline; font-weight:normal; }
	  .mod-box-head-text{ float: left;; display: inline; margin: 0 0 0 10px;}
	  .mod-box-head-more{ float: right; color:#999;}
	  .mod-box-container{ min-height:10px;}
	  .mod-box-content{}
	   ```
	   model层今年每个子模块都有对应的名称，直接使用class选择区而不使用之类选择器，之类选择器在子类中使用。
	   每个model模块应该是一个真理，所以建议将一些方法出行（如浮动的清楚）内置在模块中间。
	   
  - **content层 **: 组要控制页面的内容展现样式，典型是内容的左右布局和list
  	  + `con`-+ `[名称]`-+ `[名称(可选)]`
	
	   ```css
		 .con-shop-box{}
		 .con-shop-left{ }
		 .con-shop-right{}
	   ```
	   content层今年每个子模块都有对应的名称，直接使用class选择区而不使用之类选择器，之类选择器在实例中使用。
	   

这三层应该是相互分离的，相互嵌套的。理论上来说不应该有属性跨层次继承和相互影响。
单独模块的html+css组合应该可以应用到其他的环境中，层次之间不应该纯在相互依赖的关系。


#### 模块原型

把layout，model，content层中的模块难做是原型模块。
```html
<div class="mod-box new-mod-box">
	  <div class="mod-box-head"></div>
	  <div class="mod-box-content"></div>
</div>
```
想上面的这种方式来对模块在页面的中使用，用new来创建原型实例。

在页面开发中用mod-box来提取出页面中模块的共有样式，组建相关模块，用new-mod-box来实现模块的在页面的应用。
+ `new-+ `[lay/mod/content模块名]`-+ `[实例名称]`

利用css的引入方法的优先级，css的权重计算和css的书写顺序来对原来模块中的css属性值进行重叠。
```css
.new-mod-box-promoted{ margin:15px 0 0 0;}
.new-mod-box-promoted  .mod-box-head{ height:40px;}
```

实例原型的css应该写在原型属性的下方，会对css进行重叠。这是通过css书写顺序实现的。
对模块的子模块的属性重写和设置都通过在原有子模块的前面+实例模块名称的方式来实现。
在css中实例和模型应该写在一起。
	
### 4.关于模块化
有三点需要注意的，一是，注意代码重用的模块化，其余可以重用的部分，组件原型；
                               二是，注意 HTML 结构的模块化，而不是分块，使用原型，替换和修改小面积的HTML内容。
                               三是，模块的实例化，在html使用class组件关键字的接口，用用上面的规则来实现页面中的效果，但是不应该对模块做修改。
							   
我们是这样重用的：
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

```css
	.lay-container{width:500px;margin:20px auto ;}

/* mod-box model层的box模块                                                     
 * author: runkingzhang@163.com                                                                                                                                        
 */
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

/* mod-box model层的box的实例                                                    
 * author: runkingzhang@163.com   
 * father:   mod-box                                                                                                                                   
 */
.new-mod-box-hidden{margin: 15px 0 0 0;}
.new-mod-box-hidden .mod-box-container{display: none;}
.new-mod-box-margin{margin: 30px 0 0 0;}
.new-mod-box-follow{border-top:0}
```
	
### 4.HTML书写规范
学习bootstrap的属性属性顺序。
HTML 属性应当按照以下给出的顺序依次排列，确保代码的易读性。
- `class`
- `id, name`
- `data-*`
- `src, for, type, href`
- `title, alt`
- `aria-*`
- `role*`
	
使用 `<div class="mod-box new-mod-box-margin">`的来原型的实例。在页面中更好的使用。

### 4.JavaScript规则
模块和JavaScript组合变成页面交互组件。这边一直使用id作为和js交互的接口。



	
## 参考
[Puerh](https://github.com/sofish/Puerh)
[Alice](https://github.com/aliceui/aliceui.org)
[bootstrap规范](http://codeguide.bootcss.com/#html-attribute-order)


	

