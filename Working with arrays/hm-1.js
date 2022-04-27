// ==============================
// Don't touch
// ==============================
Array.prototype.forEach = null;
Array.prototype.map = null;
// ==============================

// Implement these methods


Array.prototype.find = function(callback, thisArg) {
    // implementation
    let length = this.length
    for (let index = 0; index < length; index++) {
      if (callback.call(thisArg, this[index], index, this))
        return this[index];
    };
};

Array.prototype.findIndex = function (callback, thisArg) {
    // implementation
    let index = 0;

    while (index < this.length){
        if(callback.call(thisArg, this[index], index, this))
            return index;
        index++;
    }
    return -1;
};

Array.prototype.lastIndexOf = function (searchElement, fromIndex=this.length) {
    // implementation
    let index = fromIndex - 1;

    while (index >= 0){
        if(searchElement === this[index])
            return index;
        index--;
    }
    return -1;
};

Array.prototype.some = function (callback, thisArg) {
    // implementation
    let index = 0;

    while (index < this.length){
        if (callback.call(thisArg, this[index], index, this))
            return true;
        index++;
    }
    return false;
};

Array.prototype.every = function (callback, thisArg) {
    // implementation
    let index = 0;

    while (index < this.length){
        if (!callback.call(thisArg, this[index], index, this))
            return false;
        index++;
    }
    return true;
};

Array.prototype.reduce = function (callback, accumliator) {
    // implementation
    let index = 0;

    for (let el of this){
        accumliator = callback(accumliator, el, index, this);
        index++;
    }
    return accumliator;
};

Array.prototype.reduceRight = function (callback, accumliator) {
    // implementation
    let index = this.length - 1;

    while (index >= 0){
        accumliator = callback(accumliator, this[index], index, this);
        index--;
    }
    return accumliator;
};


Array.prototype.join = function (separator = "") {
    // implementation
    let index = 1;
    let joined = this[0];

    if (!joined)
        return "";
    while (index < this.length){
        joined += separator + this[index];
        index++;
    }
    return joined;
};

Array.prototype.pop = function () {

    var arrLength = this.length;
    var deleteObj = this[arrLength - 1];
    if (this.length !== 0)
        this.length = arrLength - 1;
        return deleteObj;
};

Array.prototype.unshift = function () {
    // implementation
    let tmp = [...this];
    let j = 0;
    let index = 0;

    while (index < arguments.length){
        this[index] = arguments[index];
        index++;
    }
    while (j < tmp.length){
        this[index] = tmp[j];
        j++;
        index++;
    }
    return index;
};
