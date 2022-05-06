import User from './User.js';

export default class Customer extends User {
    constructor(id, name, phone, address, orders) {
        super(id, name, phone, address);
        this.__orders = orders;
    }
    addOrder(order) {
        this.__orders.push(order);
    }
    get ordersId() {
        return this.__orders.map(function(order) {
            return order.id;
        });
    }
    getOrderById(id) {
        for(var i=0; i<this.__orders.length; i++) {
            if (this.__orders[i].id === id) {
                return this.__orders[i]   
            }
        }
    }
    deleteOrderById(id) {
        const index = this.__orders.findIndex(order => order.id === id);        // ES6               
        this.__orders.splice(index, 1);
    }
    addProductToOrder(product, idOrder) {
        this.__orders.forEach(function(order) {
            if (order.id === idOrder) {
                order.addProduct(product);
            }
        });
    }

    addProductToOrderPromise(product, idOrder) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var error = null;
                if (this.__orders.getProductsAmount < 0) {
                    error = new Error('Error with products in order.');
                    reject(error);
                }
                else {
                    this.__orders.forEach(function(ord) {
                        if (ord.id === idOrder) {
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
            if (order.id === idOrder) {
                order.deleteProductById(product.id);
            }
        });
    }
    deleteProductFromOrderPromise(product, idOrder) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var error = null;
                if (this.__orders.getProductsAmount < 0) {
                    error = new Error('Error with products in order.');
                    reject(error);
                }
                else {
                    this.__orders.forEach(function(ord) {
                        if (ord.id === idOrder) {
                            ord.deleteProductById(product.id);
                        }
                    });
                }
                resolve();  
            }, 1000);
        });
    }
}