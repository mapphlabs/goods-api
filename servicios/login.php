<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("db.php");

if(!isset($_GET['usuario'])){
	echo json_encode(error("Usuario requerido",null));
}else if(!isset($_GET['contrasenia'])){
	echo json_encode(error("Contraseña requerida",null));
}else{
	$db = new Db();
	$query="SELECT * FROM usuario WHERE usuario='".$_GET['usuario']."' AND contrasenia='".$_GET['contrasenia']."'";
	$result=$db->select($query);

	if($result){
		echo json_encode(ok("Usuario creado satisfactoriamente",$result));
	}else{
		echo json_encode(error("Error en base de datos",null));
	}
}

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