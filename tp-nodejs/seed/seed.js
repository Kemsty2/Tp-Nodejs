var Produit = require('../models/produit');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopping',{useMongoClient: true});
mongoose.Promise = global.Promise;

var produit1 = new Produit({
    nom: 'Thermomètre',
    description: 'Le but de ce projet est de construire un Thermomètre avec le Kit Arduino et un capteur de Temperature',
    imagePath: '/images/Temperature.jpeg',
    typeProduit: 'Projet Arduino',
    prix: 5000
});

var produit2 = new Produit({
    nom: 'Aquarium',
    description: "Le but de ce projet est de construire un appareil qui vous permettra de verifier l'etat de votre aquarium avec le Kit Arduino",
    imagePath: '/images/aquarium.png',
    typeProduit: 'Projet Arduino',
    prix: 25000
});

var produit3 = new Produit({
    nom: 'MicroRobot',
    description: "Ce projet a pour but de construire un microRobot, qui vous sera utile dans la conception de vos algorithmes de recherche",
    imagePath: '/images/microRobot.jpg',
    typeProduit: 'Projet Arduino',
    prix: 20000
});

var produit4 = new Produit({
    nom: 'Mini Pc',
    description: "Mini Pc construit a l'aide de Rasberry Py et de Arduino",
    imagePath: '/images/miniPc.jpg',
    typeProduit: 'Projet Arduino',
    prix: 35000
});

var produit5 = new Produit({
    nom: 'Ps2 Controller',
    description: "Alors les Gamers, voila votre propre Manette de jeu",
    imagePath: '/images/ps2Controller.jpg',
    typeProduit: 'Projet Arduino',
    prix: 5000
});

var produit6 = new Produit({
    nom: 'Gps',
    description: "Ce projet a pour but de construire un Gps",
    imagePath: '/images/Gps.jpg',
    typeProduit: 'Projet Arduino',
    prix: 24000
});
console.log(typeof(test));

var produits = new Array();

produits[0] = produit1;
produits[1] = produit2;
produits[2] = produit3;
produits[3] = produit4;
produits[4] = produit5;
produits[5] = produit6;

var done = 0;
for(var j = 0; j<5;j++){
    produits[j].save(function(err){
        done++;
        if(done === 5){
            exit(); 
        }
    });    
}

/*test.save(function(err){
    if(err){
        console.log("err: "+ err);
    }else{
        console.log("Youpi!!!");
        exit();
    }
});*/

function exit(){
    mongoose.disconnect();
}