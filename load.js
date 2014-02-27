/*
* Game: Funny Square
* Description: Pass though all the obstacles :D
* Creator: Mauricio
* Inspiration: Many games such as Impossible Game, Red Ball and Spikes and others
*/

var configs = configs || {};
  configs.canvasWidth = 600;
  configs.canvasHeight = 320;
  configs.heroKills = 0;

var game = new Phaser.Game(configs.canvasWidth, configs.canvasHeight, Phaser.AUTO, '');

var gameState = {};

gameState.play = function() {};

gameState.play.prototype.preload = function() {
  /*
  * Preload Congis
  * Background color
  * white sprite
  */
  this.game.stage.backgroundColor = '#999999';

  this.game.load.image('hero', 'assets/hero.jpg');
  this.game.load.image('floor', 'assets/floor.jpg');
  this.game.load.image('enemy', 'assets/enemy.jpg');
};