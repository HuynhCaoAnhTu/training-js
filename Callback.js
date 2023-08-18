// ------Callback Settimeout -------
function delayedMessage(message, delay, callback) {
  setTimeout(() => {
    callback(message);
  }, delay);
}

function showMessage(msg) {
  console.log('Thông báo:', msg);
}

delayedMessage('Xin chào!', 2000, showMessage);

// ------Callback Create Person -------
function createPerson(name, age, callback) {
  const person = {
    name,
    age,
  };
  callback(person);
}

function displayPersonInfo(person) {
  console.log('Tên:', person.name);
  console.log('Tuổi:', person.age);
}

createPerson('Alice', 30, displayPersonInfo);
