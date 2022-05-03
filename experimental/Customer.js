'use strict';

var Customer = function(id, name, phone, address, orders) {
    // this = {};
    User.call(this, id, name, phone, address); 
    
    //this._cust-field-in-sign = cust-field-in-sign;
    //this.__orders = [];
    this.__orders = orders;

    // return this;
};

// var Customer1 = function(id, name, phone, address, orders) {
//     this.prototype = User.apply(this, arguments); 
//     this.__orders = orders;
// }

//Customer.prototype = new User;
Customer.prototype = Object.create(User.prototype);             // Make an empty obj with User's like prototype/methods
Customer.prototype.constructor = User;                          // Define Constructor (back)

Customer.prototype.addOrder = function(order) {               
    this.__orders.push(order);
    //this.__orders = order.slice();                             // copy array (!)  
};

// not in UML
Customer.prototype.getOrders = function() {  
    // return this.__orders;
    return this.__orders.map( ord => ord.getId() );
};

Customer.prototype.getOrderById = function(id) {    
    //return (this.__orders.indexOf(id) != undefined) ? this.__orders[indexOf(id)] : null;

    // return this.__orders.indexOf(id);
    //return this.__orders.indexOf(parseInt(id, 10));
    for(var i=0; i<this.__orders.length; i++) {
        if(this.__orders[i].getId() === id)
            return this.__orders[i].getId();        // ??? id
        // return (this.__orders[i].getId() === id) ? this.__orders[i].getId() : null;      // NO
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

    // ES5 (+)!
    this.__orders = this.__orders.filter(function(order) {
        return order.getId() !== id;                           //# Uncaught TypeError: order.getId is not a function
    });


    // var newOrders = this.__orders.filter(function(value, index, arr) {
    //     return value = id;
    // });

    // console.log(newOrders);
};

// Передавть продукты!
Customer.prototype.addProductToOrder = function(product, idOrder) {
    // this.__orders.push(idProduct, new Order(idOrder))
    //this.___orders.getId(idOrder).addProduct(idProduct);
    this.__orders.forEach(function(ord) {
        //if(ord.getId() !== idOrder) {             // ?
        if(ord.getId() === idOrder) {
            ord.addProduct(product);
        }
    });
};

// function mulAsync(a, b, cb) {    	// AsF
// 	setTimeout( function() {      	// to bind()!!!      
// 		var res = a * b;            // this - понадобится для логики АФ
// 		cb(res);                    // return через CB   (Запуск оброобтчика того, что получено)
// 	}, 1000);
// }
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
    // const index = this.__orders.findIndex(order => order.getId() === idOrder);
    // this.__orders.

    // this.__orders = this.__orders.filter(function(order) {
    //     return order.getId() !== id;                           //# Uncaught TypeError: order.getId is not a function
    // });

    this.__orders.forEach(function(order) {
        if(order.getId() === idOrder) {
            order.deleteProductById(product.getId());
        }
    });
};
