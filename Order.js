'use strict';

function Order(id) {           // Constructor
    this.__id = id;
    this.__time = Date.now();
    this.__products = [];
}

Order.prototype.getOrderId = function() {            
    return this.__id;
}

Order.prototype.getOrderTimeById = function() {            
    return this.__time;
}

Order.prototype.setOrderTime = function(id) {          
    //this._name = name;
}

Order.prototype.getTotalPrice = function() {            
    //return this.__id;
}

Order.prototype.addProcduct(prod) = function() {            
   //
}