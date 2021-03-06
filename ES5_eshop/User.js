'use strict';

function User(id, name, phone, address) {           
    if (id === undefined) {
        throw new Error('User constructor requires an id.');
    }
    this._id = id;
    this._name = name || 'No name specified';
    this._phone = phone || 'No phone specified';
    this._address = address || 'No address specified';
}

User.prototype.getId = function() {               
    return this._id;
};

User.prototype.getName = function() {              
    return this._name;
};

User.prototype.setName = function (name) {          
    // check input parameter
    if (typeof name !== 'string') throw new Error('#Name must have string type.');
    if (name.trim() !== '') {
        this._name = name.trim();
    }
};

User.prototype.getAddres = function() {               
    return this._address;
};

User.prototype.getPhone = function() {               
    return this._phone;
};