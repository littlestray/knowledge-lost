let wikiTitle = document.getElementById("firstHeading");

// This changes the title to our title by appending " Lost" to whatever the title is.
// wikiTitle.innerHTML = wikiTitle.innerHTML + " Lost";

// This removes the dissambiguation we don't want.
let hatNote = document.getElementsByClassName("hatnote");
hatNote[0].remove();
// This selects the article body and gets an array of the orig-
//-inal p-tags in the article.
let wikiArticle = document.getElementsByClassName("mw-parser-output")[0];
let wikiArtPs = wikiArticle.getElementsByTagName("p");

// Add our mission statement; Prepend it to the article.
let missionStatement = "<b>Knowledge Lost</b> is an audio-visual live performance based off of deletions from wikipedia. In real time the artists gather all the text that is currently being deleted off wikipedia and use it to create audio and visuals. You know, that sound you hear when you forget something?";

// Delete the first P right away I'd eventually like to replace
//all instances of "Knowledge" with "Knowledge Lost" But I'd h-
//-ave to look up a way to do that.
wikiArtPs[0].remove();

// swap in KL
addLost(wikiArtPs);

let msObj = document.createElement("p");
msObj.innerHTML = missionStatement;
wikiArticle.prepend(msObj);

let delInterval;
let ramp = 0.99;

// function that blanks out random text at a setInterval and a
//variable to hold that SetInterval Object;
//------------------------------------------------------------------------------------------FUNCTIONS
function addLost(article) {

    for (x in article) {
        if (article[x].innerHTML) {
            let temp = article[x].innerHTML;

            //

            temp = temp.replace("Knowledge", "Knowledge Lost");
            temp = temp.replace("knowledge", "knowledge lost");

            article[x].innerHTML = temp;

        }
    }

}

function removeText(article, ramp) {
    //console.log(article);
    if (Math.random() > 0.9) {

        noise();

    }

    let rndIndex = Math.floor(Math.random() * article.length);
    //console.log(article[rndIndex]);

    tempText = article[rndIndex].innerHTML;
    //   console.log(tempText);

    tempArray = [];
    target = "";

    for (i in tempText) {
        tempArray.push(tempText[i]);
    }

    for (i in tempArray) {
        if (Math.random() > ramp) {
            target += "";




        } else {
            target += tempArray[i];
        }
    }

    article[rndIndex].innerHTML = target;

}




setTimeout(() => {
    begin();
    delInterval = setInterval(function () {

        removeText(wikiArtPs, ramp);
        ramp = ramp * 0.999;
        // console.log(ramp);
    }, 100);

}, 5000);

var xebraState = new Xebra.State({
    hostname: "127.0.0.1",
    port: 8086,
    supported_objects: Xebra.SUPPORTED_OBJECTS
});
xebraState.connect();


function noise() {
    xebraState.sendMessageToChannel("testing", "noise");
}

// function ending() {
//     xebraState.sendMessageToChannel("testing", "end");
// }

function middle() {
    xebraState.sendMessageToChannel("testing", "middle");
}

function begin() {
    xebraState.sendMessageToChannel("testing", "begin");
}




setTimeout(function () {

    let button = document.createElement("BUTTON");
    button.onclick = begin;
    button.innerText = " ...begin... ";
    button.style = "width:400px;font-size: 125%;";
    console.log(button);
    wikiTitle.appendChild(button);

}, 40000);
