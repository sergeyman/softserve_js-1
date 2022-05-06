export default class Product {
    constructor(id, name, price, categories) { 
        this.__id = id;
        this.__name = name;
        this.__price = price;
        this.__categories = categories;         // array
    }
    get id() {
        return this.__id;
    }
    get name() {
        return this.__name;
    }
    get price() {
        return this.__price;
    }
    set price(price) {
        if (typeof price !== 'number') throw new Error('#Price must have number type.');             
        this.__price = price;
    }
    get categoryNames() {
        return this.__categories.map(function(category) {
            return category.name;
        });
    }
}