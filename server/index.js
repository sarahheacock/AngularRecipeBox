// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/api');

const app = express();
const refreshRoutes = express.Router();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add headers
app.use((req, res, next) => { 
    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  next();
});


// ==================STATIC REQUESTS====================
refreshRoutes.use(express.static(path.resolve(__dirname, '../dist')));

refreshRoutes.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});
// refreshRoutes.use(express.static(path.resolve(__dirname, '../src')));

// refreshRoutes.get('*', function(request, response) {
//   response.sendFile(path.resolve(__dirname, '../src/index.html'));
// });


// ===================API REQUESTS==========================
app.use('/api', api);
app.use(refreshRoutes);

//====================START SERVER============================
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
