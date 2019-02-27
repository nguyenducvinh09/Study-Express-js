const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users.route');

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

app.use('/users', userRoutes);
app.listen(port,() => console.log('Example app listening on port ${port}'));