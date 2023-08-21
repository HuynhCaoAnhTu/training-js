const navLink = document.getElementById('nav');
console.log(navLink.href);
console.log(navLink.textContent);
navLink.href = 'https://www.wikipedia.org';
navLink.textContent = 'Navigate to Wikipedia';
console.log(navLink);
console.log(navLink.href);
console.log(navLink.textContent);
