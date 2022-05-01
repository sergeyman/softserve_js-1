"use strict";

// 1) Adding Categories
var cat1 = new Category(1, 'Category1');
var cat2 = new Category(2, 'Category2');
var cat3 = new Category(3, 'Category3');

console.log('Category2 name: ' + cat2.getName());

// 1.1) Groups of categories
var categroyGroup1 = new Array(cat1, cat2);
var categroyGroup2 = new Array(cat2, cat3);
var categroyGroup3 = new Array(cat3);


// 2) Adding Products
// var prod1 = new Product(1, 'Product1', 100, new Array(1, 2));
var prod1 = new Product(1, 'P1', 10, categroyGroup1);
var prod2 = new Product(2, 'P2', 200, categroyGroup2);    // arr
var prod3 = new Product(3, 'P3', 300, categroyGroup3);
//var prod4 = new Product(4, 'Product4', 400, cat1);              // check for Error
//prod4.getCategoryNames();

console.log('Product1 price: ', prod1.getPrice());
prod1.setPrice(200);                                                  // change price
console.log('Product1 price: ', prod1.getPrice());
console.log('Product1 category names: ', prod1.getCategoryNames());   // ? []
console.log('Product3 category names: ', prod3.getCategoryNames());


// 3) Adding Order
var order1 = new Order(1);          // p1
var order2 = new Order(2);          // p2, p3
var order3 = new Order(3);          // (p1), p3
var order4 = new Order(4);			// p1, p3 async adding products
console.log('Order1 time: ' + order1.getTime());

order1.addProduct(prod1);                                             // adding products to order
order2.addProduct(prod2); 
order2.addProduct(prod3);  
order3.addProduct(prod1);
order3.addProduct(prod3); 

// async adding products (?)
//order4.

// not in UML
console.log('Order3 before deleting Product: ' + order3.getProductsAmount());
order3.deleteProductById(1);
console.log('*Order3 after deleting Product: ' + order3.getProductsAmount());
// not in UML ***

console.log('Order1 Total Price: ' + order1.getTotalPrice());
console.log('Order' + order1.getId() +' Total Price: ' + order1.getTotalPrice());
console.log('Order' + order2.getId() +' Total Price: ' + order2.getTotalPrice());
console.log('Order' + order3.getId() +' Total Price: ' + order3.getTotalPrice());

var ordersForCustomer1 = new Array(order1, order2);



// 4) Adding Customers
//Customer = function(id, name, phone, address, orders)
// var cust = new Customer(0, 'Customer', 'phone', 'addr', orders = new Array(1, 2, 3));    //# Empty Array (?)
var cust1 = new Customer(1, 'Customer1', 'phone1', 'addr1', ordersForCustomer1);           

//var cust1 = new Customer1(1, 'Customer1', 'phone1', 'addr1', orders1 = new Array(10, 20, 30));
//var cust2 = new Customer2(2, 'Customer2', 'order2');

cust1.setName(' Customer1ChangedName  ');                // change Customer1 name

// test the type checking of Superclass name setter                              
//cust1.setName(22);

console.log(cust1);
console.log('*Customer1 changed name: ' + cust1.getName());
console.log('Customer1 orders: ' + cust1.getOrders());

cust1.addOrder(order3);
console.log('*Customer1 orders(after adding): ' + cust1.getOrders());

//console.log('Customer1 order3(?): ' + cust1.getOrderById(3));

cust1.deleteOrderById(3);
console.log('*Customer1 orders(after deleting): ' + cust1.getOrders());

// cust1.deleteOrderById(2);
// console.log('*Customer1 orders (after deleting): ' + cust1.getOrders());

// cust1.deleteOrderById(1);
// console.log('*Customer1 orders (after deleting): ' + cust1.getOrders());

console.log('Customer1 orders: ' + cust1.getOrders());

console.log('Order2 Products: ' + order2.getProductsAmount() + '(' + order2.getProductNames() + ')');
cust1.addProductToOrder(prod1, order2.getId());
cust1.addProductToOrder(prod1, order2.getId());
console.log('*Order2 Products(after adding 2 products): ' + order2.getProductsAmount() + '(' + order2.getProductNames() + ')');

