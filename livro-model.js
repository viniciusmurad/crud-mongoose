var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var livroSchema = new Schema({
	titulo: String,
	autor: String,
	categoria: String
});

module.exports = mongoose.model('Livro', livroSchema);