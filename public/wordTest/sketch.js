var socket;
// var x = 0;
// var val = 0;
var wordSystem;
var words = [];

var myFont;
function preload() {
  myFont = loadFont('assets/Glass_TTY_VT220.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  background(0);

  var socket = io.connect('http://localhost:2222');
  socket.on('connect', function (data) {
    socket.emit('join', 'Hello World from client');
    socket.on('deletions', socketUpdate);
  });

}


function socketUpdate(obj) {
  var Thelist = Object.keys(obj);
  console.log("fr: " + frameRate());
  for (var i = 0; i < obj[Thelist[0]].length; i++) {
    if (obj[Thelist[0]][i]) {
      if (frameRate() > 15) {
        displayWord(obj[Thelist[0]][i]);
        
      }
    }
  }
}

function mousePressed() {
  // The fullscreen was making debugging difficult.
  // var fs = fullscreen();
  // fullscreen(!fs);

}

function displayWord(theWord) {

  this.size = floor(random(40) + 42);
  this.word = theWord;
  this.x = random(windowWidth);
  this.y = random(windowHeight);

  textSize(this.size);
  textAlign(CENTER);
  textFont(myFont);
  fill(255,255,255,100);
  text(this.word, this.x, this.y);

};

let counter = 0;

function draw() {
  counter += 0.01;
  //background(0, 0, 0, counter % 255);
  fill(0, 12);
  rect(0,0,windowWidth,windowHeight);
  // loadPixels();
  // for (var i = 0; i < pixels.length; i++) {
  //   for(j)
  // }
  // updatePixels();
  

}
