require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const csurf = require('csurf')

const userRoutes = require('./routes/users.route');
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/products.route');
const dogRoutes = require('./routes/dog.route')
const transferRoutes = require('./routes/transfer.route')


const authMiddleware =require('./middlewares/auth.middleware');
const sessionIdMiddleware =require('./middlewares/session.middleware');
const csrfProtection = csurf({ cookie: true })


const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionIdMiddleware);
// app.use(csurf({ cookie: true }));

app.use(express.static('public'));

app.get('/', authMiddleware.requireAuth, (req,res) => {
	// console.log(res.locals)
	res.render('index', {
		names: "with Coders.tokyo",
	})
	}
);
app.get('/about', authMiddleware.requireAuth,  (req, res) => {
	// console.log(res.locals);
	res.render('about/about')
}
);

app.use('/users',authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/dog', dogRoutes);
app.use('/transfer',csrfProtection, authMiddleware.requireAuth, transferRoutes);
app.listen(port,() => console.log('Example app listening on port ${port}'));