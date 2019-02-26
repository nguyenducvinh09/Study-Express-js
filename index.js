const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

 users =[
			{id: 1, name: "Vinh"},
			{id: 2, name: 'Trang'}
		];

app.get('/', (req,res) => 
	res.render('index', {
		name: "with Coders.tokyo"
	})
);
app.get('/users', (req,res) => 
	res.render('./users/index', {
		users: users
	})
);

app.get('/users/search', (req,res) => {
	let q = req.query.q.toUpperCase();
	var matchedUser = users.filter(user =>
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
app.post('/users/create', (req, res) =>{
	users.push(req.body);
	res.redirect('/users')
});

app.listen(port,() => console.log('Example app listening on port ${port}'));