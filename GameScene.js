import Phaser from 'phaser';

// Game Scene imports:
import GameCountdown from './GameCountdown';
import RedBalloon from './assets/balloon_red_string_ram.png';
import Knife from './assets/ButterKnife_128x128.png';
import Fork from './assets/Fork_128x128.png';
import Bottle from './assets/BeerBottle_128x128.png';
import Flag from './assets/Bubble1.png';
import Explosion1 from './assets/explosion1.png';
import Explosion2 from './assets/explosion2.png';
import Explosion3 from './assets/explosion3.png';
import Explosion4 from './assets/explosion4.png';
import Explosion5 from './assets/explosion5.png';
import Explosion6 from './assets/explosion6.png';



export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');

        // GameCountdown launch decider
        this.launchGameCountdown = false;

        // Spawnvariables
        this.lastBallonSpawnTime = 0;
        this.balloonSpawnInterval = 300; // in milliseconds
        this.lastFlagSpawnTime = 0;
        this.flagSpawnInterval = 800;

        // Timer variables
        this.timer;
        this.initialTime = 20; // in seconds
        this.timerLabel;

        // Score variable
        this.score = 0;

        // Score label variable
        this.scoreLabel;
        
    }
    preload() {
        this.load.image('knife', Knife);
        this.load.image('fork', Fork);
        this.load.image('bottle', Bottle);
        this.load.image('flag', Flag);
        this.load.image('explosion_image1', Explosion1);
        this.load.image('explosion_image2', Explosion2);
        this.load.image('explosion_image3', Explosion3);
        this.load.image('explosion_image4', Explosion4);
        this.load.image('explosion_image5', Explosion5);
        this.load.image('explosion_image6', Explosion6);
    }

    create() {

        // Add Scorelabel
        this.scoreLabel = this.add.text(this.sys.game.config.width - 10, 20, 'SCORE: 0', {
            fontSize: '32px',
            fill: '#fff',
            align: 'right',
            fontFamily: 'Roboto, sans-serif',
        }).setOrigin(1, 0).setDepth(2).setStyle({
            position: 'fixed',
            opacity: 0.9,
            inset: 0,
            backgroundColor: 'rgb(240, 240, 240)',
            // Apply styles from the CSS
            textTransform: 'uppercase',
            fontWeight: 'bold',
            backgroundColor: '#164196',
            color: '#ffffff',
            lineSpacing: 0,
            boxDecorationBreak: 'clone',
            boxSizing: 'border-box',
            
        }).setPadding({x: 15}).setVisible(false);

        if(this.launchGameCountdown) {
            const gameCountdownScene = this.scene.add('GameCountdown', GameCountdown);

        // Listen for the event using the global event emitter
        gameCountdownScene.events.on('countdownFinished', this.handleCountdownFinished, this);

        // Launch the GameCountdown scene
        this.scene.launch('GameCountdown');
        } 
        else 
        {
            this.scoreLabel.setVisible(true);
            this.startGame();
        }
        
        

        

        

        // Enable fullscreen button
        this.input.keyboard.on('keydown-F', function (event) {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        }, this);
    }

    handleCountdownFinished() {
        // Countdown is finished, start the game
        console.log("finished countdown");
        this.launchGameCountdown = false;
        this.startGame();
    }

    startGame() {
        this.scoreLabel.setVisible(true);
        this.startGameTimer();
    }

    update(time, delta) {
        if(this.launchGameCountdown == false) {
            if (time - this.lastBallonSpawnTime > this.balloonSpawnInterval) {
                this.spawnBalloonObject();
                this.lastBallonSpawnTime = time;
            }
            if (time - this.lastFlagSpawnTime > this.flagSpawnInterval) {
                this.spawnFlagObject();
                this.lastFlagSpawnTime = time;
            }
        }
        
        //this.countdown.update();
        
    }

    spawnFlagObject() {
        const flagObject = this.add.image(
            Phaser.Math.Between(0, this.sys.game.config.width),
            +this.sys.game.config.height + 120, // spawner lige over browser vinduet
            'flag'
        ).setDepth(0).setScale(this.FloatBetween(0.05, 0.2));

        this.physics.add.existing(flagObject);
        flagObject.body.setVelocity(0, 100);

        
    // Set initial rotation and angular velocity
    //flagObject.rotation = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360)); // Random initial rotation
    //const angularVelocity = Phaser.Math.FloatBetween(-180, 180); // Random angular velocity

    // Set initial horizontal velocity
    //const horizontalVelocity = Phaser.Math.FloatBetween(-50, 50); // Random horizontal velocity

    this.physics.add.existing(flagObject);

    // Set angular velocity
    //flagObject.body.angularVelocity = angularVelocity;

    // Set horizontal velocity
    //flagObject.body.setVelocityX(horizontalVelocity);
    flagObject.body.setVelocityY(Phaser.Math.Between(-50, -100)); // Vertical velocity

    // Optional: Add damping to gradually slow down rotation and movement
    flagObject.body.angularDamping = 0.95;
    flagObject.body.linearDamping = 0.95;

    // Set opacity (e.g., 0.5 for half-transparent)
    flagObject.setAlpha(0.4);
    }

    spawnBalloonObject() {

        // Array containing filenames of the images
        const trashImages = ['knife', 'fork', 'bottle'];

        // Randomly select an image filename from the array
        const randomImage = Phaser.Math.RND.pick(trashImages);

        // Create and position your the balloon
        const balloonObject = this.add.image(
            Phaser.Math.Between(0, this.sys.game.config.width),
            this.sys.game.config.height - 1200, // spawner lige under browser vinduet
            randomImage
        ).setDepth(1).setScale(1);
  
        
        this.physics.add.existing(balloonObject);
        balloonObject.body.setVelocity(0, Phaser.Math.Between(+175, +215));
        balloonObject.setInteractive();
        
        // // Declare the explosion variable outside the callback
        // let explosion;
        // // Listen for the pointerdown event
         balloonObject.on('pointerdown', () => {
             balloonObject.destroy();
            
        //      // Create a new image at the position of the destroyed balloonObject
        // const explosion = this.add.sprite(
        //     balloonObject.x,
        //     balloonObject.y,
        //     'explosion_image1'
        // ).setDepth(1).setScale(0.6);
        
        // // Set up animation
        // this.anims.create({
        //     key: 'explode',
        //     frames: [
        //         { key: 'explosion_image1' },
        //         { key: 'explosion_image2' },
        //         { key: 'explosion_image3' },
        //         { key: 'explosion_image4' },
        //         { key: 'explosion_image5' },
        //         { key: 'explosion_image6' }
        //     ],
        //     frameRate: 20, // Number of frames per second
        //     repeat: 0 // Play the animation only once
        // });

        // // Play the animation
        // explosion.on('animationcomplete', () => {
        //     explosion.destroy();
        // });

        // explosion.play('explode');

        // Increment the score
        this.score += 1;

        // Update the score label
        this.scoreLabel.setText('SCORE: ' + this.score);
    });
    }

    // Generate random float numbers
    FloatBetween = function (min, max)
    {
        return Math.random() * (max - min) + min;
    };

    startGameTimer() {
        // Display the initial time
        this.timerLabel = 
        this.add.text(10, 20, 'TIME LEFT: ' + this.formatTime(this.initialTime), 
        { fontSize: '32px',
        fill: '#fff',
        align: 'right',
        fontFamily: 'Roboto, sans-serif' }).setDepth(2).setStyle({
            position: 'fixed',
            opacity: 0.9,
            inset: 0,
            backgroundColor: 'rgb(240, 240, 240)',
            // Apply styles from the CSS
            textTransform: 'uppercase',
            fontWeight: 'bold',
            backgroundColor: '#164196',
            color: '#ffffff',

            boxDecorationBreak: 'clone',
            boxSizing: 'border-box',
        }).setPadding({x: 15});


        // Create a countdown timer
        this.timer = this.time.addEvent({
            delay: 1000, // 1 second
            repeat: this.initialTime - 1, // Repeat the event `initialTime` times (initialTime - 1 because we're already displaying the initial time)
            callback: this.onTimerTick,
            callbackScope: this,
        });
    }

    onTimerTick() {
        // Update the displayed time
        this.timerLabel.setText('TIME LEFT: ' + this.formatTime(this.timer.repeatCount));

        // Check if the timer has reached 0
        if (this.timer.repeatCount === 0) {
            this.endGame(); // Add your logic for what should happen when the timer reaches 0
        }
    }

    endGame() {

        console.log('Game Over!');
        this.scene.start('InputField', { score: this.score});
        
    }

    formatTime(seconds) {
        // Format the time as mm:ss
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

}


