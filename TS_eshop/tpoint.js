//assert [Modern JS]
// function assert1(expression: any, message: string) {
//   if (!expression)
//     throw {
//       name: "Assertion Exception",
//       message: message
//     };
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// var radius = 15;
// assert1((typeof radius == 'number'), 'The radius must be a number.');
// const volume = (4/3) * Math.PI * Math.pow(radius, 3);
// assert1((!isNaN(volume)), 'The volume is not number.');
// var radius = 20;
// console.assert((typeof radius == 'number'), 'The radius must be a number.');
// const volume2 = (4/3) * Math.PI * Math.pow(radius, 3);
// console.assert((!isNaN(volume2)), 'The volume2 is not number.');
// W3shools
// Types
var age; // union | OR
age = 22;
console.log("age: ", age);
age = "22";
console.log("age: ", age);
// Types Assertion (change types at compile time: <target_type><src_type> value) - not "type casting" - a runtime support
var str = '1';
var str1 = str;
console.log(typeof (str1));
console.assert((typeof (str1) === 'number'), 'str1 must be a number.');
var tas = 'hello';
console.log('hello.length: ', tas.length);
// Force TypeCasting (to override type errors on casting)
//console.log(((tas as unknown) as number).length)
// Arrays
var names = []; //SyntaxError: Missing initializer in const declaration
//let names: string[] = [];
//const names: readonly string[] = ["A"]; // no push
names.push("A"); // names.push(3);	// Error
console.log(names);
var numbers = [1, 2, 3];
// Tuples
var tuple1; // define
tuple1 = [5, false, "Coding God was here"]; // init correctly,
//tuple1 = [5, false, 'Coding God was here', 5];		// Error to add anything else
tuple1.push("Smth. more"); // Error no type safety for indexes 3+
tuple1.push(235); // ? No Error
console.log(tuple1); // ? No Error
//const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'The Real Coding God'];
//ourReadonlyTuple.push('Coding God took a day off');	    // throws error as it is readonly.
var graph = [22.3, 23.3]; // Named Tuple (provide more ctxt for our index values represent)
console.log(graph);
//const graph: [number, number] = [55.2, 32.3];
var x = graph[0], y = graph[1];
console.log("x, y = ".concat(x, ", ").concat(y));
// TypeScript Object Types
var car1 = {
    type: "Toyota"
};
car1.type = "Ford"; // no error
//car1.type = 2; // Error: Type 'number' is not assignable to type 'string'.
//   const car: {
//       type: string,
//       mileage: number
//     } = { // Error: Property 'mileage' is missing in type '{ type: string; }' but required in type '{ type: string; mileage: number; }'.
//     type: "Toyota",
//   };
//   car.mileage = 2000;
var car = {
    // No Error (with optional property)
    type: "Toyota"
};
car.mileage = 2000;
// Indexed signatures can be used for objects without a defined list of properties. (expressed with utility types like Record<string, number>)
var nameAgeMap = {};
nameAgeMap.Jack = 25;
//nameAgeMap.Mark = "Fifty";      // TypeError
// An enum is a special "class" that represents a group of constants (unchangeable variables). <string and numeric>
var CardinalDirections;
(function (CardinalDirections) {
    CardinalDirections[CardinalDirections["North"] = 0] = "North";
    CardinalDirections[CardinalDirections["East"] = 1] = "East";
    CardinalDirections[CardinalDirections["South"] = 2] = "South";
    CardinalDirections[CardinalDirections["West"] = 3] = "West";
})(CardinalDirections || (CardinalDirections = {}));
var curDirection = CardinalDirections.North;
console.log(curDirection); // 0
// Functions
function printStatusCode(code) {
    console.log("My status code is ".concat(code, "."));
    //console.log(`My status code is ${code.toUpperCase()}.`) // error: Property 'toUpperCase' does not exist ontype 'string | number'.
}
printStatusCode(404);
printStatusCode("404");
function getTime() {
    return new Date().toLocaleDateString();
}
console.log(getTime());
function calcOptional(a, b, c) {
    // optional params
    return a + b + (c || 0);
}
console.log(calcOptional(1, 2));
console.log(calcOptional(1, 2, 3));
function pow(value, exponent) {
    if (exponent === void 0) { exponent = 10; }
    // default parameters
    return Math.pow(value, exponent);
}
console.log(pow(2));
console.log(pow(2, 3));
function divide(_a) {
    var dividend = _a.dividend, divisor = _a.divisor;
    // named params
    return dividend / divisor;
}
console.log("divide: ", divide({ dividend: 224, divisor: 10 }));
function addWtihRest(a, b) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    // rest params - array
    return a + b + rest.reduce(function (p, c) { return p + c; }, 0);
}
console.log("Rest params: ", addWtihRest(3, 4, 5, 6, 7));
var negateFunction = function (value) { return value * -1; };
console.log("Negate: ", negateFunction(22));
// Type cast (as, <>)
var x1 = "hello";
console.log(x1.length);
console.log(x1.length);
var x2 = "hello";
//console.log(((x2 as unknown) as number).length);             // x is not actually a number so it return undefined
// TS Classes (Memebers: Types, Visibility, Parameter Properties - members in constructor by vis. modifiers to params, Readonly)
var Greeting = /** @class */ (function () {
    // public constructor(private name: string) {                    // TS convinient way to define class members in the constructor
    function Greeting(name) {
        this.name = name;
    }
    Greeting.prototype.getName = function () {
        return this.name;
    };
    Greeting.prototype.greet = function () {
        console.log("Hello ".concat(this.getName(), "!"));
    };
    return Greeting;
}());
var obj = new Greeting("Sergei");
obj.greet();
// Iheritance: Extends
var Shape = /** @class */ (function () {
    function Shape(a) {
        this.area = a;
    }
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.disp = function () {
        console.log('Area of the circel: ', this.area);
    };
    return Circle;
}(Shape));
var circle = new Circle(323);
circle.disp();
// Iheritance: Extends Multi-level, Method Overriding, Static Keyword
var Root = /** @class */ (function () {
    function Root(s) {
        this.strr = s;
    }
    Root.prototype.method1 = function () {
        console.log('method1() from Parent called...');
    };
    Root.disp = function () {
        console.log('The value of num is', Root.num);
    };
    Root.num = 1;
    return Root;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Child;
}(Root));
;
var Leaf = /** @class */ (function (_super) {
    __extends(Leaf, _super);
    function Leaf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Leaf.prototype.method1 = function () {
        _super.prototype.method1.call(this); // call method from Parent
        console.log('method1() from Child called...');
    };
    return Leaf;
}(Child));
;
var l1 = new Leaf('a');
l1.strr = "hello";
console.log(l1.strr);
l1.method1();
var r1 = new Root('Root');
r1.method1();
Root.disp();
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.getArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.toString = function () {
        return "Rectangle[width=".concat(this.width, ", height=").concat(this.height, "]");
    };
    return Rectangle;
}());
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(width) {
        return _super.call(this, width, width) || this;
    }
    // getArea() gets inherited from Rectangle
    //override
    Square.prototype.toString = function () {
        return "Square[width=".concat(this.width, "]");
    };
    return Square;
}(Rectangle));
var sq1 = new Square(20);
console.log('square1 area: ', sq1.getArea());
console.log('square1: ', sq1.toString());
// Abstract classes - to use as base class without having to implement all members
var APolygon = /** @class */ (function () {
    function APolygon() {
    }
    APolygon.prototype.toString = function () {
        return "Polygon[area=".concat(this.getArea(), "]");
    };
    return APolygon;
}());
var RectangleA = /** @class */ (function (_super) {
    __extends(RectangleA, _super);
    function RectangleA(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    RectangleA.prototype.getArea = function () {
        return this.width * this.height;
    };
    return RectangleA;
}(APolygon));
var rectA = new RectangleA(10, 20);
console.log('rectA (from abstract) area: ', rectA.getArea());
var customer = {
    firstName: "Tom",
    lastName: "Hanks",
    sayHi: function () { return "Hi there"; },
    commandLine: "Hello1"
};
console.assert((customer.sayHi() === "Hi there"), 'customer.sayHi() should return "Hi there"');
var customer2 = { firstName: "Bob", lastName: "Dilan", commandLine: "Hello2", sayHi: function () { return "Hi customer2"; } };
//console.log(customer2.commandLine);
console.assert((customer2.commandLine === "Hello2"), 'customer2.commandLine should return "Hello2"');
console.log(customer2.sayHi());
var list2 = ["John", '1', "Bran"];
var ageList;
var drummer = {};
drummer.firstName = "Edmond";
drummer.instrument = "Drums";
console.log(drummer);
var Iobj1 = { v1: 10, v2: 20 };
console.log('value1: ', Iobj1.v1, ', value2: ', Iobj1.v2);
var AgriLoan = /** @class */ (function () {
    function AgriLoan(interest, rebate) {
        this.interest = interest;
        this.rebate = rebate;
    }
    return AgriLoan;
}());
var al = new AgriLoan(10, 1);
console.log('Interst is: ', al.interest, ' Rebate is: ', al.rebate);
// // Generics (type variables) can be used to create classes, functions & type aliases
// // that do not need to explicitly define the used types
// // Тип определяется на этапе выполнения (не компиляции)
// // Used to write reusable code
// // G. Functions
// function createPair<S, T>(v1: S, v2: T): [S, T] {
//   return [v1, v2];
// }
// console.log(createPair<string, number>('hello', 42));   // ['hello', 42]
// console.log(createPair<number, string>(42, 'hello'));   // [42, 'hello']
// // G. Classes (to create generalized classes like Map)
// //class NamedValue<T> {
// class NamedValue<T = string> {         // default value
//   private __value: T | undefined;
//   constructor(private name: string) {}
//   public setValue(value: T) {
//     this.__value = value;
//   }
//   public getValue(): T | undefined {
//     return this.__value;
//   }
//   public toString(): string {
//     return  `${this.name}: ${this.__value}`;
//   }
// }
// let value1 = new NamedValue<number>('myNumber');
// value1.setValue(23);
// //value1.setValue('23');
// console.log('value1: ', value1.toString());
// // G. Type Aliases - to create more reusable types
// type Wrapped<T> = { value: T };
// const wrappedValue: Wrapped<number> = { value: 10 };
// // G. Extends - constraints to limit/specify more the using generic type
// function createLoggedPairExt<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {
//   console.log(`creating pair: v1='${v1}, v2='${v2}'`);
//   return [v1, v2];
// }
/*
npm install --save-dev ts-node nodemon
//
nodemon app.ts
*/
