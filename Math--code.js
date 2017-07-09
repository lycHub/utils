  //Math对象
  Math.ceil();      //向上取整
  Math.floor();      //向下取整

  Math.max(a,b,,,);    //返回参数中的较大者
  Math.min(a,b,,,);   //与上相反
 
  Math.random();       //返回0~1之间的随机数
  
  Math.abs(num)			//取绝对值
  
  
  
  //内置对象
	var box = '//Lee李';
	alert(encodeURI(box));						//只编码了中文
	alert(decodeURI(encodeURI(box)));			//解码		

	var box = '//Lee李';
	alert(encodeURIComponent(box));			//特殊字符和中文编码了
	alert(decodeURIComponent(encodeURIComponent(box)));		//解码

  
  
  
  try{
	  这里的语句如果出错,立刻中断并执行catch
  }catch(e){
	  try出错是执行,可输出错误信息e.message
  }finally{
	  不管try有没有错都会执行这里
  }


