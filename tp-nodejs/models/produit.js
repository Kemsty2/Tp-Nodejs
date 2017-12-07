var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var schema = new Schema({
    nom: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
    typeProduit: {type: String, required: true},
    prix: Number
});

module.exports = mongoose.model('Produit', schema);


/*var test = new Produit({
    nom: 'Gucci',
    description: 'Juste un test',
    imagePath: 'Inconnu',
    typeProduit: 'test',
    prix: 1000
});

test.save(function(err){
    if(err){
        console.log("err: "+ err);
    }else{
        console.log("Youpi!!!");
        exit();
    }
});

function exit(){
    mongoose.disconnect();
}*/