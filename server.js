var express = require('express');
var fs = require('fs');
var session = require('express-session');
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
var User = new Schema ({
	login: String,
	password: String
})

mongoose.model('skill', Skill);
mongoose.model('user', User);
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

var User = mongoose.model('user');

var user = new User({
	login: 'Denis',
	password: '1234'
});
user.save();

app.set('views', './app/views')
app.set('view engine', 'jade');
app.use(express.static('./app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var MongoStore = require('connect-mongo')(session);
app.use(session({
	key: 'sid',
	secret: 'fvfdg',
	cookie: {  httpOnly: true, maxAge:  null },
	store: new MongoStore({mongooseConnection: mongoose.connection})
}));

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
		res.render('admin', {skills: skills})
		
	})
	
})

app.get('/logout', function(req, res) {
	
	res.write('Пока, ' + req.session.name);
	req.session.destroy();
	res.end();
})

app.get(['/', '/index.html'], function(req, res) {
	if(req.session.name === 'Denis') {
		res.render('index', {
			authText: 'Редактировать',
			authLog: 'Выйти',
			include: 'admin-part',
			log: 'out'
		})
	} else {
		res.render('index', {
			authText: 'Авторизоваться',
			authLog: 'Войти',
			include: 'form-part',
			log: 'in'
		})
	}
	res.end()
})

app.get('/*', function(req, res) {
		
	if(req.url == '/') req.url = '/index.html'; 

	console.log('Получен запрос на страницу', req.url);
	sess = req.session;
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



app.post('/auth', function(req, res) {

	User.findOne({login: 'Denis'}, function(err, user) {
		if(req.body.login === user.login && req.body.password === user.password) {
			req.session.name = req.body.login;
			res.write('Привет, ' + req.body.login);
			res.end();
		} else {
			res.write('Не получилось войти');
			res.end();
		}
	})

	
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