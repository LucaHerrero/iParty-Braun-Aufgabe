var app = new Framework7({
    // App root element
    root: '#app',
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
  
  var mainView = app.views.create('.view-main');