'use strict';

export default class Order {   
    constructor(id, time, products) {       
        this.__id = id;    
        this.__time = new Date().toTimeString();          // 22:43:11 GMT+0300 (Восточная Европа, летнее время)
        this.__products = [];
    }
    get id() {
        return this.__id;
    }
    get time() {
        return this.__time;
    }
    updateTime() {
        this.__time = Date.now();
    }
    getTotalPrice() {
        const total = this.__products.reduce((total, product) => total + product.price, 0);                  
        return total;  
    }
    addProduct(product) {
        this.__products.push(product) 
    }
    getProductsAmount() {
        return this.__products.length;
    }
    deleteProductById(idProduct) {
        const index = this.__products.findIndex(product => product.id === idProduct);                       // ES6
        this.__products.splice(index, 1);        
    }
    getProductNames() {
        return this.__products.map(function(product) {
            return product.name;
        });
    }
}