const audioSystem = function (numVoxes) {

    this.voices = ["UK English Female", "UK English Male", "US English Female"];


    this.voxBank = [];
    for(let i = 0; i < numVoxes; i++){
        this.voxBank.push(new ResponsiveVoice());
    }



}

audioSystem.prototype.talk = function (message) {
    let vType = Math.floor(Math.random() * this.voices.length);
    let vPitch = Math.random() * 1 + 0.5;
    let vGain = 0.2;
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
