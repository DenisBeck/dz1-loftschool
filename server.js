var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/portfolio');

var app = express();


var Post = mongoose.model('Post', { 
	title: String ,
	date: String,
	note: String
});

app.use(express.static('./app'));
app.use(bodyParser.json({}));

app.get('/*', function(req, res) {
		
	if(req.url == '/') req.url = '/index.html'; 

	console.log('Получен запрос на страницу', req.url);
	var path = './app' + req.url;
	if(fs.existsSync(path)) {
		var content = fs.readFileSync(path, {encoding: 'utf8'});
		res.write(content);
	} else {
		var content = fs.readFileSync('./app/404.html', {encoding: 'utf8'});
		res.status(404)
		res.write(content);
	}
	res.end();
})

app.post('/save', function(req, res) {
	console.log('Запрос получен по адресу', req.body);
	var blogpost = new Post(req.body);

	blogpost.save(function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('запись добавлена в базу данных');
		}
	});

	res.end();
})

app.listen(9999);