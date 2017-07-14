<?php
/*
 * runtime()用于计算执行文件所需时间
 * @return float
 */
function runtime(){
    $time=explode(' ',microtime());
    return $time[1]+$time[0];
}
//连接数据库
function connect($host=ZHUJI,$user=USER,$password=PW,$database=DATABASE,$port=PORT){
    $link=@mysqli_connect($host,$user,$password,$database,$port);
    if(mysqli_connect_errno()){
        exit(mysqli_connect_error());
    }
    mysqli_set_charset($link,'utf8');
    return $link;
}
//执行一条mysql语句
function ZXsql($link,$query){
    $result=mysqli_query($link,$query);
    if(mysqli_errno($link)){
        exit(mysqli_error($link));
    }
    return $result;
}
//执行一条mysql语句，只返回bool
function ZXsqlBool($link,$query){
    $resultBool=mysqli_real_query($link,$query);
    if(mysqli_errno($link)){
        exit(mysqli_error($link));
    }
    return $resultBool;
}
/*
 一次性执行多条SQL语句
$link：连接
$arr_sqls：数组形式的多条sql语句
$error：传入一个变量，里面会存储语句执行的错误信息
使用案例：
$arr_sqls=array(
	'select * from sfk_father_module',
	'select * from sfk_father_module',
	'select * from sfk_father_module',
	'select * from sfk_father_module'
);
var_dump(execute_multi($link, $arr_sqls,$error));
echo $error;
*/
function ZXsql_num($link,$arr_sqls,&$error){
    $sqls=implode(';',$arr_sqls).';';
    if(mysqli_multi_query($link,$sqls)){
        $data=array();
        $i=0;//计数
        do {
            if($result=mysqli_store_result($link)){
                $data[$i]=mysqli_fetch_all($result);
                mysqli_free_result($result);
            }else{
                $data[$i]=null;
            }
            $i++;
            if(!mysqli_more_results($link)) break;
        }while (mysqli_next_result($link));
        if($i==count($arr_sqls)){
            return $data;
        }else{
            $error="sql语句执行失败：<br />&nbsp;数组下标为{$i}的语句:{$arr_sqls[$i]}执行错误<br />&nbsp;错误原因：".mysqli_error($link);
            return false;
        }
    }else{
        $error='执行失败！请检查首条语句是否正确！<br />可能的错误原因：'.mysqli_error($link);
        return false;
    }
}
//获取记录数
function num($link ,$sqlCount){
    $result=ZXsql($link,$sqlCount);
    $count=mysqli_fetch_row($result);
    return $count[0];
}
//转义
function escape($link,$data){
    if(is_string($data)){
        return mysqli_real_escape_string($link,$data);
    }
    if(is_array($data)){
        foreach ($data as $key=>$val){
            $data[$key]=escape($link,$val);
        }
    }
    return $data;
}
//关闭数据库链接
function close($link){
    mysqli_close($link);
}

//跳转函数
function skip($skip_url,$message){
    $html=<<<A
    <!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="5;URL={$skip_url}" />
    <title>跳转中...</title>
    <link rel="stylesheet" type="text/css" href="../admin/style/remind.css" />
</head>
<body>
<div class="notice" style="margin-top:50px;">{$message}正在跳转,<a href="{$skip_url}">直接跳转</a></div>
</body>
</html>
A;
    echo $html;
    exit();
}

//检测用户名
function check_username($name,$min,$max){
    $name=htmlspecialchars(str_replace(' ','',$name));
    if(mb_strlen($name,'utf-8')<$min || mb_strlen($name,'utf-8')>$max){
        skip($_SERVER['RESQUEST_URI'],'用户名不能小于'.$min.'个字符或超过'.$max.'字符');
    }
    return $name;
}
//检测密码
function check_password($pw,$min,$pw_again){
    $pw=str_replace(' ','',$pw);
    if(mb_strlen($pw,'utf-8')<$min){
        skip($_SERVER['RESQUEST_URI'], '密码不得少于'.$min.'位！');
    }
	if($pw_again!=0){
    if($pw!=$pw_again){
            skip($_SERVER['RESQUEST_URI'],'两次密码输入不一致！');
    }
  }	
        return sha1($pw);
}

//验证邮箱
function check_email($email){
    if(empty($email)){
        return null;
    }else{
        if(!preg_match('/^[\w\.\_]+@[\w\.\_]+(\.\w+)+$/',$email)){
            skip($_SERVER['RESQUEST_URI'],'邮箱格式错误！');
        }
        return $email;
    }
}

//验证QQ
function check_qq($qq){
    if(empty($qq)){
        return null;
    }else{
        if(!preg_match('/^[1-9]{1}[\d]{4,9}$/',$qq)){
            skip($_SERVER['RESQUEST_URI'],'QQ错误！');
        }
        return $qq;
    }
}

//验证码
function check_yzm($code1,$code2){
    if(strtolower($code1)!=strtolower($code2)){
        skip($_SERVER['RESQUEST_URI'],'验证码错误');
    }
}

//验证会员是否登录
function is_login($link){
    if(isset($_COOKIE['username']) && isset($_COOKIE['pw'])){
        $query="select * from member where name='{$_COOKIE['username']}'";
        $result=ZXsql($link,$query);
        if(mysqli_num_rows($result)==1){
            $data=mysqli_fetch_assoc($result);
            return $data['id'];
        }else{
            return false;
        }
    }else{
        return false;
    }
}
//分页函数
function page($a,$table,$url){
    global $pagesize,$link,$page_num,$result_num;
    if($a==1){
    echo '<div class="page">';
        echo '<ul>';
            $num="select count(*) from $table";
            $result_num=num($link,$num);
            if($result_num==0){
                $page_num=1;
            }else{
                $page_num=ceil($result_num/$pagesize);
            }
            if($_GET['page']>$page_num){
                $_GET['page']=$page_num;
            }
            for($a=0;$a<$page_num;$a++){
                if($_GET['page']==($a+1)){
                    echo  '<li><a href="'.$url.'?page='.($a+1).'" class="selected">'.($a+1).'</a></li>';
                }else{
                    echo  '<li><a href="'.$url.'?page='.($a+1).'">'.($a+1).'</a></li>';
                }
            }
            echo '</ul>';
     echo '</div>';
    }elseif($a!=1){
        echo '<div class="page_txt">';
        echo    '<ul>';
        echo        '<li>'.$_GET['page'].'/'.$page_num.'页 |</li>';
        echo            '<li>共有<b>'.$result_num.'</b>个会员 |</li>';
        $_page=$_GET['page'];
        if($_page==1){
            echo '<li>首页 |</li>';
            echo '<li>上一页 |</li>';
        }else{
            echo '<li><a href="'.$_SERVER['SCRIPT_NAME'].'">首页</a> |</li>';
            echo '<li><a href="'.$_SERVER['SCRIPT_NAME'].'?page='.($_page-1).'">上一页 |</li>';
        }
        if($_page==$page_num){
            echo '<li>下一页 |</li>';
            echo '<li>尾页 |</li>';
        }else{
            echo '<li><a href="'.$_SERVER['SCRIPT_NAME'].'?page='.($_page+1).'">下一页</a> |</li>';
            echo '<li><a href="'.$_SERVER['SCRIPT_NAME'].'?page='.$page_num.'">尾页 |</li>';
        }
echo '</ul>';
echo '</div>';
    }
}
?>