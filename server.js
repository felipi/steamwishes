/**
 * Module dependencies.
 */
var express = require('express');
var httpProxy = require('http-proxy');
//var bodyParser = require('body-parser');

var apiForwardingUrl = 'http://steamcommunity.com/id/';

// Solution for forwarding from http to https taken from:
// http://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing
var proxyOptions = {
    changeOrigin: true
};

httpProxy.prototype.onError = function (err) {
    console.log(err);
};

var apiProxy = httpProxy.createProxyServer(proxyOptions);

console.log('Forwarding API requests to ' + apiForwardingUrl);

// Node express server setup.
var server = express();
server.set('port', 3000);
server.use(express.static(__dirname));

server.get("/steam/:user", function(req, res) {
    console.log("Requesting api call");
    var url = apiForwardingUrl + req.params.user;
    apiProxy.web(req, res, {target: url});
});

server.get('/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
*/

// Start Server.
server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});
