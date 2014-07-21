/*
* slide 应该是有比较丰富的API的，
*/
var slide = function(id){
    this.ctn = document.getElementById(id);
	this.ctnul = this.ctn.getElementsByTagName('ul')[0];//图片列表dom节点
    this.adLis = null; //banner 里面的li元素初始化
	this.adLisHight = 80; // 图片高度，填写数字内容
	this.adLisMarginTop=null;
    this.btns = null; //banner 里面的按钮元素。点击进行图片轮换
    this.animStep = 0.9;   //动画速度0.1～0.9 数字越大 速度越慢
    this.switchSpeed = 3; //自动播放间隔(s)
    this.crtIndex = 0; //初始化时刻的图片内容 .第几个元素开始，0表示是第一个
    this.crtLi = null; // 初始化当前的li标签内容信息
	this.crtIndexMarginTop = 0; 
	this.toIndexLiMarginTop=null;
    this.adLength = null;// banner里面图片的长度
    this.timerAnim = null;
    this.timerSwitch = null;
    this.init();
};

//给glume加原型
slide.prototype = {
    fnAnim:function(toIndex){
        if(this.timerAnim){window.clearTimeout(this.timerAnim);}
		var distance = toIndex -this.crtIndex;
		this.crtIndexMarginTop=this.adLis[this.crtIndex].style.marginTop;
		this.toIndexLiMarginTop=this.adLis[toIndex].style.marginTop;
		this.crtIndexMarginTop=this.crtIndexMarginTop.substring(0,this.crtIndexMarginTop.length-2);
		this.toIndexLiMarginTop=this.toIndexLiMarginTop.substring(0,this.toIndexLiMarginTop.length-2);
		this.ctnul.scrollTop= parseInt(this.ctnul.scrollTop)+10*distance; 
		if(toIndex >this.crtIndex ){
			if(this.ctnul.scrollTop >=this.toIndexLiMarginTop){
            this.crtIndex = toIndex;
            return;
       			 }
			}else{
				if(this.ctnul.scrollTop <=this.toIndexLiMarginTop){
           
            this.crtIndex = toIndex;
            return;
       			 }
				}
			
        this.timerAnim = window.setTimeout(this.fnAnim.bind(this,toIndex),20*this.animStep);
    },
    fnNextIndex:function(){
        return (this.crtIndex >= this.adLength-1)?0:this.crtIndex+1;
    },
	//两个选项之间的切换
    fnSwitch:function(toIndex){
        if(this.crtIndex==toIndex){return;}
		
        this.crtLi = this.adLis[this.crtIndex];
		
       if(toIndex == 0 && this.crtIndex == this.adLength-1 ){
		   	this.ctnul.scrollTop= 0; 
		   }
		
        for(var i=0;i<this.adLength;i++){
            this.btns[i].className = '';
        }
		
		if(toIndex==this.adLength-1){
			  this.btns[0].className = 'on'
		}else{
			this.btns[toIndex].className = 'on'
			}
      
        this.fnAnim(toIndex);
    },
    fnAutoPlay:function(){
        this.fnSwitch(this.fnNextIndex());
    },
    fnPlay:function(){
        this.timerSwitch = window.setInterval(this.fnAutoPlay.bind(this),this.switchSpeed*1000);// 图片转化动画效果
    },
    fnStopPlay:function(){
        window.clearTimeout(this.timerSwitch);
    },
	//初始化
    init:function(){
		this.adLis = this.ctn.getElementsByTagName('li');
		this.btns = this.ctn.getElementsByTagName('p')[0].getElementsByTagName('span');
		var firstLi = this.adLis[0];
		var liHeight = this.adLis[0].style.height;
		var addLi = firstLi.cloneNode(true);
		this.ctnul.appendChild(addLi);
		var firstBtn = this.btns[0];
		var addBtn = firstBtn.cloneNode(true);
		addBtn.style.display="none";
		this.ctn.getElementsByTagName('p')[0].appendChild(addBtn);
        this.adLength = this.adLis.length;	
		 for(var i=0,l=this.adLength;i<l;i++){
			 	this.adLisMarginTop= i*this.adLisHight ;
			 	this.adLis[i].style.marginTop= this.adLisMarginTop+"px";
        }
        for(var i=0,l=this.btns.length;i<l;i++){
                this.btns[i].index = i;
                this.btns[i].onmouseover = this.fnSwitch.bind(this,i);
        }
		this.crtIndexMarginTop=this.adLis[this.crtIndex].style.marginTop;
		this.crtIndexMarginTop=this.crtIndexMarginTop.substring(0,this.crtIndexMarginTop.length-2);
		this.ctnul.scrollTop = this.crtIndexMarginTop;
        this.fnPlay();
        this.ctn.onmouseover = this.fnStopPlay.bind(this); //  当鼠标移动到图片上边是 停止图片的轮换
        this.ctn.onmouseout = this.fnPlay.bind(this);//当鼠标已开是图片继续轮换
    }
};
var player1 = new slide('mod-slide');