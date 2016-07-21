var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var livro = require('./livro-model');
var port = 8080;
var db = 'localhost/example';

mongoose.connect(db);

app.get('/', function(req, res) {
	res.send('done');
})

app.get('/livros', function(req, res) {
	console.log('buscando todos livros');
	livro.find({})
		.exec(function (err, result) {
			if(err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		})
})


app.listen(port, function() {
	console.log('servidor rodando na porta ' + port);
})