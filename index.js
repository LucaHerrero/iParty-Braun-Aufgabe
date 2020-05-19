const express = require('express');
const app = express();
const fs = require('fs');
const opn = require('opn');
const terminalLink = require('terminal-link');

app.use('/', express.static(__dirname + '/src'));
app.use('/js', express.static(__dirname + '/node_modules/framework7/js'));
app.use('/css', express.static(__dirname + '/node_modules/framework7/css'));

app.get('/src', function (req, res) {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
});
const link = terminalLink('klicken Sie hier...', 'https://localhost:666/');
app.listen(666, function () {
    console.log('Die Webseite sollte sich nun automatisch auf machen \n Falls nicht, ' + link);
});
opn('http://localhost:666/');