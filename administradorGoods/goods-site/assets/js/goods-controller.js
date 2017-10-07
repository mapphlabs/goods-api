$( document ).ready(function() {
getCausas()

$("#addCausa").click(function(){
  $('#modal-add-causa').modal('show');
});


});



function createCardCausa(cardObject){

  var storageRef = firebase.storage().ref();
  var spaceRef = storageRef.child(cardObject.urlImg);
  spaceRef.getDownloadURL().then(function(url)                             {

      var containerCol = document.createElement("div");
      containerCol.setAttribute("class","col-lg-3 col-md-6 col-sm-6");

      var containerCard = document.createElement("div");
      containerCard.setAttribute("class","card card-stats");

      var cardImgContainer = document.createElement("div");
      cardImgContainer.setAttribute("class","card-header");
      var imgCausa = document.createElement("img");
      imgCausa.setAttribute("src",url);
      cardImgContainer.appendChild(imgCausa);

      var cardContentContainer = document.createElement("div");
      cardContentContainer.setAttribute("class","card-content");
      var createName = document.createElement("p");
      createName.setAttribute("class","category");
      createName.innerHTML= cardObject.idCausa;
      var createid = document.createElement("p");
      createid.setAttribute("class","title");
      createid.innerHTML= "Alcance "+cardObject.alcance;;
      cardContentContainer.appendChild(createName);
      cardContentContainer.appendChild(createid);




      var cardFooterContainer = document.createElement("div");
      cardFooterContainer.setAttribute("class","card-footer");
      var cardFooter = document.createElement("div");
      cardFooter.setAttribute("class","stats");

      var infoHistoria = document.createElement("p");
      infoHistoria.innerHTML =  cardObject.historia

      cardFooter.appendChild(infoHistoria);
      cardFooterContainer.appendChild(cardFooter);

      containerCard.appendChild(cardImgContainer);
      containerCard.appendChild(cardImgContainer);
      containerCard.appendChild(cardContentContainer);
      containerCard.appendChild(cardFooterContainer);
      containerCol.appendChild(containerCard);

      var generalContainerCausa = document.getElementById("causas-container");
      generalContainerCausa.appendChild(containerCol);
}).catch(function(error) {
  console.error(error);
});




}

function getCausas(){
  $("#causas-container").empty();
   firebase.database().ref('/goods/buenasCausas').once('value').then(function(snapshot) {
    var causasIds = Object.keys(snapshot.val());
    causasIds.forEach(function(item){
      createCardCausa(snapshot.child(item).val());
    });
  });
}

function readURL(){
   var file = document.getElementById("getImgCausas").files[0];
   var reader = new FileReader();
   reader.onloadend = function(){
      document.getElementById('imgCausa').setAttribute("src",reader.result);
   }
   if(file){
      reader.readAsDataURL(file);
    }else{
    }
}


function uploadImgToFirebase(){
  var tituloCausa = document.getElementById('titulo-causa').value;
  var metaCausa = document.getElementById('meta-causa').value;
  var localidadCausa = document.getElementById('localidad-causa').value;
  var historiaCausa = document.getElementById('historia-causa').value;
  var b64 = document.getElementById('imgCausa').getAttribute('src').split(",")[1];
   var fileInput = document.getElementById('getImgCausas');
  var fileName = fileInput.value.split(/(\\|\/)/g).pop();
  var causaFileName = fileName;

  if (tituloCausa == "" || metaCausa == "" ||  localidadCausa == "" || historiaCausa == "" || causaFileName == "") {
    alert("campos imcompletos");
  }else {
    var storageRef = firebase.storage().ref();
    var causaRef = storageRef.child(causaFileName);
    var causaImagesRef = storageRef.child('buenasCausas/'+causaFileName);
    causaImagesRef.putString(b64, 'base64').then(function(imgData) {
     console.log('Uploaded a base64url string!',imgData.metadata.fullPath);
     firebase.database().ref('/goods/buenasCausas').once('value').then(function(snapshot) {
       var objctCausa = {};
       if (snapshot.val() != null) {
         var causasIds = Object.keys(snapshot.val());
         objctCausa.urlImg = imgData.metadata.fullPath;
         objctCausa.historia = historiaCausa;
         objctCausa.meta = metaCausa;
         objctCausa.localidad = localidadCausa;
         objctCausa.alcance = 0+"";
         objctCausa.recaudado = 0+"";
         objctCausa.idCausa = causasIds.length+2+"";
         console.log("pbjeto ",objctCausa);
         var newCausaKey = firebase.database().ref("/goods/buenasCausas/").push().key;
         firebase.database().ref("/goods/buenasCausas/"+newCausaKey).set(objctCausa);
         $("#modal-add-causa").modal("hide");
getCausas()
       }else{
         objctCausa.urlImg = imgData.metadata.fullPath;
         objctCausa.historia = historiaCausa;
         objctCausa.meta = metaCausa;
         objctCausa.localidad = localidadCausa;
         objctCausa.alcance = 0;
         objctCausa.recaudado = 0;
         objctCausa.idCausa = 0;
         var newCausaKey = firebase.database().ref("/goods/buenasCausas/").push().key;
         firebase.database().ref("/goods/buenasCausas/"+newCausaKey).set(objctCausa);
         $("#modal-add-causa").modal("hide");
         getCausas();
       }

     });
     /*

     alcance:
     "2323"
      historia:
     "asdasdasd"
      idCausa:
     "2312"
      localidad:
     "Mexico DF"
      meta:
     "15,000"
      recaudado:
     "3500"
      urlImg:
     "buenasCausas/GF001.jpg"

     */
    });
  }

}



function uploadImgProductoToFirebase(){
  var nombreProducto = document.getElementById('nombre-producto').value;
  var skuProducto = document.getElementById('sku-producto').value;
  var descripcionProducto = document.getElementById('descripcion-producto').value;

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
