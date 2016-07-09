var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Skill = new Schema({
	section: {
		type: String
	},
	items: {
		type: {
			id: {
				type: String
			},
			tech: {
				type: String
			},
			sector: {
				type: Number
			},
			value: {
				type: Number,
				default: 0
			}
		}
	}
})

mongoose.model('skill', Skill)
mongoose.connect('mongodb://localhost/portfolio');

var app = express();

var Post = mongoose.model('Post', { 
	title: String ,
	date: String,
	note: String
});

var Work = mongoose.model('Work', { 
	project: String ,
	tech: Array,
	url: String,
	file: String

});





app.set('views', './app/views')
app.set('view engine', 'jade');
app.use(express.static('./app'));
app.use(bodyParser.json());

app.get('/blog.html', function(req, res) {
	Post.find({}).then(function(posts) {
		res.render('blog', {item: posts});
	})
	
})
app.get('/works.html', function(req, res) {
	Work.find({}).then(function (works) {
		res.render('works', {item: works});
	})
	
	
})

app.get('/about.html', function(req, res) {
	var Skill = mongoose.model('skill');
	Skill.find({}).then(function (skills) {
		res.render('about', {skills: skills});
	})
})


app.get('/admin.html', function(req, res) {
	var Skill = mongoose.model('skill');
	Skill.find({}).then(function(skills) {
		res.render('admin', {skills: skills});
	})
})

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
		console.log(Skill.find({}))
	}
	res.end();
})

app.post('/savePost', function(req, res) {
	console.log('Запрос получен по адресу', req.url);
	var addPost = new Post(req.body);

	addPost.save(function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('запись добавлена в базу данных');
		}
	});

	res.write('Запись добавлена')
	res.end();
})

app.post('/saveWork', function(req, res) {
	console.log('Запрос получен по адресу', req.url);
	console.log(req.body);
	var addWork = new Work(req.body);

	addWork.save(function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('запись добавлена в базу данных');
		}
	});

	res.status(200);
	res.write('Работа добавлена')
	res.end();
})





app.post('/saveSkill', function(req, res) {
	console.log('Запрос получен по адресу', req.url);
	console.log('Запись в бд', req.body);

	var Skill = mongoose.model('skill');
	var models = [];

	Object.keys(req.body).map(section => ({
		section: section,
		items: req.body[section]
	})).forEach(function(toSave) {
		models.push(new Skill(toSave))
	});

	if (models.filter(function(m) { m.validateSync() }).length) {
		return res.json({ error: 'Не удалось сохранить данные' });
	}

	Skill.remove({}).then(function() {
		Skill.insertMany(models).then(function() {
			res.write('Сохранено');
			res.status(200);
			res.end();
		})
	})
})

app.listen(9999);