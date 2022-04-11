'use strict';

function Product(id, name, price, catgories) {           // Constructor
    this.__id = id;
    this.__name = name;
    this.__price = price;
    this.__categories = [];
}

Product.prototype.getName = function() {               
    return this.__name;
}

Product.prototype.getPrice = function() {               
    return this.__price;
}

Product.prototype.setPrice = function() {               
    this.__price = price;
}

Product.prototype.getCategoryNames = function() {               
    return this.__categories;
    //this._categories.forEach()

}