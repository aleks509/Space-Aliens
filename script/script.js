/* global Phaser*/
import SplashScene from './splashScene.js';
import TitleScene from './titleScene.js';
import MenuScene from './menuScene.js';
import GameScene from './gameScene.js';

//Our game scenes
const splashScene = new SplashScene();
const titleScene = new TitleScene();
const menuScene = new MenuScene();
const gameScene = new GameScene();

//Game scene

 const config = {
   type: Phaser.AUTO,
   width: 1920,
   height: 1080,
   physics: {
     default: 'arcade',
      arcade: {
        debug: false
      }
      },
   backgroundColor: 0xffffff,
   scale: {
     mode: Phaser.Scale.FIT,
     //we place it in the middle of the page.
      autoCenter: Phaser.Scale.CENTER_BOTH
   }
 }

const game = new Phaser.Game(config)
//load scenes
// list of scenes
//any 'key' is global and cannot be reused!1й аргумент это ключ
// game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)
game.scene.add('menuScene', menuScene)
game.scene.add('gameScene', gameScene)
//start  title 
game.scene.start('titleScene')