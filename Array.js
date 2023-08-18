const a = [];
a.push(4);
a.unshift(0);
a.unshift(-2, -1);
console.log(a);

a.pop();
a.shift();
console.log(a);

const b = [1, 2];
const c = a.concat(b);
console.log(c);

// ----find()-------
const products = [
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' },
];
const targetProductId = 2;
const targetProduct = products.find((product) => product.id === targetProductId);
console.log(targetProduct);

// ----findIndex()-------
const index = c.findIndex((number) => number === 2);
console.log(index);

// ----includes()-------
if (a.includes(0)) {
  console.log('Chuỗi con được tìm thấy trong chuỗi chính.');
} else {
  console.log('Chuỗi con không tồn tại trong chuỗi chính.');
}
