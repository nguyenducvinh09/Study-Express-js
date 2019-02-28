const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req,res) => 
	res.render('./users/index', {
		users: db.get('users').value()
});

module.exports.search = (req,res) => {
	let q = req.query.q.toUpperCase();
	var matchedUser = db.get('users').value().filter(user =>
		user.name.toUpperCase().indexOf(q) !== -1
	);
	res.render('users/index', {
		users: matchedUser,
		paramValue: req.query.q
	})
};

module.exports.create = (req, res) => {
	res.render('users/create')
};

module.exports.getId = (req, res) => {
	let id = req.params.id;
	let user =db.get('users').find({id: id}).value();
	res.render('users/view', {
		user : user
	})
};

module.exports.createPost =  (req, res) =>{
	req.body.id = shortid.generate();
	let errors = [];
	if(!req.body.name) {
		errors.push('Name is required !');
	}
	if(!req.body.phone) {
		errors.push('Phone is required');
	}
	if(errors.length) {
		res.render('users/create', {
			errors: errors,
			values : req.body
		});
		return;
	}
	db.get('users').push(req.body).write();
	res.redirect('/users')
};

