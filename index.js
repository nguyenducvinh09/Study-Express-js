const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res) => 
	res.send('<h1> Hello Express js </h1>')
);

app.get('/users', (req,res) => 
	res.send('User list :')
);
app.listen(port,() => console.log('Example app listening on port ${port}'));