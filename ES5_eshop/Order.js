'use strict';

function Order(id) {          
    this.__id = id;
    this.__time = new Date();        // 22:43:11 GMT+0300 (Восточная Европа, летнее время)
    this.__products = [];
}

Order.prototype.getId = function() {            
    return this.__id;
};

Order.prototype.getTime = function() {          
    return this.__time.toTimeString();        
};

Order.prototype.updateTime = function() {
    this.__time = new Date(); 
};

Order.prototype.getTotalPrice = function() {      
    var total = 0;
    var initValue = 0;
    
    total = this.__products.reduce( function(total, p) {
        return total + p.getPrice();        
    }, initValue); 

    return total;    
};

Order.prototype.addProduct = function(prod) {            
   this.__products.push(prod) 
};

Order.prototype.getProductsAmount = function() {
    return this.__products.length;
};

Order.prototype.deleteProductById = function(id) {
    this.__products.forEach(function(product, ind) {
        if (product.getId() === id) {
            this.__products.splice(ind, 1);
        }
    }.bind(this));
};

Order.prototype.getProductNames = function() {
    return this.__products.map(function(product) {
        return product.getName();
    });
};