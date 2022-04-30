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
    //return this.__categories;
    
    // forEach (-)
    // this.__categories.forEach(function(category, index, array) {
    //     //console.log(category.getName());
    //     return category.getName();
        
    // });

    // map (+)          // return array (map)
    // '=>' ES6
    return this.__categories.map(c => c.getName());
    //this.__categories.map(c => {return c.getName(); });

}