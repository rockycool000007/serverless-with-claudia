
class Identifier {
    
    static get counter() {
        if(!this.hasOwnProperty('_counter')) {
            this._counter = 0;
        }
        return this._counter;
    }

    static set counter(value) {
        return this._counter = value;
    }

    static increment() {
        if(!this._counter) this._counter = 0;
        this._counter = this._counter + 1;
        return this._counter;
    }

    static reset(value) {
        this._counter = this._counter + 1;
    }
}

module.exports = Identifier;
