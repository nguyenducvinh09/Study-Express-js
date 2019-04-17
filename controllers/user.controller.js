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

module.exports.editId = (req, res) => {
	let id = req.params.id;
	let user =db.get('users').find({id: id}).value();
	res.render('users/create', {
		user : user
	})
};

module.exports.getId = (req, res) => {
	let id = req.params.id;
	let user =db.get('users').find({id: id}).value();
	res.render('users/view', {
		user : user
	})
};

module.exports.removeId = (req, res) => {
	let id = req.params.id;
	db.get('users').remove({ id: id }).write();
	//error image  false request url
	// res.render('users/index', {
	// 	users : db.get('users').value()
	// })
	res.redirect('/users')
};

module.exports.createPost =  (req, res) =>{
	req.body.id = shortid.generate();
	if(req.body.avatar) {
		req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	}
	db.get('users').push(req.body).write();
	res.redirect('/users')
};

