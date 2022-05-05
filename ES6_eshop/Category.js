export default class Category {
    constructor(id, name) {
        this.__id = id;
        this.__name = name;
    }
    get id() {
        return this.__id; 
    }
    get name() {
        return this.__name;
    }
}