cust1.deleteProductFromOrder(prod1, order2.getId());
console.log('*Order2 Products(after deleting 1 product): ' + order2.getProductsAmount() + '(' + order2.getProductNames() + ')');

console.log('Order1 Products: ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
cust1.addProductToOrder(prod3, order1.getId());
console.log('*Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');

// Async 1 CBH (#)
cust1.addProductToOrderAsync(prod1, order1.getId(), function(err, orders) {
	if(err) {
		console.log(err);		
	}
	else {
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
	}
	cust1.addProductToOrderAsync(prod1, order1.getId(), function(err, orders) {
		if(err) {
			console.log(err);		
		}
		else {
			console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
		}
		cust1.addProductToOrderAsync(prod1, order1.getId(), function(err, orders) {
			if(err) {
				console.log(err);		
			}
			else {
				console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
			}
		});
	});
});

// Async 2 Promise
cust1.addProductToOrderPromise(prod1, order1.getId())
	//.then(data => {
	.then(() => {
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
		return cust1.addProductToOrderPromise(prod1, order1.getId());
	})
	.then(() => {
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
		return cust1.addProductToOrderPromise(prod1, order1.getId());
	})
	.then(() => {
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
		return cust1.addProductToOrderPromise(prod1, order1.getId());
	})
	.catch(err => console.log(err))
	.finally(() => console.log('Products are added to the order.'));

// Async 3 async/await
async function asyncAddProductToOrder() {
	try {
		await cust1.addProductToOrderPromise(prod1, order1.getId());
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
		await cust1.addProductToOrderPromise(prod1, order1.getId());
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
		await cust1.addProductToOrderPromise(prod1, order1.getId());
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
	}
	catch(error) {
		console.log(error.message);
	}
}
asyncAddProductToOrder();

async function asyncAddProductToOrder2() {
	try {
		await cust1.addProductToOrderPromise(prod1, order1.getId());
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
	}
	catch(error) {
		console.log(error.message);
	}
	try {
		await cust1.addProductToOrderPromise(prod1, order1.getId());
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
	}
	catch(error) {
		console.log(error.message);
	}
	try {
		await cust1.addProductToOrderPromise(prod1, order1.getId());
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
	}
	catch(error) {
		console.log(error.message);
	}
}
asyncAddProductToOrder2();

// *************************************
// 4.1) Adding order
// var ord1 = new Order(10);
// cust1.addOrder(ord1);
// cust1.getOrders();
// cust1.getOrderById(10);



// // 4.2) Adding orders
// // cust.addOrder(new Array(1, 1, 5));

// var orders = [new Order(10), new Order(20), new Order(30)];
// //cust.addOrder(orders);

// cust1.addOrder([1, 3, 5]);
// console.log(cust1.getOrderById(3));      // # -1 (?)  >>>  this._orders = order.slice(); // copy array

// // Deleting orders
// console.log("\nOrders before deleting: " + cust1.getOrders());
// //cust.deleteOrderById(1);                // 3 - not working (?)
// console.log("Orders after deleting: " + cust1.getOrders());
















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





// sync call of sync f.
// async function mul(a, b) {		//# Uncaught SyntaxError: await is only valid in async functions
function mul(a, b) {
	return a * b;
}
var res1 = mul(1, 2);
var res2 = mul(5, 3);
var res3 = mul(res1, res2);
console.log(res1, res2, res3);

// ES6
// const res10 = await mul(1, 2);
// const res20 = await mul(5, 3);
// const res30 = await mul(res10, res20);
// console.log(res10, res20, res30);


// asyn call of CBF
function mulAsync(a, b, cb) {    	// AsF
	setTimeout( function() {      	// to bind()!!!      
		var res = a * b;            // this - понадобится для логики АФ
		cb(res);                    // return через CB   (НЕТ ЯВН. return!!!)
	}, 1000);
}

mulAsync(    							// call AsF
	1,    
	2,    
	function(res) {       				// CBF1 (AnF) 
		var res1 = res;        
		mulAsync(            
			5,            
			3,            
			function(res) {         	// CBF2       
				var res2 = res;                
				mulAsync(res1, 
					res2, 
					function(res) { 	// CBF3
					var res3 = res;
					console.log(res1, res2, res3);
				})
			}
		)
	}
)

mulAsync(    						
	1,    
	2,    
	function(res) {         		// CBF = console.log()    
		console.log(res);    
	}
);


// CBH2 (Luchenko A.)
function cbh2() {
	const a = [2, 3, 4, 5];
	console.log(a.join('-'));
}

cbh2();

// Another
// (function() { 
// 	for(var i=0; i<10; i++) {
//     	setTimeout(function() {
// 			console.log(Math.ceil(Math.random() * 1000)); 
// 		}, 100})
// ();

// var foo = function () {
// 	for(var i=0; i<10; i++) {
//     	setTimeout(function() {
// 			console.log(Math.ceil(Math.random() * 1000)); 
// 		}, 100);
// };
// foo();

// (function() {
// 	for(var i=0; i<10; i++) {
//     	setTimeout(function() {
// 			console.log(Math.ceil(Math.random() * 1000)); 
// 		}, 100);
// })();


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


// https://softserveinc.zoom.us/rec/play/9dydfnx1SmGBQq-rB09r_Npt1brYfctGrTqNyAXUBbgHfs9fN0Ugmmj-ssAd-v2m0rysB7xadjW-3Sfz.8EL8xYaNHv3FiEdN?startTime=1644334279000&_x_zm_rtaid=Ngc6chNmT3yCoyGol7_7Ig.1650442539368.f3461c01abd6dd88a19495a261770b19&_x_zm_rhtaid=196
// async, CBF:
JS(Stack<obj>, Heap<fun, objRefs>)
BR(EventLoop<>, CBQueue, WebAPI(DOM, Ajax<ref>, setTimeout())) 


//function() {      AGF Anonymous Global Function (автоматически вызывается)
	function a() {
		console.log('a1');
		//setTimeout(b, 1000);
		b();
		console.log('a2');
	
	}
	function b() {
		console.log('b');
	}
	
	a();
//}

// sync call of sync f.
function mul(a, b) {
	return a * b;
}
var res1 = mul(1, 2);
var res2 = mul(5, 3);
var res3 = mul(res1, res2);
console.log(res1, res2, res3);

// ES6
const res1 = await mul(1, 2);
const res2 = await mul(5, 3);
const res3 = await mul(res1, res2);
console.log(res1, res2, res3);

// asyn call of CBF (CB принимает на вход обязательно!)
// CBF - это что произойдет, когда ф-я выполнит свою логику (результат передается в CBF)
// Anf - for logic
// CBF - to return result (?) [00:53]
function mulAsync(a, b, cb) {    
	setTimeout( function() {      	// AnF(logic) - to bind(this)!!!      
		res = a * b;                // this - понадобится для логики АФ
		cb(res);                    // return через CB   !!! (в осн. поток вернуть рез. получаемый из асинхр. ф-ии)
		//console.log(res);			// ex. of CBF (not to bind()!)
	}, 1000);
}

mulAsync(    
	1,    
	2,    
	function(res) {       			// CBF1 (AF) 
		var res1 = res;        
		mulAsync(            
			5,            
			3,            
			function(res) {         // CBF2       
				var res2 = res;                
				mulAsync(res1, 
					res2, 
					function(res) { 
					var res3 = res;
					console.log(res1, res2, res3)
				})
			}
		)
	}
)
//# Uncaught ReferenceError: res3 is not defined
// Замыкание - это когда ф. mulAsync() уже не существует (в стеке), а переменные внтури ее существуют


mulAsync(    
	1,    
	2,    
	function(res) {         // CBF = console.log()    
		console.log(res);    
	}
);


>> CBHell, Promise, <Promise + generators>, async/await (15 yrs!)

*forEach() - всегда лучше (оптимизирован)
	ES6: find(), findIndex()
*В Моделях - не использовать console.log(), только в рендере 
*/