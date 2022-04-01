//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular-app-heroku'));

app.get('/*', (req, res) =>
    // res.sendFile('index.html', {root: 'dist/angular-app-heroku/'}),
    // res.sendFile('index.html', {root: 'dist/'}),
    res.sendFile(path.join(__dirname + '/dist/<app-name>/index.html'))
);

// Start the app by listening on the default Heroku port
console.log("start app");
app.listen(process.env.PORT || 8080);