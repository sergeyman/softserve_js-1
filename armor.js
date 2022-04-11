// ES6 classes

class Armor {
    constructor(body, boots) {	// constructor inside class for arguments
        this._body = body;
        this._boots = boots;
    }
    setBody(body) {			// не нужно писать Armor.prototype. Сами записвываются в прототип
        this._body = body;
    }
    getBody() {
        return this._body;
    } 
    set boots(boots) {
        this._boots = boots;
    }
    get boots() {
        return this._boots;
    }
    get armor() {
        return `Your body is - ${this._body}, \nYour boots are - ${this._boots}`;	// `` - обратные кавычки	
    
}
//export default Armor;

//const armor = new Armor('body', 'boots'); 
let armor = new Armor('body', 'boots');