'use strict'

const user = require('./models/user');
const recipes = require('./models/recipes');

//this package we need it to generate some random strings 
const randomstring = require('randomstring');

//create some users data
let usersData = [
        {
            username: 'mahmoud@yahoo.com',
            password: '123456',
            firstName: 'Mahmoud',
            lastName: 'Awad',
            registrationDate: new Date()
        },
        {
            username: 'David@yahoo.com',
            password: '123456',
            firstName: 'David',
            lastName: 'Beckham',
            registrationDate: new Date()
        },
        {
            username: 'Messi@yahoo.com',
            password: '123456',
            firstName: 'Leonil',
            lastName: 'Messi',
            registrationDate: new Date()
        },
        {
            username: 'richard@yahoo.com',
            password: '123456',
            firstName: 'Richard',
            lastName: 'Lane',
            registrationDate: new Date()
        },
        {
            username: 'something@yahoo.com',
            password: '123456',
            firstName: 'something',
            lastName: 'test',
            registrationDate: new Date()
        },
        {
            username: 'test@yahoo.com',
            password: '123456',
            firstName: 'test',
            lastName: 'Awad',
            registrationDate: new Date()
        },
        {
            username: 'mike@yahoo.com',
            password: '123456',
            firstName: 'Mike',
            lastName: 'Richard',
            registrationDate: new Date()
        }
    ];
let addUser = function(conData, userData){
    
    user.add(conData, userData, function (err, data){
    
        if(err){
            console.log("the following error occured:" + err);
            return;
        }
    });
}

//note the use of the keyword async which means this function will be an asynchronous
//we need this because we are running a for loop of aschyronous operation
exports.addUsers = function(conData){

    usersData.forEach(async element => {

        addUser(conData, element);
    });
}

//----------------Add Random Blogs ----------------

let recipeData = [];

let addRecipes = function(conData, recipeData){
    
    recipes.add(conData, recipeData, function (err, data){
    
        if(err){
            console.log("the following error occured:" + err);
            return;
        }
    });
};

exports.addRecipes = function(conData){

    for( let i = 0; i < 24; i++){

        let imgNum = (i % 8) + 1;
        let tempRecipe = {
            title: randomParagraph(4, 8),
            authorId: Math.random() * (8 - 1) + 1,
            description: randomParagraph(100, 300),
            ingredients: randomParagraph(100, 300),
            createdDate: new Date(),
            photo: 'http://localhost:8080/img/img' + imgNum + '.jpeg',
            keywords: randomWord(1, 5),
            category: randomWord(1, 1),
            rating: Math.random() * (8 - 1) + 1,
            views: Math.random() * (8 - 1) + 1,
            status: randomWord(1, 1)
        };

        recipeData.push(tempRecipe);
    }
    
    recipeData.forEach(async element => {

        addRecipes(conData, element);
    });
};

//generate a random pagraph length between min and max words
var randomParagraph = function (min, max){

    let paragraph = "";
    
    let paragraphLength =  Math.random() * (max - min) + min
    for(let i = 0; i < paragraphLength; i++){

        paragraph += randomWord(3, 7) + " ";

    }

    return paragraph;
};

//generate random word of length berween min and max
var randomWord = function(min, max){

    let wordLength = Math.random() * (max - min) + min;

    return randomstring.generate(wordLength);
};