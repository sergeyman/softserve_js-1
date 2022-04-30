var Customer = function(id, name, phone, address, orders) {
    // this = {};
    User.call(this, id, name, phone, address); 
    
    //this._cust-field-in-sign = cust-field-in-sign;
    //this.__orders = [];
    this.___orders = orders;

    // return this;
}

// var Customer1 = function(id, name, phone, address, orders) {
//     this.prototype = User.apply(this, arguments); 
//     this.__orders = orders;
// }

//Customer.prototype = new User;
Customer.prototype = Object.create(User.prototype);             // Make an empty obj with User's like prototype/methods
Customer.prototype.constructor = User;                          // Define Constructor (back)

Customer.prototype.addOrder = function(order) {               
    this.___orders.push(order);
    //this.__orders = order.slice();                             // copy array (!)  
}

Customer.prototype.getOrders = function(order) {  
    // return this.__orders;
    return this.___orders.map( ord => ord.getId() );
};

Customer.prototype.getOrderById = function(id) {
    console.log('Orders: ' + this.___orders);

    return (this.___orders.indexOf(id) != undefined) ? this.___orders.indexOf(id) : null;

    // return this.__orders.indexOf(id);
    //return this.__orders.indexOf(parseInt(id, 10));

    // for(var i=0; i<this.__orders.length; i++) {
    //     if(this.__orders[i] == id)
    //         return i;
    // }
}

Customer.prototype.deleteOrderById = function(id) {
    // this.__orders.splice(id, 1);

    // works(?)
    // for(var i=0; i<this.__orders.length; i++) {
    //     if(this.__orders[i] == id) {
    //         this.__orders.splice(id, 1)
    //         break;
    //     }
    // }

    this.__orders = this.__orders.filter(function(order) {
        return order.getId() !== id;                           //# Uncaught TypeError: order.getId is not a function
    });


    // var newOrders = this.__orders.filter(function(value, index, arr) {
    //     return value = id;
    // });

    // console.log(newOrders);
}

// Передавть продуки!
Customer.prototype.addProductToOrder = function(product, idOrder) {
    // this.__orders.push(idProduct, new Order(idOrder))
    //this.___orders.getId(idOrder).addProduct(idProduct);
    this.___orders.forEach(function(ord) {
        if(ord.getId() !== idOrder) {
            ord.addProduct(product);
        }
    });
};

Customer.prototype.deleteProductFromOrder = function(product, idOrder) {

}
