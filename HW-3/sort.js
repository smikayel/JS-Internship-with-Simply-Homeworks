//█▀ █░█ █▄▄ ░░█ █▀█ █▀▀ ▀█▀
//▄█ █▄█ █▄█ █▄█ ██▄ █▄▄ ░█░
//============================================================
// Sorting without comparison of elements
// All the elements in the array are integers

    // const sort = (input) => {
    //     // your code
    //   };


// █▀ █▀█ █░░ █░█ ▀█▀ █ █▀█ █▄░█
// ▄█ █▄█ █▄▄ █▄█ ░█░ █ █▄█ █░▀█
//============================================================
const sorting = (arr) => {
    /*
    We will create arrays for negative values and positive ,
    each element of our array will be the index in new array ...
    */
    const sorted = [];
    const negativeArray = [];
    const positiveArray = [];

    for (let el of arr){
        if (String(el).includes('-')){
            if (Object.keys(negativeArray).includes(`${-el}`)){
                negativeArray[-el]  += 1;
            }
            else
                negativeArray[-el]  = 1;
        } else {
            if (Object.keys(positiveArray).includes(`${el}`))
                positiveArray[el]  += 1;
            else
                positiveArray[el]  = 1;
        }
    }
    for (let el of Object.keys(negativeArray).reverse()){
        while (negativeArray[el]--){
            sorted.push(-el);
        }
    }
    for (let el of Object.keys(positiveArray)){
        while (positiveArray[el]--){
            sorted.push(+el);
        }
    }
    return sorted;
}

const sort = (input) => {
    /*
    First we will check validation of input (array or not...).
    */
    // your code
    if (!Array.isArray(input))
        throw new TypeError("Input is not array ! (Need array with integers.)");
    const clone = [...input];
    return (sorting(clone));
};

//============================================================
const arr = [-10, -87,-87,-3, -3 , 5, 5, 4, 78, 65, 0];
console.log("Original >>", JSON.stringify(arr)); // [-10, -87,-87,-3, -3 , 5, 5, 4, 78, 65, 0];
console.log("Sorted >>", JSON.stringify(sort(arr))); // [ -87,  -87, -10, -3, -3, 0, 4, 5, 5, 65, 78];
console.log(sort({})); // TypeError: Input is not array ! (Need array with integers.)