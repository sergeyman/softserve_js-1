var Customer = function(id, name, phone, address, orders) {
//    this = {};
    User.call(this, id, name, phone, address); 
    //this._cust-field-in-sign = cust-field-in-sign;
    
    this._orders = [];

    //return this;
}

// var Customer1 = function(id, name, phone, address, orders) {
//     this.prototype = User.apply(this, arguments); 
//     this._orders = orders;
// }

//Customer.prototype = new User;
Customer.prototype = Object.create(User.prototype);             // Make an empty obj with User's like prototype/methods
Customer.prototype.constructor = User;                          // Define Constructor (back)

// ...

Customer.prototype.getName = function() {               // adding (extending) function (method) to User.prototype
    return this._name;
}

Customer.prototype.setName = function(name) {           // adding function (method) to User.prototype
    //console.log(this);
    this._name = name;
}

// Customer.prototype.getOrders = function() {
//     return this._orders;
// }

Customer.prototype.addOrder = function(order) {               
    this._orders.push(order);
    //this._orders = order.slice();                             // copy array (!)  
}

Customer.prototype.getOrders = function(order) {  
    return this._orders;
}

Customer.prototype.getOrderById = function(id) {
    console.log('Orders: ' + this._orders);

    return (this._orders.indexOf(id) != undefined) ? this._orders.indexOf(id) : null;

    // return this._orders.indexOf(id);
    //return this._orders.indexOf(parseInt(id, 10));

    // for(var i=0; i<this._orders.length; i++) {
    //     if(this._orders[i] == id)
    //         return i;
    // }
}

Customer.prototype.deleteOrderById = function(id) {
    // this._orders.splice(id, 1);

    // works(?)
    // for(var i=0; i<this._orders.length; i++) {
    //     if(this._orders[i] == id) {
    //         this._orders.splice(id, 1)
    //         break;
    //     }
    // }

    this._orders = this._orders.filter(function(order) {
        return order.getOrderId() !== id;                           //# Uncaught TypeError: order.getOrderId is not a function
    });


    // var newOrders = this._orders.filter(function(value, index, arr) {
    //     return value = id;
    // });

    // console.log(newOrders);
}

Customer.prototype.addProductToOrder = function(idProduct, idOrder) {

}

Customer.prototype.deleteProductToOrder = function(idProduct, idOrder) {

}
