export default class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: 'splashScene' })
  }
  
  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Splash Scene')
    this.load.image('splashSceneBackground', './assets/splashSceneImage.png')
  }
// загружаем и устанаввливаем координаты спрайтов
  create(data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
    
  }
  update(time, delta) {
    if (time > 5000) {
      this.scene.switch('titleScene')
    }
    
}
}