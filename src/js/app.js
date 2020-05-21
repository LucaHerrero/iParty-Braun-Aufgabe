var app = new Framework7({
  // App root element
  root: '#app',
  darkTheme: true,
  // App Name
  name: 'iParties',
  // Unterseiten Pfade
  routes: routes,
  view: {
    pushState:true,
    pushStateRoot: 'http://localhost:666',
    pushStateSeparator: ""
  }
});

// Dom7 ist das gleiche wie jQuery... und es ist schon in Framework7 implementiert...
const $ = Dom7;
var mainView = app.views.create('.view-main');


app.request({
  url: '/fileTree/pathID/0/fileURL/0',
  method: 'GET',
  dataType: 'json',
  timeout: 30000,
  success: function (data, status, xhr) {
    for (let i of data) {
      $("#impressionImages").append(
        '<div class="swiper-slide">' +
        '<img src="' + i + '" alt="ipression Image" class="impImages">' +
        '</div>'
      );
    };
    let swiper = app.swiper.create('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      centeredSlides: false,
      pagination: {
        'el': '.swiper-pagination'
      }
    });
  }
});
/* Man könnte noch Events wie Error oder so einbauen aber das wäre glaube etwas too much
   Im normalerweise werden diese Daten von einer Datenbank geladen... in diesen Fall tun wir eindach so als wäre die news.json die Ausgabe einer Datenbank abfrage
   Läd den Inhalt des News Bereichs aus einer Json datei */
app.request({
  url: '/js/news.json',
  method: 'GET',
  dataType: 'json',
  timeout: 30000,
  success: function (data, status, xhr) {
    for (let i of data) {
      $("#news-row").append(
        '<div class="card card-header-pic col-100 medium-45">' +
        '<div style="background-image:url(' + i.image + ')" class="card-header align-items-flex-end">' + i.title + '</div>' +
        '<div class="card-content card-content-padding">' +
        '<p class="date">Posted on ' + i.date + '</p>' +
        '<p>' + i.long_text + '</p>' +
        '</div>' +
        '<div class="card-footer"><a href="#" class="link">Like ❤</a></div>' +
        '</div>'
      );
    };
  }
});