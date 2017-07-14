//兼容ajax
function ajax(obj){
    var xhr=new XMLHttpRequest();       //创建XHR对象
    var url=obj.url;
    //数据转移闭包
    obj.data=(function (data) {
        var arr=new Array();
        for(var a in data){
            arr.push(encodeURIComponent(a)+'='+encodeURIComponent(data[a]));
        }
        return arr.join('&');
    })(obj.data)
    if(obj.method=='get'){
        url+=url.indexOf('?')==-1?'?'+ obj.data:'&'+obj.data;
    }
    if(obj.async==true){
        xhr.onreadystatechange=function (){
            if(xhr.readyState==4){
                if(xhr.status>=200 && xhr.status<300 || xhr.status==304){
                    obj.info(xhr.responseText);
                }else {
                    alert('数据返回失败！状态代码：' + xhr.status + '状态信息：' + xhr.statusText);
                }
            }
        }
    }

    xhr.open(obj.method,url,obj.async);
    if(obj.method=='post'){
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(obj.data);
    }else {
        xhr.send(null);
    }
    if(obj.async==false){
        if(xhr.status==200){
            obj.info(xhr.responseText);
        }else {
            alert('数据返回失败！状态代码：' + xhr.status + '状态信息：' + xhr.statusText);
        }
    }
}


