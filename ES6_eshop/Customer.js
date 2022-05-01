import User from './User.js';

export default class Customer extends User {
    constructor(id, name, phone, address, orders) {
        super(id, name, phone, address);
        this.__orders = orders;
    }
    addOrder(order) {
        this.__orders.push(order);
    }
    getOrders() {
        return this.__orders.map(function(order) {
            return order.getId();
        });
    }
    getOrderById() {
        for(var i=0; i<this.__orders.length; i++) {
            if(this.__orders[i].getId() === id) {
                return this.__orders[i].getId();        // ??? id    
            }
        }
    }
    deleteOrderById(id) {
        //(+)
        this.__orders = this.__orders.filter(function(order) {
            return order.getId() !== id;                           
        });
    }
    addProductToOrder(product, idOrder) {
        this.__orders.forEach(function(order) {
            if(order.getId() === idOrder) {
                order.addProduct(product);
            }
        });
    }
    addProductToOrderAsync(product, idOrder, callback) {
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
    }
    addProductToOrderPromise(product, idOrder) {
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
    }
    deleteProductFromOrder(product, idOrder) {
        this.__orders.forEach(function(order) {
            if(order.getId() === idOrder) {
                order.deleteProductById(product.getId());
            }
        });
    }
    deleteProductFromOrderPromise(product, idOrder) {
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
    }
}