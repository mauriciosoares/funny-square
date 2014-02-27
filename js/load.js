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

var gameStates = {};

gameStates.Load = function() {};

gameStates.Load.prototype.preload = function() {
  /*
  * Preload Congis
  * Background color
  * white sprite
  * Sounds
  */
  this.game.add.text(40, 40, 'Funny Square', {font: '30px Arial', fill: '#FFFFFF'});
  this.game.add.text(40, 80, 'Developed by: Mauricio Soares', {font: '22px Arial', fill: '#FFFFFF'});
  this.game.add.text(40, 120, 'Loading', {font: '22px Arial', fill: '#FFFFFF'});

  this.game.stage.backgroundColor = '#999999';

  this.game.load.image('hero', 'assets/hero.jpg');
  this.game.load.image('floor', 'assets/floor.jpg');
  this.game.load.image('enemy', 'assets/enemy.jpg');

  this.game.load.audio('jump', 'assets/effects/jump.mp3');
  this.game.load.audio('hit', 'assets/effects/hit.mp3');
};

gameStates.Load.prototype.create = function() {
  setTimeout(function() {
    game.state.start('Play');
  }, 2000);
};