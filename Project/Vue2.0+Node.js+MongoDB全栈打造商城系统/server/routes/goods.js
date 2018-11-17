var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')


mongoose.connect('mongodb://127.0.0.1:27017/cMall', { useNewUrlParser: true },function(err){
    if(err){
        console.log(`err:${err}`)
    }else{
        console.log(`Connection successful`)
    }
});

mongoose.connection.on('connected', function () {
    console.log('MongoDB connected successed');
});

mongoose.connection.on('disconnected', function () {
    console.log('MongoDB connected disconnected');
});

router.get('/list', function (req, res, next) {
    // res.send('hello,goods list,'); 
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let sort = parseInt(req.param('sort'));
    let skip = (page - 1) * pageSize;
    let priceLevel = req.param('priceLevel');
    let priceGt = '', priceLte = '';
    let params = {};

    if (priceLevel != 'all') {
        switch (priceLevel) {
            case '0': priceGt = 0; priceLte = 100; break;
            case '1': priceGt = 100; priceLte = 500; break;
            case '2': priceGt = 500; priceLte = 1000; break;
            case '3': priceGt = 1000; priceLte = 5000; break;
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({ 'salePrice': sort });

    goodsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});

router.post('/addCart', function (req, res, next) {
    let userId = '100000077';
    let productId = req.body.productId;
    let User = require('../models/user');
    User.findOne(
        { userId: userId }, function (err, userDoc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message
                })
            } else {
                if (userDoc) {
                    let goodsItem = '';
                    userDoc.cartList.forEach(function (item) {
                        if (item.productId == productId) {
                            goodsItem = item;
                            item.productNum++;
                        }
                    });
                    if (goodsItem) {
                        userDoc.save(function (err2) {
                            if (err2) {
                                res.json({
                                    status: '1',
                                    msg: err2.message
                                })
                            } else {
                                res.json({
                                    status: '0',
                                    msg: '',
                                    result: 'success'
                                })
                            }
                        })
                    } else {
                        Goods.findOne(
                            { productId: productId }, function (err1, doc) {
                                if (err1) {
                                    res.json({
                                        status: '1',
                                        msg: err1.message
                                    })
                                } else {
                                    if (doc) {
                                        // console.log(Object.toString.call(doc))
                                        let docNew = JSON.parse(JSON.stringify(doc));
                                        docNew.productNum = 1;
                                        docNew.checked = 1;
                                        userDoc.cartList.push(docNew);
                                        userDoc.save(function (err2) {
                                            if (err2) {
                                                res.json({
                                                    status: '1',
                                                    msg: err2.message
                                                })
                                            } else {
                                                res.json({
                                                    status: '0',
                                                    msg: '',
                                                    result: 'success'
                                                })
                                            }
                                        })
                                    }
                                }
                            }
                        )
                    }
                }
            }
        }
    )
})

module.exports = router;