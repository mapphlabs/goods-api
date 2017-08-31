<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "HOLA MUNDO3";

require_once("db.php");

if(!isset($_GET['usuario'])){
	echo json_encode(error("Usuario requerido",null));
}/*else if(!isset($_GET['contrasenia'])){
	echo json_encode(error("Contraseña requerida",null));
}else if(!isset($_GET['contrasenia2'])){
	echo json_encode(error("Todos los campos son requeridos",null));
}else if($_GET['contrasenia']!=$_GET['contrasenia2'])){
	echo json_encode(error("Las contraseñas no coinciden",null));
}/*else{
	$db = new Db();
	$query="INSERT INTO usuario (usuario,contrasenia,id_perfil_usuario) VALUES ('".$_GET['usuario']."','".$_GET['contrasenia']."',0)";
	$result=$db->query($query);

	if($result){
		echo json_encode(ok("Usuario creado satisfactoriamente",$result));
	}else{
		echo json_encode(error("Error en base de datos",null));
	}
}*/

function error($msg,$data){
	$obj=array(
		"msg"=>$msg,
		"data"=>$data,
		"status"=>"error"
	);
	return $obj;
}

function ok($msg,$data){
	$obj=array(
		"msg"=>$msg,
		"data"=>$data,
		"status"=>"ok"
	);
	return $obj;
}

?>