var app = new Framework7({
    // App root element
    root: '#app',
    darkTheme:true,
    // App Name
    name: 'iParties',
    // Unterseiten Pfade
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ],
  });
  
  // Dom7 ist das gleiche wie jQuery... und es ist schon in Framework7 implementiert...
  const $ = Dom7;
  var mainView = app.views.create('.view-main');

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
          '<div class="card-footer"><a href="#" class="link">Like</a><a href="#" class="link">Read more</a></div>' +
          '</div>'
        );
      };
    }
  });