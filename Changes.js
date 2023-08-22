const paragraph = document.createElement('p');
paragraph.textContent = "I'm a brand new paragraph.";
console.log(paragraph);
paragraph.innerHTML = "I'm a paragraph with <strong>bold</strong> text.";
const text = document.createTextNode("I'm a new text node.");
console.log(text);
// insert at the end of list
const todoList = document.querySelector('ul');
const newTodo = document.createElement('li');
newTodo.textContent = 'Do homework';
todoList.appendChild(newTodo);
// insert at the start of list
const anotherTodo = document.createElement('li');
anotherTodo.textContent = 'Pay bills';
todoList.insertBefore(anotherTodo, todoList.firstElementChild);
// modified
const modifiedTodo = document.createElement('li');
modifiedTodo.textContent = 'Feed the dog';
todoList.replaceChild(modifiedTodo, todoList.children[2]);
// Remove Nodes
todoList.removeChild(todoList.lastElementChild);
todoList.children[1].remove();
