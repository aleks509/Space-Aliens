//this is Menu Scene 
export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menuScene' })

    this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Menu Scene')
    this.load.image('menuSceneBackground', './assets/aliens_screen_image2.jpg')
    this.load.image('startButton', 'assets/start.png')
  }
// кладем menuSceneBackground в переменную this.menuSceneBackgroundImage
  create(data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    //располагаем по цетру экрана
    this.menuSceneBackgroundImage.x = 1920 / 2 
    this.menuSceneBackgroundImage.y = 1080 / 2
// создаем на экране кнопку startButton
    this.startButton = this.add.sprite(1920 /2, (1080 / 2) +100, 'startButton')
// добавляем интерактива на кнопку
    this.startButton.setInteractive(
      { useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
    this.input.keyboard.on('keydown-ENTER' , () => this.clickButton())
  }
  update(time, delta) {
  }
  
  clickButton() {
    this.scene.start('gameScene')
  }
}
