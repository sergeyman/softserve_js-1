//assert [Modern JS]
// function assert1(expression: any, message: string) {
//   if (!expression)
//     throw {
//       name: "Assertion Exception",
//       message: message
//     };
// }

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
let age: number | string; // union | OR
age = 22;
console.log("age: ", age);
age = "22";
console.log("age: ", age);

// Types Assertion (change types at compile time: <target_type><src_type> value) - not "type casting" - a runtime support
let str = '1';
let str1: number = <number><any> str;
console.log(typeof(str1));
console.assert((typeof(str1) === 'number'), 'str1 must be a number.');

let tas: unknown = 'hello';
console.log('hello.length: ', (<string>tas).length);

// Force TypeCasting (to override type errors on casting)
//console.log(((tas as unknown) as number).length)

// Arrays
const names: string[] = []; //SyntaxError: Missing initializer in const declaration
//let names: string[] = [];
//const names: readonly string[] = ["A"]; // no push
names.push("A"); // names.push(3);	// Error
console.log(names);

const numbers = [1, 2, 3];

// Tuples
let tuple1: [number, boolean, string]; // define
tuple1 = [5, false, "Coding God was here"]; // init correctly,
//tuple1 = [5, false, 'Coding God was here', 5];		// Error to add anything else
tuple1.push("Smth. more"); // Error no type safety for indexes 3+
tuple1.push(235); // ? No Error
console.log(tuple1); // ? No Error

//const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'The Real Coding God'];
//ourReadonlyTuple.push('Coding God took a day off');	    // throws error as it is readonly.

const graph: [x: number, y: number] = [22.3, 23.3]; // Named Tuple (provide more ctxt for our index values represent)
console.log(graph);

//const graph: [number, number] = [55.2, 32.3];
const [x, y] = graph;
console.log(`x, y = ${x}, ${y}`);

