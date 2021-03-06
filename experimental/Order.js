'use strict';

function Order(id) {           // Constructor
    this.__id = id;
    //this.__time = Date.now();
    //this.__time = new Date().toString();                      // Sun May 01 2022 22:40:41 GMT+0300 
    //this.__time = new Date().toLocaleDateString();            // 01.05.2022
    //this.__time = new Date().toLocaleTimeString();            // 22:41:57
    //this.__time = new Date().toLocaleString();                // 01.05.2022, 22:39:34
    //this.__time = new Date().toISOString();                   // 2022-05-01T19:38:45.267Z
    this.__time = new Date().toTimeString();                    // 22:43:11 GMT+0300 (Восточная Европа, летнее время)
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
    var initValue = 0;
    
    // var 1 (forEach) (+)
    // this.__products.forEach(function (p, ind) {
    //     total += p.getPrice();
    // })
    // return total;

    // var 2 (ES5)      (+)
    // var sum = nums.reduce(function(n1,n2) { return n1 + n2; });
    // return total = this.__products.reduce( (acc, val) => acc + val )
    total = this.__products.reduce( function(total, p) {
        return total + p.getPrice();        
    }, initValue);                  //* SYNTAXIS !!!
    return total;    
};

Order.prototype.addProduct = function(prod) {            
   this.__products.push(prod) 
};


// amount (not in UML)
Order.prototype.getProductsAmount = function() {
    return this.__products.length;
};

// delete (not in UML)
Order.prototype.deleteProductById = function(idProduct) {
    // (-)
    // this.__products.forEach(function(pid, index) {
    //     //условие (index получить!, только найти, удалять на віходе цикла)
    //     if(idProduct === pid.getId()) {
    //         this.__products.splice(this.__products.indexOf(idProduct));     //# undefined ? (bind)
    //     }
    // });

    // (+/-) for()
    // for(var i=0; i< this.__products.length; i++) {
    //     var p = this.__products[i];
    //     if(idProduct === p.getId()) {
    //         this.__products.splice(this.__products.indexOf(i));
    //     }
    // }

    // ES5 filter()
    this.__products = this.__products.filter(function(product) {
        return product.getId() !== idProduct;                           
    });

    // ES6 findIndex() (+)!
    // this.__products.splice(this.__products.findIndex(product => product.id === idProduct), 1);             

    // ES6 findIndex() (+)!
    // const index = this.__products.findIndex(product => product.id === idProduct);                       
    // this.__products.splice(index, 1); 
};

// products (not in UML)
Order.prototype.getProductNames = function() {
    return this.__products.map(function(product) {
        return product.getName();
    });
};

/*

https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

*/