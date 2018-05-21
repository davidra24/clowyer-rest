const express = require('express');
const routes = require('./routes/api');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const saltRounds = 10;
const fs = require('fs');


mongoose.connect(process.env.MONGODB_URI||'mongodb://localHost/clowyer');
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(function(err, req, res, next){
	console.log({error: err.message});
	res.send({
		error: err.message
	});
});
//app.set('view engine', 'ejs');
app.use(routes);
var server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	var rS = fs.createReadStream(__dirname + '/views/index.html', 'utf8');
	rS.pipe(res);
});
server.listen(process.env.PORT || 4000, function(){
	console.log('Esperando por request puerto 4000');
});