const p = document.getElementsByTagName('p')[0];
const ul = document.getElementsByTagName('ul')[0];

console.log(p.parentNode);
console.log(p.parentNode.parentNode);
console.log(ul.childNodes);
ul.firstElementChild.style.background = 'yellow';
document.body.children[3].lastElementChild.style.background = 'fuchsia';
const tiger = ul.children[1];
console.log(tiger);
tiger.nextElementSibling.style.background = 'coral';
tiger.previousElementSibling.style.background = 'aquamarine';
