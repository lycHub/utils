<?php
if(version_compare(PHP_VERSION,'5.2.0')==-1){
    exit('您的版本为'.PHP_VERSION.',该版本不能小于5.2.0');
}
date_default_timezone_set('Asia/Shanghai');
header('content-type:text/html;charset=utf-8');
session_start();
define('ROOT_PATH',dirname(dirname(__FILE__)));
//引入公共函数
include_once ROOT_PATH.'/includes/func_inc.php';
define('START_TIME',runtime());
define('ZHUJI','localhost');
define('USER','root');
define('PW','');
define('DATABASE','message');
define('PORT','3306');
?>