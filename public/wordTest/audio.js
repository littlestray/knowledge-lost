const audioSystem = function (numVoxes) {

    this.voices = ["UK English Female", "UK English Male", "US English Female",
        "Spanish Female", "French Female", "Deutsch Female",
        "Italian Female", "Greek Female"];


    this.voxBank = [];
    for(let i = 0; i < numVoxes; i++){
        this.voxBank.push(new ResponsiveVoice());
    }



}

audioSystem.prototype.talk = function (message) {
    let vType = Math.floor(Math.random() * 8);
    let vPitch = Math.random() * 2
    let vGain = 0.1;
    console.log("talk :: " + message + " :: " + vType + " :: " + vPitch)
    hasSpoken = false;

    for(let i = 0; i < this.voxBank.length; i++){
        //console.log(this.voxBank[i]);
        if(!this.voxBank[i].isPlaying() && hasSpoken == false){
            this.voxBank[i].speak(message, this.voices[vType], {"pitch": vPitch, "volume": vGain});
            console.log("V: " + i);
            hasSpoken = true;
        }
    }


}

let chorus = new audioSystem(4);
