const express = require('express');
const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req,res) => 
	res.render('index', {
		name: "with Coders.tokyo"
	})
);
app.get('/users', (req,res) => 
	res.render('./users/index', {
		users: [
			{id: 1, name: "Vinh"},
			{id: 2, name: 'Trang'}
		]
	})
);

app.get('/users', (req,res) => 
	res.send('User list :')
);
app.listen(port,() => console.log('Example app listening on port ${port}'));