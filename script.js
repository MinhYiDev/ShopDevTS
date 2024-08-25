/* eslint-disable no-undef */
function findIndex(arr, index, defaultValue) {
    console.log(arr[index]);
    return arr[index] ?? defaultValue;
}

const arr = [1, 2, 3];

const obj = {
    a: 1,
    b: 2,
    c: 3,
};

console.log(Object.assign(obj, { a: 2 }));

Object.freeze(obj);

for (let i of arr) {
    console.log(i);
}

const module = {
    x: 42,
    getX: function () {
        return this.x;
    },
};

const _module = Object.freeze(module);

const _bind = _module.getX.bind(module);

console.log(_bind());

function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = "food";
}

console.log(Object.values(obj));

console.log(Object.entries(obj));

const _arr = [1, 2, 3, 4, 5, 6];

let index = 0;
_arr.forEach((i) => {
    index += i;
});

console.log(index);

const beasts = ["ant", "bison", "camel", "duck", "bison"];

console.log(beasts.indexOf("bison"));
// Expected output: 1

// Start from index 2
console.log(beasts.indexOf("bison", 2));
// Expected output: 4

console.log(beasts.indexOf("giraffe"));
// Expected output: -1

let items = ["apple", "banana", "orange", "banana", "orange", "apple", "apple"];

// indexOf => 1 and indexOf -1

const rs = items.map((fruit, index, arr) => {
    return `<h1>Hello</h1>`;
});
console.log(rs);
