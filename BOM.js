//确定和取消
confirm('请确定或者取消');					//这里按哪个都无效		
if (confirm('请确定或者取消')) {				//confirm本身有返回值
	alert('您按了确定！');					//按确定返回true
} else {
	alert('您按了取消！');					//按取消返回false
}


//输入提示框
var num = prompt('请输入一个数字', value);		//两个参数，一个提示，一个默认值
//点击确定返回输入的值，点取消返回null


//跳转到指定页面
location.href = 'http://www.baidu.com';		
alert(location.href);		

location.assign('http://www.baidu.com');			//同上

location.replace('http://www.baidu.com');			//同上，只是不会生产历史记录

//刷新当前页
location.reload();


//移动新窗口
test.moveTo(200,300);				//参数是左上角的绝对坐标
test.moveBy(200,300);				//参数是横纵坐标的增量


//改变窗口大小
test.sizeTo(200,300);				//参数是长宽的值
test.sizeBy(200,300);				//参数是长宽的增量


//指定滚动条
window.scrollTo(100,500)			//滚动到指定x,y坐标
window.scrollBy(100,500)			//向右和向下滚动距离


//打开新窗口
open(url,name,attr);

