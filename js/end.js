gameStates.End = function() {};

gameStates.End.prototype.create = function() {
  console.log('teste');
  var killMessage = '';
  if(configs.heroKills === 0) {
    killMessage = 'You did\'t die, that\'s impressive!';
  } else if(configs.heroKills == 1) {
    killMessage = 'You just died once, you are pretty good!';
  } else {
    killMessage = 'You died ' + configs.heroKills + ' times, I know you can do better!';
  }

  this.killText = game.add.text(40, 40, 'You have finished the game! \n' + killMessage, { font: '20px Arial', fill: '#FFFFFF' });
  game.add.text(40, 120, 'Thanks for Playing,\nyou made a little developer really happy *.*', { font: '22px Arial', fill: '#FFFFFF' });
};