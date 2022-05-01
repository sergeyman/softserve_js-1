'use strict';

function Product(id, name, price, categories) { 
    this.__id = id;
    this.__name = name;
    this.__price = price;
    this.__categories = categories;         // array
}

Product.prototype.getId = function() {               
    return this.__id;
};

Product.prototype.getName = function() {               
    return this.__name;
};

Product.prototype.getPrice = function() {               
    return this.__price;
};

Product.prototype.setPrice = function(price) {  
    if(typeof price !== 'number') throw new Error('#Price must have number type.');             
    this.__price = price;
};

Product.prototype.getCategoryNames = function() {       
    return this.__categories.map(function(c) {
        return c.getName();
    });
};