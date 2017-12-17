// posible snippets to choose, can also be an array
var principalSnippet = "snippets/principal-snippet.html";
var que_es_taichiSnippet = "snippets/que_es_taichi-snippet.html";
var quienes_somosSnippet = "snippets/quienes_somos-snippet.html";
var galeriaSnippet = "snippets/galeria-snippet.html";
var contactoSnippet = "snippets/contacto-snippet.html";

//auto called function
(function(global) {
  var currentSnippet = principalSnippet;

  var url = document.URL;  //get current url

  //Obtain the current anchor on the page
  var splittedUrl = url.split("#");
  var anchor;
  //if there is an anchor, save
  if(splittedUrl.length > 1) {
    anchor = splittedUrl[1];
    currentSnippet = selectSnippetByAnchor(anchor);
  }

  updateSnippet(currentSnippet);

})(window);

//Selects the correct snippet according to the given anchor
//if no anchor matches then returns to index
function selectSnippetByAnchor(currAnchor) {
  var currentSnippet = principalSnippet;
  if(currAnchor.includes("que_es_taichi")) {
    currentSnippet = que_es_taichiSnippet;
  } else if(currAnchor.includes("quienes_somos")) {
    currentSnippet = quienes_somosSnippet;
  } else if(currAnchor.includes('galeria')) {
    currentSnippet = galeriaSnippet;
  } else if(currAnchor.includes('contacto')) {
    currentSnippet = contactoSnippet;
  }

  return currentSnippet;
}

//Makes the ajax request to replace html code
function updateSnippet(snippet) {
  $.ajax({
    url: snippet,
    success: function(result) {
      $("#main-container").html(result);
    }
  });
}

//JQuery click event that is fired each time a navbar item is clicked
$('.link-element').click(function() {
  var anchor = $(this).attr('href');
  var currentSnippet = selectSnippetByAnchor(anchor);
  updateSnippet(currentSnippet);
});

function initMap() {
      var myLatLng = { lat: 20.705551, lng: -103.391372 };

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center: myLatLng,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scaleControl: true,
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            mapTypeControl: true,
            scrollwheel: false,
            //draggable: !("ontouchend" in document),
        });

        var contentString = '<div id="content">' +
        '<a href="https://www.google.com.mx/maps/place/20%C2%B042\'20.0%22N+103%C2%B023\'28.9%22W/@20.705551,-103.3935607,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d20.705551!4d-103.391372?hl=es-419">' +
        'Ver en Google Maps</a>' +
        '<h1>TaiChi</h1>' +
        '<p>Informacion interesante del mapa, agregar capturas del lugar sera genial</p>' +
        '</div>';

        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'TaiChi Colomos',
        });

        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
}
