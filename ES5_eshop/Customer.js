'use strict';

var Customer = function(id, name, phone, address, orders) {
    User.call(this, id, name, phone, address); 

    this.__orders = orders;
};

// var Customer = function(id, name, phone, address, orders) {
//     this.prototype = User.apply(this, arguments); 
//     this.__orders = orders;
// }

Customer.prototype = Object.create(User.prototype);             
Customer.prototype.constructor = User;                          

Customer.prototype.addOrder = function(order) {               
    this.__orders.push(order);
};

// not in UML
Customer.prototype.getOrders = function() {  
    return this.__orders.map(function(order) {
        return order.getId();
    });
};

Customer.prototype.getOrderById = function(id) {    
    for(var i=0; i<this.__orders.length; i++) {
        if(this.__orders[i].getId() === id) {
            return this.__orders[i].getId();        // ??? id     
        }
    }
};

Customer.prototype.deleteOrderById = function(id) {
    // works(+)
    // for(var i=0; i<this.__orders.length; i++) {
    //     if(this.__orders[i].getId() === id) {
    //         this.__orders.splice(i, 1);
    //     }
    // }

    // (-)
    // this.__orders.forEach(function(el, ind) {
    //     if(el.getId() === id) {
    //          this.__orders.splice(id, 1);
    //         //this.__orders.splice(this.__orders.indexOf(el), 1);
    //     }
    // });

    //(+)
    this.__orders = this.__orders.filter(function(order) {
        return order.getId() !== id;                           
    });
};

Customer.prototype.addProductToOrder = function(product, idOrder) {
    this.__orders.forEach(function(order) {
        if(order.getId() === idOrder) {
            order.addProduct(product);
        }
    });
};

Customer.prototype.addProductToOrderAsync = function(product, idOrder, callback) {
    setTimeout(function() {
        var error = null;
        // if(this.__orders.getProductsAmount < 0) {
        if(!product) {
            error = new Error('Error with product in order.');
        }
        else {
            this.__orders.forEach(function(ord) {
                if(ord.getId() === idOrder) {
                    ord.addProduct(product);
                }
                // response = x;
            });
        }
        //callback(error, response);
        callback(error, this.__orders);
    }.bind(this), 100);
};

Customer.prototype.addProductToOrderPromise = function(product, idOrder) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var error = null;
            if(this.__orders.getProductsAmount < 0) {
                error = new Error('Error with products in order.');
                reject(error);
            }
            else {
                this.__orders.forEach(function(ord) {
                    if(ord.getId() === idOrder) {
                        ord.addProduct(product);
                    }
                });
            }
            resolve();  
        }, 1000);
    });
};


Customer.prototype.deleteProductFromOrder = function(product, idOrder) {
    this.__orders.forEach(function(order) {
        if(order.getId() === idOrder) {
            order.deleteProductById(product.getId());
        }
    });
};

Customer.prototype.deleteProductFromOrderPromise = function(product, idOrder) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var error = null;
            if(this.__orders.getProductsAmount < 0) {
                error = new Error('Error with products in order.');
                reject(error);
            }
            else {
                this.__orders.forEach(function(ord) {
                    if(ord.getId() === idOrder) {
                        ord.deleteProductById(product.getId());
                    }
                });
            }
            resolve();  
        }, 1000);
    });
};

