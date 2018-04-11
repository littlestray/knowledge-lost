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
  socket.on('connect', function (data) {
    socket.emit('join', 'Hello World from client');
    socket.on('deletions', socketUpdate);
  });

}


function socketUpdate(obj) {
  var Thelist = Object.keys(obj);
  console.log(wordSystem.words.length);
  for (var i = 0; i < obj[Thelist[0]].length; i++) {
    if (obj[Thelist[0]][i]) {
      if (wordSystem.words.length < 1000) {
        wordSystem.addWord(obj[Thelist[0]][i], i);
      }
    }
  }




}
function mousePressed() {
  // The fullscreen was making debugging difficult.
  // var fs = fullscreen();
  // fullscreen(!fs);

}

let Word = function (theWord, preLifeFrames) {

  this.size = floor(random(40) + 42);
  this.word = theWord;
  this.x = random(windowWidth);
  this.y = random(windowHeight);
  this.life = 255.;
  this.tick = random(1.) + 0.5;

  this.isBorn = false;
  this.preLife = preLifeFrames;


};
Word.prototype.run = function () {
  this.update();
  this.display();
};
Word.prototype.display = function () {
  textSize(this.size);
  textAlign(CENTER);
  textFont(myFont);
  fill(this.life, this.life, this.life);
  text(this.word, this.x, this.y);



};

Word.prototype.birth = function () {
  this.isBorn = true;


}

Word.prototype.talk = function () {

}

Word.prototype.update = function () {
  this.life = this.life - this.tick;
};

Word.prototype.isDead = function () {
  if (this.life < 0) {
    return true;
  } else {
    return false;
  }
};

let WordSystem = function () {
  this.words = [];
};

WordSystem.prototype.addWord = function (newWord, index) {
  let tempWord = new Word(newWord, index * 8);
  this.words.push(tempWord);



  // setTimeout(function () {
  //   //console.log(newWord)
  //   this.words.push(new Word(newWord));
  //   console.log(index * 200 + 1)
  // }, index * 200 + 1);

};

WordSystem.prototype.run = function () {
  for (var i = this.words.length - 1; i >= 0; i--) {
    let w = this.words[i];

    if (w.isBorn) {
      w.run();
      if (w.isDead()) {
        this.words[i] = null;
        this.words.splice(i, 1);
      }
    } else {


      if (w.preLife == 0) {
        w.isBorn = true;
        if (!responsiveVoice.isPlaying()) {
          responsiveVoice.speak(w.word);
        }
      } else {
        w.preLife--
      }

    }

  }
};

function draw() {
  clear();
  background(0, 0, 0);
  wordSystem.run();
  // console.log(wordSystem.words.length);

}
