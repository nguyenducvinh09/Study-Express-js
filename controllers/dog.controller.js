const db = require('../db');


module.exports.addToDog = (req, res) => {
    let productId =  req.params.productId;
    let sessionId = req.signedCookies.sessionId;

    if(!sessionId) {
        res.redirect('/products/?page=1');
        return;
    }

    let count = db
      .get('sessions')
      .find({ id: sessionId})
      .get('dog.' + productId, 0)
      .value();

    db.get('sessions')
      .find({ id: sessionId})
      .set('dog.' +productId, count + 1)
      .write();

    let countDog = db
      .get('sessions')
      .find({ id: sessionId})
      .get('dog')
      .value();

    const a= Object.values(countDog).reduce((a,b) => a+b);
    // console.log('Total dogs added: ', a);
    res.redirect('/products/?page=1');
}