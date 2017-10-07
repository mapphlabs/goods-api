


function readURL(){
   var file = document.getElementById("getImgProductos").files[0];
   var reader = new FileReader();
   reader.onloadend = function(){
      document.getElementById('imgProducto').setAttribute("src",reader.result);
   }
   if(file){
      reader.readAsDataURL(file);
    }else{
    }
}
function uploadImgProductoToFirebase(){
  var nombreProducto = document.getElementById('nombre-producto').value;
  var skuProducto = document.getElementById('sku-producto').value;
  var descripcionProducto = document.getElementById('descripcion-producto').value;
  console.log("b64",document.getElementById('imgProducto').getAttribute('src').replace(" ",""));
  var b64 = document.getElementById('imgProducto').getAttribute('src').split(",")[1];
   var fileInput = document.getElementById('getImgProductos');
  var fileName = fileInput.value.split(/(\\|\/)/g).pop();
  var causaFileName = fileName;

  if (nombreProducto == "" || skuProducto == "" ||  descripcionProducto == "") {
    alert("campos imcompletos");
  }else {
    var storageRef = firebase.storage().ref();
    var causaRef = storageRef.child(causaFileName);
    var causaImagesRef = storageRef.child('productos/'+causaFileName);
    causaImagesRef.putString(b64, 'base64').then(function(imgData) {
     console.log('Uploaded a base64url string!',imgData.metadata.fullPath);
     firebase.database().ref('/goods/productos').once('value').then(function(snapshot) {
       var objctProduct = {};
       if (snapshot.val() != null) {
         objctProduct.urlImg = imgData.metadata.fullPath;
         objctProduct.nombre = nombreProducto;
         objctProduct.sku = skuProducto;
         objctProduct.descripcion = descripcionProducto;
         var newProductosKey = firebase.database().ref("/goods/productos/").push().key;
         firebase.database().ref("/goods/productos/"+newProductosKey).set(objctProduct);
         getProductos();
       }else{
         objctProduct.urlImg = imgData.metadata.fullPath;
         objctProduct.nombre = nombreProducto;
         objctProduct.sku = skuProducto;
         objctProduct.descripcion = descripcionProducto;
         var newProductosKey = firebase.database().ref("/goods/productos/").push().key;
         firebase.database().ref("/goods/productos/"+newProductosKey).set(objctProduct);
         getProductos();
       }
     });
    });
  }
}

function getProductos(){

}
