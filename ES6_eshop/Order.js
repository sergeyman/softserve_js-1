export default class Order {   
    constructor(id) {       
        this.__id = id;    
        this.__time = new Date();          // 22:43:11 GMT+0300 (Восточная Европа, летнее время)
        this.__products = [];
    }
    get id() {
        return this.__id;
    }
    get time() {
        return this.__time.toTimeString();
    }
    updateTime() {
        this.__time = new Date();
    }
    get totalPrice() {
        const total = this.__products.reduce((total, product) => {
            return total + product.price                    
        }, 0);      
                    
        return total;  
    }
    addProduct(product) {
        this.__products.push(product); 
    }
    get productsAmount() {
        return this.__products.length;
    }
    deleteProductById(idProduct) {
        const index = this.__products.findIndex(product => product.id === idProduct);                       // ES6
        this.__products.splice(index, 1);        
    }
    get productNames() {
        return this.__products.map(product => product.name );
    }
}