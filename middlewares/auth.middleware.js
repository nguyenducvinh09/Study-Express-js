const db = require('../db');

module.exports.requireAuth = (req, res , next) => {
	console.log(req.cookies, req.signedCookies)
	let user = db.get('users').find({id : req.signedCookies.userId}).value();
	if(!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}
	if(!user) {
		res.redirect('/auth/login');
		return;
	}
	res.locals.user = user;
	next();
};