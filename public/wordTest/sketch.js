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
wordSystem = new WordSystem();
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
     if(obj[Thelist[0]][i]){
       wordSystem.addWord(obj[Thelist[0]][i]);
     }
  }




}
function mousePressed() {

    var fs = fullscreen();
    fullscreen(!fs);

  }

var Word = function(theWord){

    this.size =  floor(random(40)+42);
    this.word = theWord;
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.life =255.;
    this.tick = random(1.)+0.5;
};
Word.prototype.run = function() {
  this.update();
  this.display();
};
Word.prototype.display = function(){
  textSize(this.size);
  textAlign(CENTER);
  textFont(myFont);
  fill(this.life, this.life, this.life);
  text(this.word, this.x, this.y );

};

Word.prototype.update = function(){
  this.life = this.life - this.tick;
};

Word.prototype.isDead = function(){
  if (this.life < 0) {
    return true;
  } else {
    return false;
  }
};

var WordSystem = function() {
    this.words = [];
  };

  WordSystem.prototype.addWord = function(newWord) {
    var theNewWord = new Word(newWord)
    this.words.push(theNewWord);
    // this.words.unshift(theNewWord);
  };

  WordSystem.prototype.run = function() {
    for (var i = this.words.length-1; i >= 0; i--) {
      var w = this.words[i];
      w.run();
      if (w.isDead()) {
        this.words.splice(i, 1);
      }
    }
  };

function draw() {
 clear();
  background(0, 0 ,0);
wordSystem.run();
// console.log(wordSystem.words.length);

}
