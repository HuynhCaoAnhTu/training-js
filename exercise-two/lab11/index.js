var pics = [{
  src: "http://farm4.staticflickr.com/3691/11268502654_f28f05966c_m.jpg",
  width: "240",
  height: "160",
}, {
  src: "http://farm1.staticflickr.com/33/45336904_1aef569b30_n.jpg",
  width: "320",
  height: "195",
}, {
  src: "http://farm6.staticflickr.com/5211/5384592886_80a512e2c9.jpg",
  width: "500",
  height: "343",
}, ];

function Random_Img() {
  var random_pic = document.createElement("img");
  var img = document.getElementsByTagName("img")[0];
  if (img) {
    img.parentNode.removeChild(img);
  }
  var pic = pics[Math.floor(Math.random() * pics.length)];
  random_pic.src = pic.src;
  random_pic.width = pic.width;
  random_pic.height = pic.height;
  document.body.appendChild(random_pic);
}