const changeBackground = () => {
  const body = document.getElementsByTagName("body")[0];
  const p = body.getElementsByTagName("p");
  p[0].style.background = "red";
  p[1].style.background = "green";
};
const button = document.querySelector("button");
button.onclick = changeBackground;
