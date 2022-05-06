'use strict';

var Customer = function(id, name, phone, address, orders) {
    User.call(this, id, name, phone, address); 
    this.__orders = orders;
};

Customer.prototype = Object.create(User.prototype);             
Customer.prototype.constructor = User;                          

Customer.prototype.addOrder = function(order) {               
    this.__orders.push(order);
};

Customer.prototype.getOrderById = function(id) {    
    for(var i=0; i<this.__orders.length; i++) {
        if (this.__orders[i].getId() === id) {
            return this.__orders[i];                        
        }
    }
};

Customer.prototype.getOrdersId = function() {  
    return this.__orders.map(function(order) {
        return order.getId();
    });
};

Customer.prototype.deleteOrderById = function(id) {
    this.__orders.forEach(function(el, ind) {
        if (el.getId() === id) {
            this.__orders.splice(ind, 1);
        }
    }.bind(this));
};

Customer.prototype.addProductToOrder = function(product, idOrder) {
    this.__orders.forEach(function(order) {
        if (order.getId() === idOrder) {
            order.addProduct(product);
        }
    });
};

Customer.prototype.addProductToOrderAsync = function(product, idOrder, callback) {
    setTimeout(function() {
        var error = null;
        if (this.__orders.getProductsAmount < 0) {
            error = new Error('Error with product\'s amount in order.');
        }
        else if (!product) {
            error = new Error('Error with product in order.');
        }
        else {
            this.__orders.forEach(function(ord) {
                if (ord.getId() === idOrder) {
                    ord.addProduct(product);
                }
            });
        }
        callback(error);
    }.bind(this), 100);
};

Customer.prototype.deleteProductFromOrder = function(product, idOrder) {
    this.__orders.forEach(function(order) {
        if (order.getId() === idOrder) {
            order.deleteProductById(product.getId());
        }
    });
};

Customer.prototype.deleteProductFromOrderAsync = function(product, idOrder, callback) {
    setTimeout(function() {
        var error = null;
        if (this.__orders.getProductsAmount < 0) {
            error = new Error('Error with product\'s amount in order.');
        }
        else if (!product) {
            error = new Error('Error with product in order.');
        }
        else {
            this.__orders.forEach(function(ord) {
                if (ord.getId() === idOrder) {
                    ord.deleteProductById(product.getId());
                }
            });
        }
        callback(error);
    }.bind(this), 100);
};