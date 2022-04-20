// ==============================
// Don't touch
// ==============================
Array.prototype.forEach = null;
Array.prototype.map = null;
// ==============================

// Implement these methods


Array.prototype.find = function (callback) {
    // implementation
    let index = 0;
  
    while (index < this.length){
        if(callback(this[index], index, this))
            return this[index];
        index++;
    }
    return undefined;
};

Array.prototype.findIndex = function (callback) {
    // implementation
    let index = 0;

    while (index < this.length){
        if(callback(this[index], index, this))
            return index;
        index++;
    }
    return -1;
};

Array.prototype.lastIndexOf = function (callback) {
    // implementation
    let index = this.length;

    while (index >= 0){
        if(callback(this[index], index, this))
            return index;
        index--;
    }
    return -1;
};

Array.prototype.some = function (callback) {
    // implementation
    let index = 0;

    while (index < this.length){
        if (callback(this[index], index, this))
            return true;
        index++;
    }
    return false;
};

Array.prototype.every = function (callback) {
    // implementation
    let index = 0;

    while (index < this.length){
        if (!callback(this[index], index, this))
            return false;
        index++;
    }
    return true;
};

Array.prototype.reduce = function (callback, accumliator) {
    // implementation
    let index = 0;

    while (index < this.length){
        accumliator = callback(accumliator, this[index], index, this);
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

Array.prototype.join = function (separator) {
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
    // implementation
    return this.splice(this.length-1, 1)[0]
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