// Kurzgesagt das Apache oder NGINX in NodeJS.
const express = require('express');
const app = express();
// Damit haben wir zugriff auf Lokale Datein auf Ihrem PC.
const fs = require('fs');
// Dieses Packet dient einzig und allein dazu einen Link in ihrem Browser zu öffnen.
const open = require('open');
// Dieses Paket dient dazu, falls das Open Paket versagt, dass Sie in ihrem Terminal auf ein Link klicken können...
// Und nicht wie Steinzeit Menschen es mühsam abtippen müssen.
const terminalLink = require('terminal-link');

// Weiterleitung und Fregabe der benötigten Verzeichnisse von Ihrem PC.
// Mit dieser Methode kann man z.B. Verzeichnisse verlinken die es garnicht gibt.
app.use('/', express.static(__dirname + '/src'));
app.use('/js', express.static(__dirname + '/node_modules/framework7/js'));
app.use('/css', express.static(__dirname + '/node_modules/framework7/css'));

// Sagt Ihrenen Apache .htaccess -> "DirectoryIndex" etwas? Genau so kann man sich das etwa vorstellen.
// Man kann halt nicht existente Unterverzeichnisse verlinken (so funktionieren auch diese "costum" 404 Seiten).
// Im ersten Abschnitt müssen wir jedoch jede Seite definieren die eigenes nicht existente Unterverzeichis haben soll.
// In diesem Beispiel benutzt für eine Funkrion für das versenden von Mails.
app.get('/test', function (req, res) {
    res.send('Hello World!');
});
// Hier werden alle Unterverzeichnisse, außer das oben genannte auf die Main index.html datei verlinkt, egal was sie aufrufen Sie kommen immer nur zur Startseite...
// Kurzes Beispiel rufen Sie "http://localhost:666/ich-liebe-kokain/", statt der Normalen localhost Seite auf, bekommen Sie trotzdem die Normale localhost Seite zu sehen.
app.get('/*', function (req, res) {
    fs.readFile('src/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.send();
    });
});

// Dieser Part starter nun den Server den wir eben etwas konfiguriert haben...
app.listen(666, function () {
    console.log('Die Webseite sollte sich nun automatisch auf machen \nFalls nicht, ' + terminalLink('klicken Sie hier...', 'https://localhost:666/'));
});

// Weil wir natürlich nicht in der Steinzeit leben, sollte dieser Befehl AUTOMATISCH ein Browserfenster öffnen.
open('http://localhost:666/');