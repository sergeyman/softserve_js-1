'use strict';

function Category(id, name) {
    this.__id = id;
    this.__name = name;
}

Category.prototype.getId = function() {  
    return this.__id;             
};

Category.prototype.getName = function() {               
    return this.__name;
};