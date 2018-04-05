var socket;
var x = 0;
var val = 0;
var words = [];
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
var socket = io.connect('http://localhost:2222');
   socket.on('connect', function(data) {
       socket.emit('join', 'Hello World from client');
       socket.on('deletions', socketUpdate);
   });

}


function socketUpdate(obj){
var Thelist = Object.keys(obj);

  for (var i = 0; i < obj[Thelist[0]].length; i++) {
    wordPush(obj[Thelist[0]][i]);
  }



}
function mousePressed() {

    var fs = fullscreen();
    fullscreen(!fs);

  }

function wordPush(theWord){
  var newWord = {
    size: floor(random(40)+42),
    word : theWord,
    x : random(windowWidth),
    y : random(windowHeight),
    life :255,
    tick : random(100)*0.01
  }

  words.push(newWord);
}

function wordDraw(word){
textSize(word.size);
text(word.word, word.x, word.y );
fill(word.life, word.life, word.life);
word.life = word.life - word.tick;

}
function draw() {
  clear();
  background(0);
for (var i = 0; i < words.length; i++) {
  wordDraw(words[i]);
  if (words[i].life <= 10){
    words.splice(words[i], 1);
  }
}


}
