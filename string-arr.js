/*
对象与数组开始    
var test=['李',24,'计算机编程'];
alert(test.push('web前端'));     //返回新数组长度，IE返回undefine
delete test[1];					//删除第二个元素
alert(test.pop());				//移除最后一个元素，并返回该元素（web前端）,数组长度-1

var test=['李',24,'计算机编程'];
alert(test.unshift('新来的'));			//返回新数组长度，IE返回undefine
alert(test.shift());					//删除第一个元素，并返回该元素（李）,数组长度-1

//slice截取数组不会改变原数组，splice相反
var test=['李',24,'计算机编程'];
var arr=test.concat('web前端','南昌','新来的','hellow');	//concat()括号中也可以直接传一个数组
//var arr2=arr.slice(1);   //从一号开始取到最后,原数组arr不变
//var arr3=arr.slice(1,5);	//从一号开始截取，截到五号前一个元素（也就是4号），返回被截取的元素组成的新数组
//var arr4=arr.splice(1,5);   //从一号开始截取，截五个,比上一个多1，返回被截取的元素组成的新数组
var arr4=arr.splice(1)		//从一号开始取到最后,原数组arr只剩0号（李）


var test=['李',24,'计算机编程'];
var arr=test.concat('web前端','南昌','新来的','hellow');
var arr1=arr.splice(1,1);		//把2号位(24)剪切了
var arr2=arr.splice(1,1,28);    //返回被替换的元素[24]，原数组被修改，如果第二个参数为0，则在1号元素后插入个‘28’
var arr3=arr.splice(1,3,28,'改1','改2');  返回被替换的元素(1号——3号被替换了)，原数组被修改
alert(arr3);


var Str=arr.join('&');    		//将数组转成字符串，用&链接,原数组不变

arr.reverse()
alert(arr);			//返回倒序排列的数组

arr.sort();
alert(arr);			//比较每个元素第一个字符大小,而不是比较数值
要实现数值排序，就必须传入一个排序函数:
function sortNumber(a,b){
	return a - b;			从小到大排列
	return b-a;				从大到小排列
}
arr.sort(sortNumber);		



/* 对象与数组结束，字符串开始 */

var a=100;  var b=a.toString()  ||   var b=a.toFixed(1)		数字转为字符串(或是带一位小数的字符串)

var test='Mr.Lee';
var test1=test.concat('is','a','teacher');    //会返回连接后创建的完整新字符串，原字符串不变
alert(charAt(1));			//返回1号字符
alert(charCodeAt(1));		//返回1号字符的编码
//alert(test1.slice(1));      //从一号开始取值，到最后,原字符串不变
//alert(test1.slice(1,6));		//从一号开始取值，取到6号前一位（也就是五号元素r.Lee）,当（）内为正数时slice==substring
//alert(test1.substr(1));			//从一号开始取值，到最后,原字符串不变,等于slice(1)
alert(test1.substr(1,6));		//从一号开始取值，取6个

//负值截取字符串
var test='Mr.Lee';
var test1=test.concat('is','a','teacher');    //会返回连接后创建的完整新字符串，原字符串不变
//alert(test1.slice(-4));						//从倒数第4位元素开始取到最后（cher），原字符串不变
//alert(test1.slice(3,-1));						//从三号开始取，取得倒数第二位
//alert(test1.slice(-7,-3));				   //从倒数第七位开始取，取到倒数第4位（teac）
//alert(test1.substring(-4));					//传递负数无效，原样返回
//alert(test1.substring(5,-3));					//返回5号元素前的所有，负参数无效
substr不推荐传递负数，IE会出错

//查询字符串，如果查询不到，则返回-1
var test='Mr.Lee';
var test1=test.concat('is','a','teacher');    //会返回连接后创建的完整新字符串，原字符串不变
//alert(test1.indexOf('L'))					//查询第一次出现L的位置（3）
//alert(test1.indexOf('e',6));				//从6号开始查询第一次出现e的位置（10）
//alert(test1.lastIndexOf('e'));				//从最后向前开始查询，第一次出现e的位置（14）
alert(test1.lastIndexOf('e',9));			//从第九号元素开始向前查询第一次出现e的位置（5）

获取L的所有位置
var box = 'Mr.Lee is Lee';					//包含两个L的字符串
var boxarr = [];							//存放L位置的数组
var pos = box.indexOf('L');					//先获取第一个L的位置
while (pos > -1) {							//如果位置大于-1，说明还存在L
	boxarr.push(pos);						//添加到数组
	pos = box.indexOf('L', pos + 1);			//从新赋值pos目前的位置
}
alert(boxarr);	        				//输出3,10

indexOf可以用于数组
let arr = ['orange', '2016', '2016'];
 
arr.indexOf('orange'); //0
arr.indexOf('o'); //-1
arr.indexOf('2016'); //1
arr.indexOf(2016); //-1


var test='Mr.Lee';
var test1=test.concat('is','a','teacher');          				//输出3,10
//alert(test1.match('L')); 									//返回数组L，没找到怎返回null
//alert(test1.search('L')); 									//返回第一次出现L的位置（3），等于indexOf('L')
//alert(test1.replace('e','Q')); 							//返回替换后的字符串,原来的不变,把第一次出现的e换成了Q
alert(box.split(' '),3);							//以空格为分界转为数组，第二个参数限制数量,原字符串不变
 
test.toLowerCase();  								//转为小写 
test.toUpperCase();  								//转为大写 
返回的是新的字符串，原字符串不会改变


//替换指定字符
function str_replace(str,pos,replaceText){
    return str.substr(0,pos)+replaceText+str.slice(pos+1);
}
