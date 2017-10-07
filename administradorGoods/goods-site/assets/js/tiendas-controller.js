


function readURL(){
   var file = document.getElementById("getImgTiendas").files[0];
   var reader = new FileReader();
   reader.onloadend = function(){
      document.getElementById('imgTienda').setAttribute("src",reader.result);
   }
   if(file){
      reader.readAsDataURL(file);
    }else{
    }
}
function uploadImgTiendaToFirebase(){
  var nombreTienda = document.getElementById('nombre-tienda').value;
  var descripcionTienda = document.getElementById('descripcion-tienda').value;
   var b64 = document.getElementById('imgTienda').getAttribute('src').split(",")[1];
   var fileInput = document.getElementById('getImgTiendas');
  var fileName = fileInput.value.split(/(\\|\/)/g).pop();
  var causaFileName = fileName;

  if (nombreTienda == "" || descripcionTienda == "" ) {
    alert("campos imcompletos");
  }else {
    var storageRef = firebase.storage().ref();
    var causaRef = storageRef.child(causaFileName);
    var causaImagesRef = storageRef.child('tiendas/'+causaFileName);
    causaImagesRef.putString(b64, 'base64').then(function(imgData) {
     console.log('Uploaded a base64url string!',imgData.metadata.fullPath);
     firebase.database().ref('/goods/tiendas').once('value').then(function(snapshot) {
       var objctTienda = {};
       if (snapshot.val() != null) {
         objctTienda.urlImg = imgData.metadata.fullPath;
         objctTienda.nombre = nombreTienda;

         objctTienda.descripcion = descripcionTienda;
         var newTiendasKey = firebase.database().ref("/goods/tiendas/").push().key;
         firebase.database().ref("/goods/tiendas/"+newTiendasKey).set(objctTienda);
         getTiendas();
       }else{
         objctTienda.urlImg = imgData.metadata.fullPath;
         objctTienda.nombre = nombreTienda;
        objctTienda.descripcion = descripcionTienda;
         var newTiendasKey = firebase.database().ref("/goods/tiendas/").push().key;
         firebase.database().ref("/goods/tiendas/"+newTiendasKey).set(objctTienda);
         getTiendas();
       }
     });
    });
  }
}

function getTiendas(){

}
