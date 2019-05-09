const db = require('../db');

module.exports.index = (req, res) => {
   res.render('./transfer/index', { csrfToken: req.csrfToken() })
};

module.exports.postTransfer = (req, res) => {
    let data = {
        account: req.body.account,
        amount: parseInt(req.body.amount),
        userId: req.signedCookies.userId
    }
    db.get('transfer').push(data).write();
    res.redirect('/transfer')
 };