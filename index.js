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
    console.log(this);
    this._name = name;
}

var Customer = function(id, name, phone, address, orders) {
    User.call(this, id, name, phone, address, orders); 
    this._orders = orders;
}

var Customer1 = function(id, name, phone, address, orders) {
    this.prototype = User.apply(this, arguments); 
    this._orders = orders;
}

Customer.prototype = new User;
Customer.prototype.constructor = User;

// ...

var cust = new Customer(0, 'Customer', 'order');
var cust1 = new Customer1(1, 'Customer1', 'order1');
//var cust2 = new Customer2(2, 'Customer2', 'order2');

cust.setName('CustomerChangedName');
cust1.setName('Customer1ChangedName');

/*
https://app.diagrams.net/?src=about#G1HXTO8hko1Hycd8y4ZlBMERG0oyHhFunf


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
*/