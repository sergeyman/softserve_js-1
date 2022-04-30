'use strict';

function Order(id) {           // Constructor
    this.__id = id;
    this.__time = Date.now();
    this.__products = [];
    //this.__products = products;
}

Order.prototype.getId = function() {            
    return this.__id;
};

Order.prototype.getTime = function() {            
    return this.__time;
};

Order.prototype.updateTime = function() {
    this.__time = Date.now();          
};

Order.prototype.getTotalPrice = function() {      
    var total = 0;
    // reduce()
    this.__products.forEach(function (p, ind) {
        total += p.getPrice();
    })
    return total;

    // var 2 (ES6)
    //return total = this.__products.reduce( (acc, val) => acc + val )
};

Order.prototype.addProduct = function(prod) {            
   this.__products.push(prod) 
};


// amount (not in UML)
Order.prototype.getProductsAmount = function() {
    return this.__products.length;
}

// delete (not in UML)
Order.prototype.deleteProductById = function(idProduct) {
    // this.__products.forEach(function(pid, index) {
        // условие (index получить!, только найти, удалять на віходе цикла)
    //     pid.splice(this.__products.indexOf(idProduct))      //# undefined ? (bind)
    // })

    for(var i=0; i< this.__products.length; i++) {
        var p = this.__products[i];
        if(idProduct === p.getId()) {
            this.__products.splice(this.__products.indexOf(i));
        }
    }
};

