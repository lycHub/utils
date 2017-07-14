<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <title>文件上传</title>
</head>
<body>
<form method="post" enctype="multipart/form-data">
	<input type="file" name="myfile" />
	<input type='submit' name='upload' value='上传' />
</form>
</body>
</html>

<?php
header('content-type:text/html;charset=utf-8');
//var_dump($_FILES);
if(is_uploaded_file($_FILES['myfile']['tmp_name'])){
	$arr=pathinfo($_FILES['myfile']['name']);
	$filename=date('YmdGis').rand(0,9000000);
	if(move_uploaded_file($_FILES['myfile']['tmp_name'],"uploads/{$filename}.{$arr['extension']}")){
		echo "上传成功";
	}
}
?>