// TypeScript Object Types
const car1 = {
    type: "Toyota",
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

const car: {
  type: string;
  mileage?: number;
} = {
  // No Error (with optional property)
  type: "Toyota",
};
car.mileage = 2000;

// Indexed signatures can be used for objects without a defined list of properties. (expressed with utility types like Record<string, number>)
const nameAgeMap: {
  [index: string]: number;
} = {};
nameAgeMap.Jack = 25;
//nameAgeMap.Mark = "Fifty";      // TypeError

// An enum is a special "class" that represents a group of constants (unchangeable variables). <string and numeric>
enum CardinalDirections {
  North,
  East,
  South,
  West,
}
let curDirection = CardinalDirections.North;
console.log(curDirection); // 0

// Functions
function printStatusCode(code: string | number): void {
  console.log(`My status code is ${code}.`);
  //console.log(`My status code is ${code.toUpperCase()}.`) // error: Property 'toUpperCase' does not exist ontype 'string | number'.
}
printStatusCode(404);
printStatusCode("404");

function getTime(): string {
  return new Date().toLocaleDateString();
}
console.log(getTime());

function calcOptional(a: number, b: number, c?: number): number {
  // optional params
  return a + b + (c || 0);
}
console.log(calcOptional(1, 2));
console.log(calcOptional(1, 2, 3));

function pow(value: number, exponent: number = 10) {
  // default parameters
  return value ** exponent;
}
console.log(pow(2));
console.log(pow(2, 3));

function divide({ dividend, divisor }: { dividend: number; divisor: number }) {
  // named params
  return dividend / divisor;
}
console.log("divide: ", divide({ dividend: 224, divisor: 10 }));

function addWtihRest(a: number, b: number, ...rest: number[]) {
  // rest params - array
  return a + b + rest.reduce((p, c) => p + c, 0);
}
console.log("Rest params: ", addWtihRest(3, 4, 5, 6, 7));

type Negate = (value: number) => number; // alias as function types
const negateFunction: Negate = (value) => value * -1;
console.log("Negate: ", negateFunction(22));

// Type cast (as, <>)
let x1: unknown = "hello";
console.log((x1 as string).length);
console.log((<string>x1).length);

let x2 = "hello";
//console.log(((x2 as unknown) as number).length);             // x is not actually a number so it return undefined

// TS Classes (Memebers: Types, Visibility, Parameter Properties - members in constructor by vis. modifiers to params, Readonly)
class Greeting {
  //private name: string;
  private readonly name: string;
  // public constructor(private name: string) {                    // TS convinient way to define class members in the constructor
  public constructor(name: string) {
    this.name = name;
  }
  public getName(): string {
    return this.name;
  }
  public greet(): void {
    console.log(`Hello ${this.getName()}!`);
  }
}
var obj = new Greeting("Sergei");
obj.greet();

// Iheritance: Extends
class Shape {
  area: number

  constructor(a: number) {
    this.area = a;
  }
}

class Circle extends Shape {
  disp(): void {
    console.log('Area of the circel: ', this.area);
  }
}
let circle = new Circle(323);
circle.disp();

// Iheritance: Extends Multi-level, Method Overriding, Static Keyword
class Root {
  strr: string;
  static num: number = 1;

  constructor(s: string) {
    this.strr = s;
  }
  method1(): void {
    console.log('method1() from Parent called...');
  }
  static disp(): void {
    console.log('The value of num is', Root.num);
  }
}
class Child extends Root{};
class Leaf extends Child{
  method1(): void {
    super.method1();                    // call method from Parent
    console.log('method1() from Child called...');
  }
};
let l1 = new Leaf('a');
l1.strr = "hello";
console.log(l1.strr);
l1.method1();
let r1 = new Root('Root');
r1.method1();
Root.disp();

//console.assert(((l1 instanceof Root) === true), 'l1 must be instance of Leaf'); 

// Iheritance: Extends, Implements, Override
interface IShape {
  getArea: () => number;
}

class Rectangle implements IShape {
  public constructor(
    protected readonly width: number, 
    protected readonly height: number
    ) {}
  public getArea(): number {
    return this.width * this.height;
  }

  public toString(): string {
    return `Rectangle[width=${this.width}, height=${this.height}]`;
  }
}

class Square extends Rectangle {
  public constructor(width: number) {
    super(width, width);
  }
  // getArea() gets inherited from Rectangle

  //override
  public toString(): string {
    return `Square[width=${this.width}]`;
  }
}
const sq1 = new Square(20);
console.log('square1 area: ', sq1.getArea());
console.log('square1: ', sq1.toString());

// Abstract classes - to use as base class without having to implement all members
abstract class APolygon {
  public abstract getArea(): number;

  public toString(): string {
    return `Polygon[area=${this.getArea()}]`;
  }
}

class RectangleA extends APolygon {
  public constructor(
    protected readonly width: number, 
    protected readonly height: number
    ) {
      super();
    }
  public getArea(): number {
    return this.width * this.height;
  }
}
const rectA = new RectangleA(10, 20);
console.log('rectA (from abstract) area: ', rectA.getArea());

// Inheritance: An interface can be extended by other interfaces. In other words, an interface can inherit from other interface. Typescript allows an interface to inherit from multiple interfaces.
interface IPerson {
  firstName: string,
  lastName: string,
  sayHi: () => string
  commandLine: string[] | string | (() => string);    // Union Type and Interface
}
let customer: IPerson = {
  firstName: "Tom",
  lastName: "Hanks",
  sayHi: ():string => {return "Hi there"},
  commandLine: "Hello1"
}
console.assert((customer.sayHi() === "Hi there"), 'customer.sayHi() should return "Hi there"');

let customer2: IPerson = {firstName: "Bob", lastName: "Dilan", commandLine: "Hello2", sayHi: (): string => {return "Hi customer2"}};
//console.log(customer2.commandLine);
console.assert((customer2.commandLine === "Hello2"), 'customer2.commandLine should return "Hello2"');
console.log(customer2.sayHi());

// Interfaces with Arrays (To define both K, V types)
interface INameList {
  [index: number]: string
}
let list2: INameList = ["John", '1', "Bran"];

interface IAge { 
  [index: string]: number
}
let ageList: IAge;
//ageList["John"] = 12;     // Error ?

// Interfaces and Inheritance (An I. can be extended/inherit by other I). TS allows an I. to inherit from multiple interfaces
interface IMusician extends IPerson {     // Simple Interface inheritance
  instrument: string
}
let drummer = <IMusician>{}
drummer.firstName = "Edmond"
drummer.instrument = "Drums"
console.log(drummer);

interface IParent1 {            // Multiple Interface Inheritance
  v1: number
}

interface IParent2 {
  v2: number
}

interface Child2 extends IParent1, IParent2 {}
let Iobj1: Child2 = {v1: 10, v2: 20};
console.log('value1: ', Iobj1.v1, ', value2: ', Iobj1.v2);


// Implementing interfaces (syntactical contract the entitiy should configm to). Define properties, methods, events declaration.
// It helps in providing  a standars structure that the deriving classes would follow. Considering the signatures
interface ILoan {
  interest: number;
}
class AgriLoan implements ILoan {
  interest: number;
  rebate: number;

  constructor(interest: number, rebate: number) {
    this.interest = interest;
    this.rebate = rebate;
  }
}
let al = new AgriLoan(10, 1);
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
