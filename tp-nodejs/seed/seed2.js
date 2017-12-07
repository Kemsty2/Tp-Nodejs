var User = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopping',{useMongoClient: true});
mongoose.Promise = global.Promise;


var newUser = new User({
    email: 'kemsty2@yahoo.fr',
    password: '1997'
});
newUser.password = newUser.encryptPassword(newUser.password);

newUser.save(function(err){
    if(err){
        console.log("error:" + err);
    }else{
        console.log('youpi');
        exit();
    }
});

function exit(){
    mongoose.disconnect();
}