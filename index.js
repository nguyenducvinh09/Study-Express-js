const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');


const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write()

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req,res) => 
	res.render('index', {
		name: "with Coders.tokyo"
	})
);
app.get('/users', (req,res) => 
	res.render('./users/index', {
		users: db.get('users').value()
	})
);

app.get('/users/search', (req,res) => {
	let q = req.query.q.toUpperCase();
	var matchedUser = db.get('users').value().filter(user =>
		user.name.toUpperCase().indexOf(q) !== -1
	);
	res.render('users/index', {
		users: matchedUser,
		paramValue: req.query.q
	})
}
);

app.get('/users/create', (req, res) => {
	res.render('users/create')
});
app.get('/users/:id', (req, res) => {
	let id = req.params.id;
	let user =db.get('users').find({id: id}).value();
	res.render('users/view', {
		user : user
	})
});
app.post('/users/create', (req, res) =>{
	req.body.id = shortid.generate(),
	db.get('users').push(req.body).write();
	res.redirect('/users')
});

app.listen(port,() => console.log('Example app listening on port ${port}'));