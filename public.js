//兼容获取css样式
 function getStyle (element,attr){
  return window.getComputedStyle?window.getComputedStyle(element, null)[attr]:element.currentStyle[attr];
} 

//获取className
function getClass(parentNode,className){
	var node;
	var arr=new Array();
	 if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    }
  var all=node.getElementsByTagName('*');
  for(var a in all){
    if(new RegExp('\\b'+className+'\\b').test(all[a].className)){
      arr.push(all[a]);
    }
  }
  return arr;
}

//判断是否存在某个class
function hasClass(element, className) {  
  return new RegExp('(\\s|^)'+className+'(\\s|$)').test(element.className);
}

//添加一个class，如果不存在的话
function addClass(element, className) {
  if (!hasClass(element, className))   {       
    element.className += " "+className;  
  }
}

//删除一个class，如果存在的话
function removeClass(element, className) {   
  if (hasClass(element, className)) {         
    element.className = element.className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');   
  }
}  

//获取索引
 function ref(element,target){
    for(var a in element){
      if(element[a]==target){return a;}
    }
  }

//滚动条距离
function scroll(){
      return {
        top:document.documentElement.scrollTop || document.body.scrollTop,
        left:document.documentElement.scrollLeft || document.body.scrollLeft
      }
  }

  //可视区宽高
  function getInner (){
    if(window.innerWidth != 'undefined'){
      return {
        width:window.innerWidth,
        height:window.innerHeight
      }
    }else if(document.compatMode == 'BackCompat'){
      return {
        width:document.body.clientWidth,
        height:document.body.clientHeight
      }
    }else {
      return {
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
      }
    }
  }


  //移入移出事件
  function hover(element,fn1,fn2){
  var elements=[];
  if(element.length==undefined){
     elements.push(element);
  }else{
     for(var i=0;i<element.length;i++){
        elements.push(element[i]);
      }
  }
 for(var a in elements){
     elements[a].timer=null;
     elements[a].addEventListener('mouseover',fn1,false);
     elements[a].addEventListener('mouseout',fn2,false);
  }
}


//获取元素中点坐标
function coordinate(parent,element){
  return {
      left:element.offsetLeft+element.clientWidth/2,
      top:parent.offsetTop+element.offsetTop+element.clientHeight/2
  }
}

//获取两点间的距离
function distance(mouseX,mouseY,targetX,targetY){
 return Math.sqrt(Math.pow(mouseX-targetX,2)+ Math.pow(mouseY-targetY,2));
}

//获取被选中文本的内容
function selectText(){
		if(document.selection){ //ie
			return document.selection.createRange().text;
		}
		else{  //标准
			return window.getSelection().toString();
		}
	}

  //寻找同级下一个元素节点
  function nextElement(element){
    if(element.nextSibling.nodeType!=1){
      return arguments.callee(element.nextSibling);
    }else{
      return element.nextSibling;
    }
  }

  //寻找同级下一个指定的元素节点
   function nextAppoint(element,name){
    if(element.nextSibling.nodeName!=name){
      return arguments.callee(element.nextSibling);
    }else{
      return element.nextSibling;
    }
  }

  //寻找同级上一个元素节点
  function prevElement(element){
    if(element.previousSibling.nodeType!=1){
      return arguments.callee(element.previousSibling);
    }else{
      return element.previousSibling;
    }
  }

  //获取|设置元素属性
  function attr(element,attrName,newValue){
    if(!newValue){
      return element.getAttribute(attrName);
    }else{
      element.setAttribute(attrName,newValue);
    }
  }

  //窗口居中
  function center(element){
    element.style.left=(getInner().width+scroll().left-element.offsetWidth)/2+'px';
    element.style.top=(getInner().height+scroll().top-element.offsetHeight)/2+'px';
  }
  
  //兼容获取事件目标
function getTarget(evt){
    return evt.target?event.target:window.event.srcElement;
}

//添加事件
function addEvent(obj,type,fn){
	if(obj.addEventListener) {
		obj.addEventListener(type,fn,false);
	} else if(obj.attachEvent){
		obj.attachEvent('on'+type,fn);
	}
}

//移除事件
function removeEvent(obj,type,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(type,fn,false);
	} else if(obj.detachEvent){
		obj.detachEvent('on'+type,fn);
	}
}

//取消默认行为
function noDefault (evt){
    var e=getEvt(evt);
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue=false;
    }
}

//取消冒泡
function noBubble (evt){
    var e=getEvt(evt);
    if ( e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

//兼容返回键盘编码
function getcode (evt){
    var e=evt||window.event;
    if(!e.charCode){
        return e.keyCode;
    }else{
        return e.charCode;
    }
}



//设置cookie
function setCookie(admin,value,expires,path,domain,source){
    var cookieName=encodeURIComponent(admin)+'='+encodeURIComponent(value);
    if(expires instanceof Date){
        cookieName+=';expires='+expires;
    }
    if(path){
        cookieName+=';path='+path;
    }
    if(domain){
        cookieName+=';domain='+domain;
    }
    if(source){
        cookieName+=';source';
    }
    document.cookie=cookieName;
}


//设置过期时间
function set_date(time){
    if(typeof time=='number' && time>0){
        var date=new Date();
        date.setDate(date.getDate()+time);
    }else{
        throw new Error('参数错误');
    }
    return date;
}

//cookie取值
function getCookie(name){
    var cookieName=encodeURIComponent(name)+'=';
    var cookieStart=document.cookie.indexOf(cookieName);
    if(cookieStart>-1){
        var cookieEnd=document.cookie.indexOf(';',cookieStart);
        if(cookieEnd==-1){
            cookieEnd=document.cookie.length;
        }
        var cookieValue=document.cookie.substring(cookieStart+cookieName.length,cookieEnd);
    }
    return decodeURIComponent(cookieValue);
}



//删除cookie
function unsetCookie(name) {
    document.cookie = name + "= ; expires=" + new Date(0);
}
