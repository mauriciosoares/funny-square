var game = new Phaser.Game(configs.canvasWidth, configs.canvasHeight, Phaser.AUTO, '');

game.state.add('Play', gameStates.Play);
game.state.add('Load', gameStates.Load);
game.state.add('End', gameStates.End);
game.state.start('Load');