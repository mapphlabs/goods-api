<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("db.php");

try{

	foreach ($_REQUEST as $key => $value) {
		$aux=json_decode($key,true);
	}

	$_REQUEST=$aux;

}catch(Exception $e){

}



if(!isset($_REQUEST['nombre'])){
	echo json_encode(error("Nombre requerido",null));
}else if(!isset($_REQUEST['apaterno'])){
	echo json_encode(error("Apellido paterno requerido",null));
}else if(!isset($_REQUEST['amaterno'])){
	echo json_encode(error("Apellido materno requerido",null));
}else if(!isset($_REQUEST['fnacimiento'])){
	echo json_encode(error("Fecha de nacimiento requerido",null));
}else if(!isset($_REQUEST['cpostal'])){
	echo json_encode(error("codigo postal requerido",null));
}else if(!isset($_REQUEST['colonia'])){
	echo json_encode(error("colonia requerido",null));
	}else  if(!isset($_REQUEST['email'])){
	echo json_encode(error("email requerido",null));
}else if(!isset($_REQUEST['email2'])){
	echo json_encode(error("confirmaciond email requerido",null));
}else if(!isset($_REQUEST['contrasenia'])){
	echo json_encode(error("Contraseña requerida",null));
}else if(!isset($_REQUEST['contrasenia2'])){
	echo json_encode(error("Todos los campos son requeridos",null));
}else if(!isset($_REQUEST['palabra'])){
	echo json_encode(error("Todos los campos son requeridos",null));
}else if($_REQUEST['contrasenia']!=$_REQUEST['contrasenia2']){
	echo json_encode(error("Las contraseñas no coinciden",null));
}else if($_REQUEST['email']!=$_REQUEST['email2']){
	echo json_encode(error("los emails no concide",null));
}else{
	$db = new Db();
	$query="INSERT INTO usuario (nombre,a_paterno,a_materno,f_nacimiento,codigo_postal,colonia,email,contrasenia,palabra,tel_movil)
		VALUES ('".$_REQUEST['nombre']."','".$_REQUEST['apaterno']."','".$_REQUEST['amaterno']."','"
		.$_REQUEST['fnacimiento']."','".$_REQUEST['cpostal']."','".$_REQUEST['colonia']."','".$_REQUEST['email']."','".$_REQUEST['contrasenia']."','".$_REQUEST['palabra']."','".$_REQUEST['tel_movil']."')";
	$result=$db->query($query);
 	if($result){

		$queryResult ="SELECT * FROM usuario WHERE email = '".$_REQUEST['email']."'";
		$response=$db->select($queryResult);

		echo json_encode(ok("Usuario creado satisfactoriamente",$result,$response));
	}else{
		echo json_encode(error("Error en base de datos",$result));
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

function ok($msg,$data,$response){
	$obj=array(
		"msg"=>$msg,
		"data"=>$data,
		"user"=>$response,
		"status"=>"ok"
	);
	return $obj;
}

?>
