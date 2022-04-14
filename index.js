// 1) Adding Categories
var cat1 = new Category(1, 'Category1');
var cat2 = new Category(2, 'Category2');
var cat3 = new Category(3, 'Category3');

console.log('Category2 name: ' + cat2.getName());

categories1 = new Array(cat1, cat2);


// 2) Adding Products
// var prod1 = new Product(1, 'Product1', 100, new Array(1, 2));
var prod1 = new Product(1, 'Product1', 100, categories1);
var prod2 = new Product(2, 'Product2', 100, 1);
var prod3 = new Product(3, 'Product3', 100, 1);

console.log('Product1 price: ', prod1.getPrice());
prod1.setPrice(200);                                                  // change price
console.log('Product1 price: ', prod1.getPrice());
console.log('Product1 category names: ', prod1.getCategoryNames());   // ? []


// 3) Adding Order
var order1 = new Order(1);
var order2 = new Order(2);
console.log('Order1 time: ' + order1.getOrderTimeById(1));

order1.addProduct(prod1);                                             // adding order to product
order2.addProduct(prod2); 
order2.addProduct(prod3);                                           

var ordersForCustomer1 = new Array(order1, order2);

// 4) Adding Customers
// var cust = new Customer(0, 'Customer', 'phone', 'addr', orders = new Array(1, 2, 3));    //# Empty Array (?)
var cust1 = new Customer(1, 'Customer1', 'phone1', 'addr1', ordersForCustomer1);           

//var cust1 = new Customer1(1, 'Customer1', 'phone1', 'addr1', orders1 = new Array(10, 20, 30));
//var cust2 = new Customer2(2, 'Customer2', 'order2');

cust1.setName('Customer1ChangedName');                                 // change Customer1 name
//cust1.setName('Customer1ChangedName');

console.log(cust1);
console.log(cust1.getName());

cust1.addProductToOrder(prod1, order1.getOrderId());

console.log('Customer1 orders: ' + cust1.getOrders());








// 4.1) Adding order
var ord1 = new Order(10);
cust1.addOrder(ord1);
cust1.getOrders();
cust1.getOrderById(10);



// 4.2) Adding orders
// cust.addOrder(new Array(1, 1, 5));

var orders = [new Order(10), new Order(20), new Order(30)];
//cust.addOrder(orders);

cust1.addOrder([1, 3, 5]);
console.log(cust1.getOrderById(3));      // # -1 (?)  >>>  this._orders = order.slice(); // copy array

// Deleting orders
console.log("\nOrders before deleting: " + cust1.getOrders());
//cust.deleteOrderById(1);                // 3 - not working (?)
console.log("Orders after deleting: " + cust1.getOrders());
















// ***
var Customer10 = function(id, name, phone, address, orders) {
    User.call(this, id, name, phone, address, orders); 
    this._orders = orders;
}

Customer10.prototype = new User();
Customer10.prototype.constructor = User;

// Customer10.prototype.methodSub = fucntion methodSub() {
//     return "methodSub";
// };

// ***

/*
https://app.diagrams.net/?src=about#G1HXTO8hko1Hycd8y4ZlBMERG0oyHhFunf
https://github.com/sergeyman/softserve_js-1
https://www.w3schools.com/js/js_es5.asp#mark_array_foreach

animals.forEach(function(animal, index, array) {
  console.log(animal);
});

Object.create() - не создает новый об., не наследует, - копирует св-ва

Наследование до 2009
[Ellie]
1) function FD(field) {
2) this.field = field;
3) function f() {}
4) var fd = new FD('Field1');
5) fd.f();      // call method for fd object

6) FD.protoype.field1 = 'field1';
7) Object.prototype.fObject = 'objectField';    // add prop. to Object object's prototype to give it to all classes
*Плохая практика: расширение базовых прототипов
Одной из частых ошибок является расширение Object.prototype или других базовых прототипов.
Такой подход называется monkey patching и нарушает принцип инкапсуляции.
Единственным оправданием расширения базовых прототипов могут являться лишь полифилы - эмуляторы новой 
функциональности (например, Array.forEach) для не поддерживающих её реализаций языка в старых веб-браузерах.

8) function FD(fiels) {
    this._field = field;
    this. f = f();                              // add method(1) to FD by assigninig the function name to the property
}
9) FD.prototype.addMethod = function addMethod() { ret. "addMethod"; }     // add method(2) to FD.prototype

10) Object
 +constructor                   - a ref. to the function that creatded the object
 +prototype                     - a ref. to the obj. prototype for the object. Allows the obj. to share props and methods
 +toString()                    - string representing of spec. object
 +valueOf()                     - prim. value for a spec. obj.
 +hasOwnProperty(property)      - to test if prop. belongs to the obj.
 +isPrototypeOf(object)         - to test if obj. is one of the parent prototype objects of the spec. child object
 instaceof                      - to test if the obj. is of the spec. obj. type

    console.log(fd instanceof FD ? 'instance' : 'not an instance');
    console.log(fd.isPropertyOf(FD) ? 'property' : 'not a property');
    console.log(fd.constructor == FD ? 'constructor' : 'not a constructor');
    console.log(fd.hasOwnProperty("field") ? 'has such property' : 'do not has such property');

11) function SubFD(){}                  // subclass constructor
    SubFD.prototype = new FD();
    SubFD.prototype.constructor = FD;

    SubFD.prototype.methodSub = function methodSub() { return "methodSub"; }

    var sub = new SubFD;
    sub.addMethod();                // call the inherited method
    sub.methodSub();                // call the subclass method



https://developer.mozilla.org/ru/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
Важно:

Типы определяются в .prototype
Для наследования используется Object.create()

var o = {
  a: 2,
  m: function(){
    return this.a + 1;
  }
};

console.log(o.m()); // 3
// в этом случае при вызове 'o.m' this указывает на 'o'

var p = Object.create(o);
// 'p' - наследник 'o'

p.a = 12; // создаст собственное свойство 'a' объекта 'p'
console.log(p.m()); // 13
// при вызове 'p.m' this указывает на 'p'.
// т.е. когда 'p' наследует функцию 'm' объекта 'o',
// this.a означает 'p.a', собственное свойство 'a' объекта 'p'
*/