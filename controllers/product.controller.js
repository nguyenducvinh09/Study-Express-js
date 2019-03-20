const db = require('../db');

module.exports.index = (req, res) => {
    let page = parseInt(req.query.page) || 0;
    let perPage=8;
    let pageNumber = Math.ceil(db.get('products').value().length/perPage) +1 ;
    let start = (page -1)*perPage;
    let end = page*perPage;
    // let drop = (page -1)*perPage;
    res.render('./products/index', {
        products: db.get('products').value().slice(start,end),
        page: page,
        pageNumber: pageNumber,
        n: 1,
        previous : page -1,
        next: page +1
        // products: db.get('products').drop(drop).take(perPage).value()
    })
};