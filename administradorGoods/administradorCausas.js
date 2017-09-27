$( document ).ready(function() {
  firebase.database().ref('/goods/').once('value').then(function(snapshot) {
    console.log(snapshot.val());
  });
});
