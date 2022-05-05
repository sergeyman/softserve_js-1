'use strict';

// 1) Creating Categories
var cat1 = new Category(1, 'Category1');
var cat2 = new Category(2, 'Category2');
var cat3 = new Category(3, 'Category3');
console.log('Category2 name: ' + cat2.getName());

// 1.1) Groups of categories
var categroyGroup1 = new Array(cat1, cat2);
var categroyGroup2 = new Array(cat2, cat3);
var categroyGroup3 = new Array(cat3);

// 2) Creating Products
var prod10 = new Product(1, 'Product1', 100, new Array(cat1));
var prod1 = new Product(1, 'P1', 10, categroyGroup1);
var prod2 = new Product(2, 'P2', 200, categroyGroup2);    				// arr
var prod3 = new Product(3, 'P3', 300, categroyGroup3);
//var prod4 = new Product(4, 'Product4', 400, cat1);              		// check for Error
//prod4.getCategoryNames();

console.log('Product1 price: ', prod1.getPrice());
prod1.setPrice(200);                                                  	// change price
console.log('Product1 price: ', prod1.getPrice());
console.log('Product1 category names: ', prod1.getCategoryNames());   	// check array return for map()
console.log('Product3 category names: ', prod3.getCategoryNames());


// 3) Creating Orders
var order1 = new Order(1);          // p1
var order2 = new Order(2);          // p2, p3
var order3 = new Order(3);          // (p1), p3
var order4 = new Order(4);			// p1, p3 async adding products
console.log('Order1 time: ' + order1.getTime());
order1.updateTime();
console.log('Order1 time2: ' + order1.getTime());

// 4) Adding products to orders synch.
order1.addProduct(prod1);                                             
order2.addProduct(prod2); 
order2.addProduct(prod3);  
order3.addProduct(prod1);
order3.addProduct(prod3);
console.log('Order3 before deleting Product: ' + order3.getProductsAmount());
order3.deleteProductById(1);
console.log('*Order3 after deleting Product: ' + order3.getProductsAmount());

// 5) Orders total price checking
console.log('Order1 Total Price: ' + order1.getTotalPrice());
console.log('Order' + order1.getId() +' Total Price: ' + order1.getTotalPrice());
console.log('Order' + order2.getId() +' Total Price: ' + order2.getTotalPrice());
console.log('Order' + order3.getId() +' Total Price: ' + order3.getTotalPrice());

var ordersForCustomer1 = new Array(order1, order2);

// 6) Creating Customers
var cust1 = new Customer(1, 'Customer1', 'phone1', 'addr1', ordersForCustomer1);           
var cust2 = new Customer(2, 'Customer2', 'phone2', 'addr2', new Array(order3));
cust1.setName(' Customer1ChangedName  ');                
//cust1.setName(22);									 					// test the type checking of Superclass name setter	
//console.log(cust1);
//console.log(cust2);
console.log('*Customer1 changed name: ' + cust1.getName());
console.log('Customer1 orders: ' + cust1.getOrdersId());

// 7) Making purchasements 
cust1.addOrder(order3);
console.log('*Customer1 orders(after adding): ' + cust1.getOrdersId());
console.log('***Customer1 order3(?): ', cust1.getOrderById(3));
cust1.deleteOrderById(3);
console.log('*Customer1 orders(after deleting): ' + cust1.getOrdersId());

// cust1.deleteOrderById(2);
// console.log('*Customer1 orders (after deleting): ' + cust1.getOrdersId());
// cust1.deleteOrderById(1);
// console.log('*Customer1 orders (after deleting): ' + cust1.getOrdersId());
console.log('Customer1 orders: ' + cust1.getOrdersId());

// 8) Customer adding/deleting products to orders 
console.log('Order2 Products: ' + order2.getProductsAmount() + '(' + order2.getProductNames() + ')');
cust1.addProductToOrder(prod1, order2.getId());
cust1.addProductToOrder(prod1, order2.getId());
console.log('*Order2 Products(after adding 2 products): ' + order2.getProductsAmount() + '(' + order2.getProductNames() + ')');

cust1.deleteProductFromOrder(prod1, order2.getId());
console.log('*Order2 Products(after deleting 1 product): ' + order2.getProductsAmount() + '(' + order2.getProductNames() + ')');

console.log('Order1 Products: ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
cust1.addProductToOrder(prod3, order1.getId());
console.log('*Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');

console.log('\n***async***');

// 9) Async 1 CBH (#Customer adding/deleting products to orders)
cust1.addProductToOrderAsync(prod1, order1.getId(), function(err) {
	if(err) {
		console.log(err);		
	}
	else {
		console.log('#Order1 Products(after adding 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
	}
	cust1.deleteProductFromOrderAsync(prod1, order1.getId(), function(err) {
		if(err) {
			console.log(err);		
		}
		else {
			console.log('#Order1 Products(after deleting 1 product): ' + order1.getProductsAmount() + '(' + order1.getProductNames() + ')');
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