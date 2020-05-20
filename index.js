// Kurzgesagt das Apache oder NGINX in NodeJS.
const express = require('express');
const app = express();
// Damit haben wir zugriff auf lokale Datein auf Ihrem PC.
const fs = require('fs');
const path = require('path');
// Dieses Packet dient einzig und allein dazu einen Link in Ihrem Browser zu öffnen.
const open = require('open');
/* Dieses Paket dient dazu, falls das "open" Paket versagt, dass Sie in Ihrem Terminal auf ein Link klicken können...
   Und nicht wie Steinzeit Menschen es mühsam abtippen müssen. */
const terminalLink = require('terminal-link');
// Man brauchts nicht, aber ich fands lustig
var figlet = require('figlet');

/* Weiterleitung und Fregabe der benötigten Verzeichnisse von Ihrem PC.
   Mit dieser Methode kann man z.B. Verzeichnisse verlinken die es garnicht gibt. */
app.use('/', express.static(__dirname + '/src'));
app.use('/js', express.static(__dirname + '/node_modules/framework7/js'));
app.use('/css', express.static(__dirname + '/node_modules/framework7/css'));
app.use('/images', express.static(__dirname + '/Vorgaben/iParties/Bilder'));

/* Mir war's kurzgesagt zu anstrengend alle einzelnen Bilder in die Seite einzufügen.
   Also hab ich kurz diese API geschrieben, welche vordefinierte Datei Pfade als im JSON Format ausgibt 😅
   Wieso Vordefiniert? Damit man bestimmen kann, welche Datein im Browser gelistet werden können. */
const dirPaths = [
    'Vorgaben/iParties/Bilder/Impressionen'
];
const fileURL = [
    '/images/impressionen/'
]
app.get('/fileTree/pathID/:id/fileURL/:urlid', function (req, res) {
    let directoryPath = path.join(__dirname, dirPaths[req.params.id]);
    fs.readdir(directoryPath, function (err, files) {
        let fileTree = [];
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            fileTree.push(fileURL[req.params.urlid] + file);
        });
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify(fileTree));
    });
});

/* Sagt Ihnen Apache .htaccess -> "DirectoryIndex" etwas? Genau so kann man sich das in etwa vorstellen.
   Man kann halt nicht existente Unterverzeichnisse verlinken (so funktionieren auch diese "costum" 404 Seiten).
   Im ersten Abschnitt müssen wir jedoch jede Seite definieren die ein eigenes nicht existente Unterverzeichis haben soll.
   In diesem Beispiel benutzt für eine Funktion, für das versenden von Mails. */
app.get('/test', function (req, res) {
    res.send('Mail gesendet!');
});
/* Hier werden alle Unterverzeichnisse, außer das oben genannte auf die Main index.html datei verlinkt, egal was sie aufrufen Sie kommen immer nur zur Startseite...
   Kurzes Beispiel rufen Sie "http://localhost:666/ich-liebe-kokain/", statt der Normalen localhost Seite auf, bekommen Sie trotzdem die Normale localhost Seite zu sehen.
   Steuern Sie jedoch direkt Datein an werden Ihnen diese statt der Main Seite angezeigt. */
app.get('/*', function (req, res) {
    fs.readFile(__dirname + '/src/index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        return res.send();
    });
});

console.clear();
// Dieser Part starter nun den Server den wir eben etwas konfiguriert haben...
app.listen(666, function () {
    // Die Terminal Link funktion ist nur dafür da einen Link im Terminal Fenster bereit zu stellen, damit das alles etwas schöner wirkt.
    console.log('Die Webseite sollte sich nun automatisch auf machen \nFalls nicht, ' + terminalLink('klicken Sie hier...', 'https://localhost:666/'));
});
// Weil wir natürlich nicht in der Steinzeit leben, sollte dieser Befehl AUTOMATISCH ein Browserfenster öffnen.
open('http://localhost:666/');

// Den Part einfach ignorieren...
figlet('iParties', function (err, data) {
    if (err) {
        console.log('iParties, für den täglichen Kokain Genuss!');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log('\nUnsere Empfehlung, drücken Sie [STRG/CTRL] in kombination mit der Taste [C],\ndanach nur noch bestätigen und die Performance der Webseite wird erhöht.\n');
});