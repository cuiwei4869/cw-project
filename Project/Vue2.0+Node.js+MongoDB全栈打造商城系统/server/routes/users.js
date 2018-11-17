var express = require('express');
var router = express.Router();
var User = require('./../models/user')
var mongoose = require('mongoose');
require('./../util/util')

mongoose.connect('mongodb://127.0.0.1:27017/cMall', { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log(`err:${err}`)
  } else {
    console.log(`Connection successful`)
  }
});

mongoose.connection.on('connected', function () {
  console.log('MongoDB connected successed');
});

mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected');
});

// 登录接口
router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
  }

  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        // req.session.uer = doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName,
            cartList: doc.cartList,
            addressList: doc.addressList
          }
        })
      } else {
        res.json({
          status: '1'
        })
      }
    }
  })
})

// 登出接口
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    });
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})
// 查询当前用户的购物车数据
router.get('/cartList', function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({ userId: userId }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})

// 删除购物车商品
// router.get('/delGoods', function (req, res, next) {
//   var productId = req.param('productId');
//   var userId = req.cookies.userId;
//   User.update({ userId: userId }, {
//     $pull: {
//       'cartList': {
//         'porductId': productId
//       }
//     }
//   }, function (err, doc) {
//     if (err) {
//       res.json({
//         status: '1',
//         msg: err.message,
//         result: ''
//       })
//     } else {
//       if (doc) {
//         res.json({
//           status: '0',
//           msg: '',
//           result: '删除成功'
//         })
//       } else {
//         res.json({
//           status: '1',
//           msg: '',
//           result: '未查询到数据'
//         })
//       }

//     }
//   });
// })

router.get('/delGoods', function (req, res, next) {
  var productId = req.param('productId');
  var userId = req.cookies.userId;
  User.findOne({ userId: userId }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        doc.cartList.forEach(function (val, index, arr) {
          if (val.productId == productId) {
            arr.splice(index, 1);
            doc.save(function (err) {
              if (err) {
                res.json({
                  status: '1',
                  msg: err.message
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
        });
      } else {
        res.json({
          status: '1',
          msg: '没查询到数据',
          result: ''
        })
      }
    }
  })
})

// // 增加购物车中的数量
// router.post('/addNum', (req, res, next) => {
//   let productId = req.body.productId,
//     userId = req.cookies.userId;
//   User.findOne({ userId: userId }, (err, doc) => {
//     if (err) {
//       res.json({
//         status: '1',
//         msg: err.message,
//         result: ''
//       })
//     } else {
//       if (doc) {
//         doc.cartList.forEach((val, index, arr) => {
//           if (val.productId == productId) {
//             val.productNum++;
//             doc.save(err => {
//               if (err) {
//                 res.json({
//                   status: '1',
//                   msg: err.message,
//                   result: ''
//                 })
//               } else {
//                 res.json({
//                   status: '0',
//                   msg: '',
//                   result: ''
//                 })
//               }
//             })
//           }
//         });
//       } else {
//         res.json({
//           status: '1',
//           msg: '',
//           result: '未查询到数据'
//         })
//       }
//     }
//   })
// })


// // 减少购物车中的数量
// router.post('/reduceNum', (req, res, next) => {
//   let productId = req.body.productId,
//     userId = req.cookies.userId;
//   User.findOne({ userId: userId }, (err, doc) => {
//     if (err) {
//       res.json({
//         status: '1',
//         msg: err.message,
//         result: ''
//       })
//     } else {
//       if (doc) {
//         doc.cartList.forEach((val, index, arr) => {
//           if (val.productId == productId) {
//             val.productNum--;
//             doc.save(err => {
//               if (err) {
//                 res.json({
//                   status: '1',
//                   msg: err.message,
//                   result: ''
//                 })
//               } else {
//                 res.json({
//                   status: '0',
//                   msg: '',
//                   result: ''
//                 })
//               }
//             })
//           }
//         });
//       } else {
//         res.json({
//           status: '1',
//           msg: '',
//           result: '未查询到数据'
//         })
//       }
//     }
//   })
// })

// 修改购物车中商品数量
router.post('/cartEdit', (req, res, next) => {
  var userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked;
  User.update({ 'userId': userId, 'cartList.productId': productId }, { 'cartList.$.productNum': productNum, 'cartList.$.checked': checked }, (err, doc) => {
    if (err) {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: 'suc'
        });
      } else {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})


router.post('/editCheckAll', function (req, res, next) {
  var userId = req.cookies.userId,
    checkAll = req.body.checkAll ? '1' : '0';
  User.findOne({ userId: userId }, (err, user) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (user) {
        user.cartList.forEach((item) => {
          item.checked = checkAll;
        })
        user.save((err1, doc) => {
          if (err1) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            });
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            });
          }
        })
      }
    }
  })
})

