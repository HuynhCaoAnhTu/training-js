const demoId = document.getElementById('demo');
const demoClass = document.getElementsByClassName('demo');
const demoTag = document.getElementsByTagName('article');
const demoQuery = document.querySelector('#demo-query');
const demoQueryAll = document.querySelectorAll('.demo-query-all');

demoId.style.border = '1px solid purple';

for (let i = 0; i < demoClass.length; i += 1) {
  demoClass[i].style.border = '1px solid orange';
}

for (let i = 0; i < demoTag.length; i += 1) {
  demoTag[i].style.border = '1px solid blue';
}

demoQuery.style.border = '1px solid red';

demoQueryAll.forEach((query) => {
  query.style.border = '1px solid green';
});
