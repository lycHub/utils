window.addEventListener('DOMContentLoaded',function(){
  var box=document.getElementById('box');
  var btn=document.getElementsByTagName('button')[0];
  btn.addEventListener('click',function(){
    animate({
      element:box,
      swing:'buffer',
      speed:'9',
      kvp:{width:400,height:100},
      fn:function(){alert('')}
    })
  })
})



function animate(obj){
  var element=obj.element;
  var attr=obj.attr?obj.attr:'left';
  var step=obj.step?obj.step:10;
  var target=obj.target;
  var swing=obj.swing?obj.swing:'buffer';
  var speed=obj.speed?obj.speed:7;
  if(target-parseInt(getStyle(element,attr))<0){
    step=-step;
  }

  if(!obj.kvp){
      obj.kvp={};
      obj.kvp[attr]=target;
    }
  clearInterval(element.timer);
  element.timer=setInterval(function(){
     var flag=true;
    for(var css in obj.kvp){
      attr=css;
      target=obj.kvp[css];
     if(swing=='buffer'){
      step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :(target - parseInt(getStyle(element, attr))) / speed;
      step=step>0?Math.ceil(step) : Math.floor(step);
    }

    if(attr=='opacity'){
      if(step>0 && target-parseInt(parseFloat(getStyle(element, attr))*100)<=step){
        element.style.opacity=target/100;
        element.style.filter='alpha(opacity='+target+')';
      }else if(step<0 && parseInt(parseFloat(getStyle(element, attr))*100)-target<=Math.abs(step)){
        element.style.opacity=target/100;
        element.style.filter='alpha(opacity='+target+')';
      }else{
        var temp = parseFloat(getStyle(element, attr)) * 100;
        element.style.opacity = parseInt(temp + step) / 100;
        element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
      }
       if(target!=parseFloat(getStyle(element,attr))*100){flag=false;}
    }else{
      if(step>0 && target-parseInt(getStyle(element,attr))<=step){
        element.style[attr]=target+'px';
      }else if(step<0 && parseInt(getStyle(element,attr))-target<=Math.abs(step)){
        element.style[attr]=target+'px';
      }else{
        element.style[attr]=parseInt(getStyle(element,attr))+step+'px';
      }
      if(target!=parseInt(getStyle(element,attr))){flag=false;}
    }

  }




    if(flag){
      clearInterval(element.timer);
      if(obj.fn){obj.fn()}
    }
    //console.log(attr+'||'+target)
    //document.getElementById('show').innerHTML+=parseFloat(getStyle(element,attr)*100)+'<br>';
    document.getElementById('show').innerHTML+=parseInt(getStyle(element,attr))+'<br/>';
  },50)
}



function getStyle(element,attr){
  return window.getComputedStyle?window.getComputedStyle(element, null)[attr]:element.currentStyle[attr];
}