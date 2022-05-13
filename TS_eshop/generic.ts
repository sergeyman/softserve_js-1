// Generics (type variables) can be used to create classes, functions & type aliases
// that do not need to explicitly define the used types
// Тип определяется на этапе выполнения (не компиляции)
// Used to write reusable code

// G. Functions
function createPair<S, T>(v1: S, v2: T): [S, T] {
    return [v1, v2];
}
console.log(createPair<string, number>('hello', 42));   // ['hello', 42]
console.log(createPair<number, string>(42, 'hello'));   // [42, 'hello']

// G.- Arrays (Уже параметризирован, как и Promise)
function getString<T>(arg: Array<T>): string {
    return arg.join(", ");
}
let tArr: string = getString<number>( [1, 2, 343, 5]);
console.log('Typed array: ', tArr);

let myArr: Array<number> = [1, 2, 3];
let myArr2: Array<number> = new Array(1, 2, 3);

// G. Classes (to create generalized classes like Map)
class NamedValue<T> {
//class NamedValue<T = string> {         // default value
    private __value: T | undefined;

    constructor(private name: string) { }

    public setValue(value: T) {
        this.__value = value;
    }
    public getValue(): T | undefined {
        return this.__value;
    }
    public toString(): string {
        return `${this.name}: ${this.__value}`;
    }
}
let value1 = new NamedValue<number>('myNumber');
value1.setValue(23);
//value1.setValue('23');
console.log('value1: ', value1.toString());

// G. Interfaces
interface IUser<T> {
    getId(): T;
}
class GUser<T> implements IUser<T> {
    private __id: T;
    constructor(id: T) {
        this.__id = id;
    }
    getId(): T {
        return this.__id;
    }
}
let gUser1 = new GUser<number>(15);
console.log(gUser1.getId());

// G. Type Aliases - to create more reusable types
type Wrapped<T> = { value: T };
const wrappedValue1: Wrapped<number> = { value: 10 };
const wrappedValue2: Wrapped<string> = { value: 'string'};
const wrappedValue3: Wrapped<Wrapped<string>> = { value: { value: 'string' } };
wrappedValue3.value.value;

// Array - generic by default
let arrObj: Array<Wrapped<number>> = [{ value: 10 }, { value: 20 }]; 

// G. Extends - constraints to limit/specify more the using generic type
function createLoggedPairExt<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {
    console.log(`creating pair: v1='${v1}, v2='${v2}'`);
    return [v1, v2];
}
createLoggedPairExt(22, '33');
createLoggedPairExt('22', 33);

// Декораторы - ф-ии принимающие опред. кол-во параметров
// Декларативное программирование - добавление метаданных
// к классам и методам меняющих их повдедение без изменения кода
// tsconfig.json: experimentalDecorators
// > tsc app.ts ES5 --experimentalDecorators

// D. Classes
// sealed - запрет наследования
function sealed(constructor: Function) {
    console.log("sealed decorator");
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed 
class SUser {
    private __name: string;
    constructor(name: string) {
        this.__name = name;
    }
    print(): void {
        console.log(this.__name);
    }
}
// Uncaught TypeError: Cannot define property age, object is not extensible
// Object.defineProperty(SUser, 'age', {
//     value: 18,
// });
// let sUser = new SUser('A');
// console.log(sUser.age);

// D. constructor

// D. methods
// function decorator(target_constructor: any, 
//     propertyNameOfMethod: string,
//     decriptorObject: PropertyDescriptor
// );
function readable(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false;
}
class DUser {
    private __name: string;
    constructor(name: string) {
        this.__name = name;
    }

    @readable
    print(): void {
        console.log(this.__name);
    }
}
let dTom = new DUser('Tom');
// dTom.print = function() {
//     console.log('print has been changed');
// }
dTom.print();

// D. parameters
function readable(onlyRead : boolean){ 
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.writable = !onlyRead;
    };
}
 
class RUser { 
    name: string;
    constructor(name: string){
        this.name = name;
    }
 
    @readable(false)
    print():void{
        console.log(this.name);
    }
}
let tom = new RUser("Tom");
tom.print = function(){console.log("print has been changed");}
tom.print();  // Tom

// D. parameters of methods and returned values
function log(target: Object, method: string, descriptor: PropertyDescriptor){
    console.log();
    let originalMethod = descriptor.value;
    descriptor.value = function(...args: number[]){
        console.log(JSON.stringify(args));
        let returnValue = originalMethod.apply(this, args);
        console.log(`${JSON.stringify(args)} => ${returnValue}`)
        return returnValue;
    }
} 
class DCalculator{ 
    @log
    add(x: number, y: number): number{
        return x + y;
    }
} 
let calc = new DCalculator();
let z = calc.add(4, 5);
z = calc.add(6, 7);

// D. of methods parameters
function logParameter(target: any, key : string, index : number) {
    var metadataKey = `__log_${key}_parameters`;     
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
      }
      else {
        target[metadataKey] = [index];
    }
}
function logMethod(target: any, key: string, descriptor: PropertyDescriptor) { 
    var originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) { 
        var metadataKey = `__log_${key}_parameters`;
        var indices = target[metadataKey];
 
        if (Array.isArray(indices)) { 
            for (var i = 0; i < args.length; i++) { 
         
                if (indices.indexOf(i) !== -1) { 
                    var arg = args[i];
                    var argStr = JSON.stringify(arg) || arg.toString();
                    console.log(`${key} arg[${i}]: ${argStr}`);
                }
            }
            var result = originalMethod.apply(this, args);
            return result;
        }
        else {
            var a = args.map(a => (JSON.stringify(a) || a.toString())).join();
            var result = originalMethod.apply(this, args);
            var r = JSON.stringify(result);
            console.log(`Call: ${key}(${a}) => ${r}`);
            return result;
        }
    }
    return descriptor;
}
 
class DMUser { 
    private name: string;
    constructor(name: string){
        this.name = name;
    }
   @logMethod
    setName(@logParameter name: string){
        this.name = name;
    }
    print():void{
        console.log(this.name);
    }
}
let dmTom = new DMUser("Tom");
dmTom.setName("Bob");
dmTom.setName("Sam");

// D. of properties
function format(target: Object, propertyKey: string){    
    let _val = this[propertyKey];   // получаем значение свойства
    //let _val = this.propertyKey;
    // геттер
    var getter = function () {
        return "Mr./Ms." + _val;
    };
 
    // сеттер
    var setter = function (newVal: string) {
        _val = newVal;
    };
 
    // удаляем свойство
    if (delete this[propertyKey]) {
 
        // И создаем новое свойство с геттером и сеттером
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}

class PUser {
    @format
    name: string;
    constructor(name: string){
        this.name = name;
    }
    print():void{
        console.log(this.name);
    }
}
let pTom = new PUser("Tom");
pTom.print();
pTom.name = "Tommy";
pTom.print();

// D. of access methods
function validator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldSet = descriptor.set;
 
    //console.log();  // 1 time!!!
    descriptor.set = function(value: string) {
        if (value === "admin") {
            throw new Error("Invalid value");
        }
		if(oldSet!==undefined) oldSet.call(this, value);
    }
}
class AMUser { 
    private __name: string;
    constructor(name: string){
        this.__name = name;
    }     
    public get name(): string {
        return this.__name;
    }
    @validator
    public set name(n: string) {
        this.__name = n;
    }
}
let amTom = new AMUser("Tom");
console.log(amTom.name);
amTom.name= "admin";
console.log(amTom.name);