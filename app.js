// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Database imports
const pgPool = require("./server/models/dbWrapper.js");
const tokenDB = require("./server/DataAccess/tokenDB")(pgPool);
const userDB = require("./server/DataAccess/EmployeeDB")(pgPool);

// OAuth imports
const oAuthService = require("./server/Services/tokenService")(userDB, tokenDB);
const oAuth2Server = require("node-oauth2-server");

const app = express();

app.oauth = oAuth2Server({
  model: oAuthService,
  grants: ["password"],
  debug: true,
});

// Auth and routes
const authenticator = require("./server/security/authenticator")(userDB);
const routes = require("./server/security/login")(express.Router(),app,authenticator);
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use("/auth", routes);

// Set our api routes
const api = require('./server/routes/api')(express.Router(),app);
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/views/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));