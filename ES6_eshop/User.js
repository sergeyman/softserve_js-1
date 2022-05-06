export default class User {
    constructor(id,
        name = 'No name specified',
        phone = 'No phone specified',
        address = 'No address specified') {
        if (id === undefined) {
            throw new Error('User constructor requires an id.');
        }
        this._id = id;
        this._name = name;
        this._phone = phone;
        this._address = address;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        // check input parameter
        if (typeof name !== 'string') throw new Error('#Name must have string type.');
        if (name.trim() !== '') {
            this._name = name.trim();
        }
    }
    get address() {
        return this._address;
    }
    get phone() {
        return this._phone;
    }
}