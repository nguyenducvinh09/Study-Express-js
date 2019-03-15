const md5 = require('md5');

const db = require('../db');

module.exports.login = (req,res) => {
	res.render('./auth/login');
};

module.exports.postLogin = (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	let hashesPassword = md5(password);
	let user = db.get('users').find({ email : email}).value();
	if(!user) {
		res.render('auth/login', {
			errors: [
				'User does not exist'
			],
			values: req.body
		});
		return;
	}
	if(user.password !== hashesPassword) {
		res.render('auth/login', {
			errors: [
				'Wrong password'
			],
			values: req.body
		});
		return;
	}
	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/');
};