//this is Game Scene 
export default class GameScene extends Phaser.Scene {
  //create an alien
  createAlien() {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1 //any numb betw 1 and 1920 
    let alienXVelocity = Math.floor(Math.random() * 50) + 1 //any numb betw 1 and 50
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1 //will add minus in 50%cases
    const anAlien = this.physics.add.sprite(alienXLocation, 100, 'alien')
    anAlien.body.velocity.y = 100//speed of moving y down
    anAlien.body.velocity.x = alienXVelocity
    this.alienGroup.add(anAlien)
    
  }
  constructor() {
    super({ key: 'gameScene' })

    this.background = null
    this.ship = null
    this.fireMissile = false
    this.score = 0 
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
    

  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Game Scene')
    //images 
    this.load.image('starBackground', './assets/starBackground.png')
    this.load.image('ship', './assets/spaceShip.png')
    this.load.image('missile', './assets/missile.png')
    this.load.image('alien', './assets/alien.png')
    //sound
    this.load.audio('laser', 'assets/laser1.wav') 
    this.load.audio('explosion', './assets/blastSound.wav')
    this.load.audio('crash', './assets/crashSound.wav')
  }
  
  // put our elements on user s screen 
  create(data) {
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
    this.background.setOrigin(0, 0)
    this.scoreText = this.add.text(10, 10 , 'Score: ' + this.score, this.scoreTextStyle)
    // распалагаем на экране ship в самом внизу
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')
    //create a group for the missiles and aliens
    this.missileGroup = this.physics.add.group()
    this.alienGroup = this.add.group()
    this.createAlien()
    // Collisions btw missiles and aliens 
    this.physics.add.collider(this.missileGroup, this.alienGroup, (missileCollide, alienCollide) => {
      missileCollide.destroy()
      alienCollide.destroy()
      this.sound.play('explosion')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score)
      this.createAlien()
    })
    // Collisions btw ship and aliens 
    this.physics.add.collider(this.ship, this.alienGroup, (shipCollide, alienCollide) => {
      this.sound.play('crash')
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    })
  }
  //
  update(time, delta) {
    //called 60 times a second
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')
    
    if (keyRightObj.isDown === true) {
      // this.ship.x = this.ship.x + 10
      this.ship.x+= 10
      if (this.ship.x > 1860) {
        this.ship.x = 1860
      }
    }

    if (keyLeftObj.isDown === true) {
      // this.ship.x = this.ship.x - 10
      this.ship.x -=  10
      if (this.ship.x < 60) {
        this.ship.x = 60 
      }
    }

    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false ) {
        //fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
        this.missileGroup.add(aNewMissile)
        this.sound.play('laser')
      }
    }
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
    // fire missile, don t forget to get rid of them at the end
    this.missileGroup.children.each((item) => {
      item.y = item.y - 10
      if (item.y < 0) {
        item.destroy()
      }
    })
  }
}
