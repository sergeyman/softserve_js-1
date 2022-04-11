'use strict';

function User(id, name, phone, address) {           // Constructor
    this._id = id;
    this._name = name;
    this._phone = phone;
    this._address = address;
}

User.prototype.getName = function() {               // adding (extending) function (method) to User.prototype
    return this._name;
}

User.prototype.setName = function(name) {           // adding function (method) to User.prototype
    //console.log(this);
    this._name = name;
}

User.prototype.getAddres = function() {               
    return this._address;
}

User.prototype.getPhone = function() {               
    return this._phone;
}