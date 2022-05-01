'use strict';

export default class User {
    constructor(id, name, phone, address) {           
        if(id === undefined) throw new Error('User constructor requires an id.');
        this._id = id;
        this._name = name || 'No name specified';
        this._phone = phone || 'No phone specified';
        this._address = address || 'No address specified';
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        //* check input parameter
        if(typeof name !== 'string') throw new Error('#Name must have string type.');
        if(typeof name === 'string' && name.trim() !== '') {
            this._name = name.trim();
        }
        //* no checking parameters    
        //this._name = name;
    }
    get address() {
        return this._address;
    }
    get phone() {
        return this._phone;
    }
}