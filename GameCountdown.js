import Phaser from 'phaser';
import CountdownBeep_High from './assets/CountdownBeep_HighNode.wav';
import CountdownBeep from './assets/CountdownBeep.wav';

export default class GameCountdown extends Phaser.Scene {

    constructor() {
        super('GameCountdown');
        this.countdownText;
        this.countdownValue = 4;
        
    }


preload() {
    this.load.audio('countdownbeep', CountdownBeep);
    this.load.audio('countdownbeep_high', CountdownBeep_High);
}

create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    // Display the countdown text
    this.countdownText = this.add.text(screenCenterX, screenCenterY, '').setColor("White");
    

    // Set up a repeating event to update the countdown every second
    this.time.addEvent({
        delay: 1000,
        callback: this.updateCountdown,
        callbackScope: this,
        repeat: this.countdownValue - 1
    });
}

update() {
    // Your game logic goes here
}

updateCountdown() {
    this.countdownText.setOrigin(0.5, 0.5).setFont('Roboto').setBackgroundColor("#164196").setFontSize(82).setPadding({x:10});
    const countdownBeep = this.sound.add('countdownbeep');
    const countdownBeep_high = this.sound.add('countdownbeep_high');
    this.countdownValue--;

    if (this.countdownValue == 3) {
        // Update the countdown text
        
        countdownBeep.play();
        this.countdownText.setText("KLAR");
    } else if (this.countdownValue == 2) 
    {
        countdownBeep.play();
        // Update the countdown text
        this.countdownText.setText("PARAT"); 
    }
    else if(this.countdownValue == 1) 
    {
        countdownBeep_high.play();
        // Update the countdown text
        this.countdownText.setText("START").setBackgroundColor('#e30613'); 
    }
    else {
        console.log("countdown finished from GameCountdown")
        this.countdownText.destroy();
        // Dispatch the event when the countdown is complete
        this.events.emit('countdownFinished');
    }
}
}
