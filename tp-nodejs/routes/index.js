var express = require('express');
var router = express.Router();
var Produit = require('../models/produit');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
    var successMsg = req.flash('success')[0]; 
    Produit.find(function(err, docs){
        res.render('index', { title: 'Express', nom: 'Kemsty', produits: docs, successMsg: successMsg, noMessages: !successMsg });
    });  
});

router.get('/add-to-cart/:id', function(req, res, next){
    var produitId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    
    Produit.findById(produitId, function(err, produit){
        if(err){
            return res.redirect('/');
        }
        cart.add(produit, produit.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/')
    });
});

router.get('/shopping-cart', function(req, res, next){
    if(!req.session.cart){
        return res.render('shopping-cart', {produits:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shopping-cart', {produits: cart.generateArray(), totalPrice: cart.totalPrice})
});

router.get('/checkout', function(req, res, next){
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('checkout', {layout: false, total: cart.totalPrice})
});

router.post('/checkout', function(req, res, next){
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var stripe = require('stripe')('sk_test_VRf2eyfYIK1bSPR6BkHSzW78');
    
    stripe.charges.create({
        amout: cart.totalPrice,
        currency: "usd",
        source: req.body.StripeToken,
        description: "Test Paiment"
    }, function(err, charge){
        if(err){
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        req.flash('success', 'Paiment Effectué');
        req.cart = null;
        res.redirect('/');
    });
});

router.get('/buy', function(req, res, next){
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('check', {layout: false, total: cart.totalPrice})
});

router.post('/check', function(req, res, next){
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    req.flash('success', 'Paiment Effectué');
    req.session.cart = null;
    res.redirect('/');
})

/*router.get('/buy', function(req, res, next){
    var cart = new Cart(req.session.cart);
    var payment = {
        "intent": "authorize",
        "payer":{
            "payment_method": "paypal"
        },
        "redirect_urls":{
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/error"
        },
        "transactions": [{
            "amout": {
              "total": cart.totalPrice,
              "currency": "USD"
            },
            "description": "Test Paypal"
        }]
    };
    createPay(payment)
        .then((transaction) =>{
            var id = transaction.id; 
            var links = transaction.links;
            var counter = links.length; 
            while( counter -- ) {
                if ( links[counter].method == 'REDIRECT') {
                    // redirect to paypal where user approves the transaction 
                    return res.redirect( links[counter].href )
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/err');
        });    

});

router.get('/success', function(req, res, next){
    console.log(req.query);
    res.render('sucess', {layout: false});
});

router.get('/err', function(req, res, next){
    console.log(req.query);
    res.render('err', {layout: false});
})

var createPay = (payment) => {
    return new Promise((resole, reject) =>{
        paypal.payment.create(payment, function(err, payment){
            if(err){
                reject(err);
            }
            else{
                resole(payment);
            }
        });
    });
}*/

module.exports = router;
