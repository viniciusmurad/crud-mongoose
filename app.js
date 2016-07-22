var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var livro = require('./livro-model');
var port = 8080;
var db = 'localhost/example';

mongoose.connect(db);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended:true
}))

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

app.get('/livros/:id', function(req,res) {
	console.log('buscando um livro');
	livro.findOne({
		_id: req.params.id
	})
	.exec(function(err,result) {
		if(err) {
			console.log(err);
		} else {
			console.log(result);
			res.json(result);
		}
	})
})

// app.post('/livros', function(req, res) {
// 	var novoLivro = new Livro();
// 	novoLivro.titulo = req.body.titulo;
// 	novoLivro.autor = req.body.autor;
// 	novoLivro.categoria = req.body.categoria;

// 	novoLivro.save(function(err, result) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log(result);
// 			res.send(result);
// 		}
// 	})
// })

app.post('/livros', function(req,res) {
	livro.create(req.body, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	})
})

app.put('/livros/:id', function(req,res) {
	livro.findOneAndUpdate({
		_id: req.params.id
	}, {$set:
		{titulo: req.body.titulo}},
		{upsert: true},
		function(err, result) {
			if(err) {
				console.log(err);
			} else {
				console.log(result);
				res.send(result);
			}
	})
})

app.delete('/livros/:id', function(req,res) {
	livro.findOneAndRemove({
		_id: req.params.id
	}, function(err, result) {
		if(err) {
			console.log(err);
		} else {
			console.log(result);
			res.status(204);
		}
	})
})

app.listen(port, function() {
	console.log('servidor rodando na porta ' + port);
})