const shortid = require('shortid');

const db = require('../db');

module.exports = (req, res, next) => {
    let countDog ;
    let sessionId = shortid.generate();
    if (!req.signedCookies.sessionId) {
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        db.get('sessions').push({ id: sessionId }).write();
    }

    if (req.signedCookies.sessionId) {
        countDog = db
        .get('sessions')
        .find({ id: req.signedCookies.sessionId })
        .get('dog')
        .value();
        console.log('countDog', countDog);
        if(countDog) {
            a = Object.values(countDog).reduce((a, b) => a + b);
            res.locals.a = a;
        }
        if(countDog === undefined) {
            res.locals.a = undefined;
        }
    }
    
    next();
};