// Function to modify the text content of the paragraph
const button = document.querySelector('button');
const changeText = () => {
  const p = document.querySelector('p');

  p.textContent = 'I changed because of an event handler property.';
};

const alertText = () => {
  alert('Will I alert?');
};

// Events can be overwritten
button.onclick = changeText;
button.onclick = alertText;

// Add event handler as a property of the button element
button.addEventListener('click', changeText);
button.addEventListener('click', alertText);
