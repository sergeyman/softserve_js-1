'use strict';

import Category from './Category.js';
import Product from './Product.js';
import Order from './Order.js';
import Customer from './Customer.js';

// 1) Creating Categories
let cat1 = new Category(1, 'Category1');
let cat2 = new Category(2, 'Category2');
let cat3 = new Category(3, 'Category3');
console.log('Category2 name: ' + cat2.name);

// 1.1) Groups of categories
let categroyGroup1 = new Array(cat1, cat2);
let categroyGroup2 = new Array(cat2, cat3);
let categroyGroup3 = new Array(cat3);

// 2) Creating Products
let prod10 = new Product(1, 'Product1', 100, new Array(cat1));
let prod1 = new Product(1, 'P1', 10, categroyGroup1);
let prod2 = new Product(2, 'P2', 200, categroyGroup2);    				// arr
let prod3 = new Product(3, 'P3', 300, categroyGroup3);
//let prod4 = new Product(4, 'Product4', 400, cat1);              		// check for Error
//prod4.categoryNames;

console.log('Product1 price: ', prod1.price);
// prod1.setPrice(200); 
prod1.price = 200;                                                  	// change price
console.log('Product1 price: ', prod1.price);
console.log('Product1 category names: ', prod1.categoryNames);   	// check array return for map()
console.log('Product3 category names: ', prod3.categoryNames);

// 3) Creating Orders
let order1 = new Order(1);          // p1
let order2 = new Order(2);          // p2, p3
let order3 = new Order(3);          // (p1), p3
let order4 = new Order(4);			// p1, p3 async adding products
console.log('Order1 time: ' + order1.time);

// 4) Adding products to orders synch.
order1.addProduct(prod1);                                             
order2.addProduct(prod2); 
order2.addProduct(prod3);  
order3.addProduct(prod1);
order3.addProduct(prod3); 

console.log('Order3 before deleting Product: ' + order3.productsAmount);
order3.deleteProductById(1);
console.log('*Order3 after deleting Product: ' + order3.productsAmount);

console.log('Order1 Total Price: ' + order1.totalPrice);
console.log('Order' + order1.id +' Total Price: ' + order1.totalPrice);
console.log('Order' + order2.id +' Total Price: ' + order2.totalPrice);
console.log('Order' + order3.id +' Total Price: ' + order3.totalPrice);

const ordersForCustomer1 = new Array(order1, order2);

// 4) Creating Customers
let cust1 = new Customer(1, 'Customer1', 'phone1', 'addr1', ordersForCustomer1);           
let cust2 = new Customer(2, 'Customer2', 'phone2', 'addr2', new Array(order3));

// cust1.setName(' Customer1ChangedName  ');  
cust1.name = ' Customer1ChangedName  ';              
//cust1.setName(22);									 					// test the type checking of Superclass name setter	
//cust1.name = 22;

//console.log(cust1);
//console.log(cust2);
console.log('*Customer1 changed name: ' + cust1.name);
console.log('Customer1 orders: ' + cust1.ordersId);

// 5) Making purchasements 
cust1.addOrder(order3);
console.log('*Customer1 orders(after adding): ' + cust1.ordersId);

console.log('***Customer1 order3(?): ', cust1.getOrderById(3));

cust1.deleteOrderById(3);
console.log('*Customer1 orders(after deleting): ' + cust1.ordersId);

// cust1.deleteOrderById(2);
// console.log('*Customer1 orders (after deleting): ' + cust1.ordersId);

// cust1.deleteOrderById(1);
// console.log('*Customer1 orders (after deleting): ' + cust1.ordersId);

console.log('Customer1 orders: ' + cust1.ordersId);

console.log('Order2 Products: ' + order2.productsAmount + '(' + order2.productNames + ')');
cust1.addProductToOrder(prod1, order2.id);
cust1.addProductToOrder(prod1, order2.id);
console.log('*Order2 Products(after adding 2 products): ' + order2.productsAmount + '(' + order2.productNames + ')');

cust1.deleteProductFromOrder(prod1, order2.id);
console.log('*Order2 Products(after deleting 1 product): ' + order2.productsAmount + '(' + order2.productNames + ')');

console.log('Order1 Products: ' + order1.productsAmount + '(' + order1.productNames + ')');
cust1.addProductToOrder(prod3, order1.id);
console.log('*Order1 Products(after adding 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');

console.log('\n***async***');

// Async 2 Promise
// cust1.addProductToOrderPromise(prod1, order1.id)
// 	.then(() => {
// 		console.log('#Order1 Products(after adding 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
// 		return cust1.addProductToOrderPromise(prod1, order1.id);
// 	})
// 	.then(() => {
// 		console.log('#Order1 Products(after deleting 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
// 		return cust1.deleteProductFromOrderPromise(prod1, order1.id);
// 	})
// 	.then(() => {
// 		console.log('#Order1 Products(after adding 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
// 		return cust1.addProductToOrderPromise(prod1, order1.id);
// 	})
// 	.catch(err => console.log(err))
// 	.finally(() => console.log('Products are added to the order.'));

cust1.deleteProductFromOrderPromise(prod1, order1.id)
	.then(() => {
		console.log('PD#Order1 Products(after deleting 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
		return cust1.deleteProductFromOrderPromise(prod1, order1.id);
	})
	.then(() => {
		console.log('PD#Order1 Products(after deleting 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
		return cust1.deleteProductFromOrderPromise(prod1, order1.id);
	})
	.then(() => {
		console.log('PD#Order1 Products(after deleting 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
		return cust1.deleteProductFromOrderPromise(prod1, order1.id);
	})
	.catch(err => console.log(err))
	.finally(() => console.log('PD: Products are deleted from the order.'));

// Async 3 async/await
async function asyncAddProductToOrder() {
	try {
		await cust1.addProductToOrderPromise(prod1, order1.id);
		console.log('A1A#Order1 Products(after adding 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
		await cust1.addProductToOrderPromise(prod1, order1.id);
		console.log('A1D#Order1 Products(after deleting 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
		await cust1.addProductToOrderPromise(prod1, order1.id);
		console.log('A1A#Order1 Products(after adding 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
	}
	catch(error) {
		throw err.message; 
	}
}
asyncAddProductToOrder();

//ASYNC
async function asyncAddProductToOrder2() {
	try {
		await cust1.addProductToOrderPromise(prod1, order1.id);
		console.log('A2A#Order1 Products(after adding 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
	} catch(error) {
		console.log(error.message);
	}
	try {
		await cust1.deleteProductFromOrderPromise(prod1, order1.id);
		console.log('A2D#Order1 Products(after deleting 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
	}
	catch(error) {
		console.log(error.message);
	}
	try {
		await cust1.addProductToOrderPromise(prod1, order1.id);
		console.log('A2A#Order1 Products(after adding 1 product): ' + order1.productsAmount + '(' + order1.productNames + ')');
	}
	catch(error) {
		console.log(error.message);
	}
}
asyncAddProductToOrder2();