// 查询用户地址接口
router.get('/addressList', (req, res, next) => {
  var userId = req.cookies.userId;
  User.findOne({ userId: userId }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.addressList
        })
      } else {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }
    }
  })
})

// 设置默认地址接口
router.post('/setDefault', (req, res, next) => {
  var userId = req.cookies.userId,
    addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: '1003',
      msg: 'addressId is null',
      result: ''
    })
  } else {
    User.findOne({ userId: userId }, (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        var addressList = doc.addressList;
        addressList.forEach(item => {
          if (item.addressId == addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        })
        doc.save((err1, doc1) => {
          if (err1) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: ''
            })
          }
        })
      }
    })
  }
})

// 删除地址接口
router.post('/delAddress', (req, res, next) => {
  var userId = req.cookies.userId,
    addressId = req.body.addressId;
  User.update({ userId: userId }, { $pull: { 'addressList': { 'addressId': addressId } } }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: ''
        })
      } else {
        res.json({
          status: '1',
          msg: '未查询到数据',
          result: ''
        })
      }
    }
  })
})

// 确认订单接口
router.post('/payMent', (req, res, next) => {
  var userId = req.cookies.userId,
    orderTotal = req.body.orderTotal,
    addressId = req.body.addressId,
    address = '',
    goodsList = [];
  User.findOne({ userId: userId }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        // 获取当前用户的地址信息
        doc.addressList.forEach(item => {
          if (addressId == item.addressId) {
            // console.log(`item:${item}`)
            address = item;
            // console.log(`address:${address}`)
          }
        })
        // 获取用户购物车的商品
        doc.cartList.filter(item => {
          if (item.checked == '1') {
            goodsList.push(item);
          }
        })
        let r1 = Math.floor(Math.random() * 10);
        let r2 = Math.floor(Math.random() * 10);
        let playform = '622';
        let sysDate = (new Date()).Format('yyyyMMddhhmmss');
        let createDate = (new Date).Format('yyyy-MM-dd hh:mm:ss')
        let orderId = playform + r1 + sysDate + r2;

        let order = {
          orderId: orderId,
          orderTotal: orderTotal,
          addressInfo: address,
          goodsList: goodsList,
          orderStatus: '1',
          createDate: createDate
        }
        doc.orderList.push(order);
        doc.save((err1, doc1) => {
          if (err1) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: {
                orderId: order.orderId,
                orderTotal: order.orderTotal
              }
            })
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '未查询到数据',
          result: ''
        })
      }
    }
  })

})

// 根据订单id查询订单信息
router.get('/orderDetail', (req, res, next) => {
  let userId = req.cookies.userId,
    orderId = req.param('orderId');
  User.findOne({ userId: userId }, (err, userInfo) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userInfo) {
        let orderList = userInfo.orderList;
        if (orderList.length > 0) {
          let orderTotal = 0;
          orderList.forEach(item => {
            if (item.orderId == orderId) {
              orderTotal = item.orderTotal;
            }
          })
          if (orderTotal > 0) {
            res.json({
              status: '0',
              msg: '',
              result: {
                orderId: orderId,
                orderTotal: orderTotal
              }
            })
          } else {
            res.json({
              status: '12002',
              msg: '无此订单',
              result: ''
            })
          }
        } else {
          res.json({
            status: '12001',
            msg: '用户无订单订单',
            result: ''
          })
        }
      } else {
        res.json({
          status: '1',
          msg: '未查询到用户',
          result: ''
        })
      }
    }
  })
})

// 
router.get('/getCartCount', (req, res, next) => {
  if (req.cookies && req.cookies.userId) {
    let userId = req.cookies.userId;
    User.findOne({ userId: userId }, (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        if (!doc) {
          res.json({
            status: '1',
            msg: '未查询到用户数据',
            result: ''
          })
        }
        let cartList = doc.cartList;
        let cartCount = 0;
        cartList.map(item => {
          cartCount += parseInt(item.productNum);
        });
        res.json({
          status: '0',
          msg: '',
          result: cartCount
        })
      }
    })
  }
})
module.exports = router;
