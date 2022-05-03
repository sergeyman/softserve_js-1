'use strict';

function Product(id, name, price, categories) {           // Constructor
    this.__id = id;
    this.__name = name;
    this.__price = price;
    // this.__categories = [];
    this.__categories = categories;
    
    //if( !categories instanceof Array )  throw new Error('#Categories must be an array.');          //* check input parameter
    //if( !categories.isArray()) throw new Error('#Categories must be an array.');          //* check input parameter
}

Product.prototype.getId = function() {               
    return this.__id;
}

Product.prototype.getName = function() {               
    return this.__name;
}

Product.prototype.getPrice = function() {               
    return this.__price;
}

Product.prototype.setPrice = function(price) {               
    this.__price = price;
}

Product.prototype.getCategoryNames = function() {               
    //return this.__categories;                           //> (2) [Category, Category]
    
    // forEach (-)  ??? using console.log() only
    // this.__categories.forEach(function(category) {
    //     console.log(category.getName());                //undefined
    //     //return category.getName();                   // undefined
        
    // });

    // ES5 map (+++)          // return *2!!!
    return this.__categories.map(function(c) {
        return c.getName();
    });

    // ES6 '=>'  (+)         // return *2!!!
    // return this.__categories.map(c => {
    //     return c.getName();
    // });

    // ES6 forEach (-)     undefined          
    // this.__categories.forEach(c => {
    //     return c.getName();
    // }); 

    // ES6 forEach (-)     undefined          
    // this.__categories.forEach((category) => {
    //     console.log(category); 
    // }); 


}


/*
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/map

*/