const express = require('express');
const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

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

app.listen(port,() => console.log('Example app listening on port ${port}'));