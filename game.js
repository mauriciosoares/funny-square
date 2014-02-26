var map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] // STAGE 1
];

gameState.play.prototype.create = function() {
  var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  /*
  * Hero configs
  * Gravity
  * Out of Bounds
  * Scale
  * Jump
  */

  this.hero = this.game.add.sprite(20, this.game.height - 80, 'hero');

  this.hero.body.gravity.y = 1000;

  this.hero.events.onOutOfBounds.add(function() {
    this.killHero();
  }, this);

  spaceKey.onDown.add(function() {
    if(this.hero.body.touching.down) {
      this.hero.body.velocity.y = -350;
    }
  }, this);


  /*
  * Ground Configs
  */
  this.ground = this.game.add.sprite(0, this.game.height - 50, 'floor');
  this.ground.scale.setTo(60, 0.2);
  this.ground.body.immovable = true;

  /*
  * Enemies
  */
  this.enemies = this.game.add.group();

  // draw level
  this.drawLevel(map[0]);
};

gameState.play.prototype.update = function() {
  /*
  * Update configs
  */

  // Stop hero when touch ground
  this.game.physics.collide(this.hero, this.ground);

  // kills hero when touch enemy
  this.game.physics.overlap(this.hero, this.enemies, function(hero, enemy) {
    this.killHero();
  }, null, this);

  // makes hero walk
  this.hero.body.velocity.x = 200;
};

gameState.play.prototype.killHero = function() {
  this.hero.body.velocity.y = 0;
  this.hero.x = 20;
  this.hero.y = this.game.height - 80;
};

gameState.play.prototype.drawLevel = function(stage) {
  this.enemies.forEachAlive(function(enemy) {
    enemy.kill();
  });

  var stageLentgh = stage.length;
  for (var i = 0; i < stage.length; i += 1) {
    if(stage[i] == 1) {
      var left = i * 30;
      var enemy = this.enemies.create(left, this.game.height - 80, 'enemy');
    }
  };
}


game.state.add('play', this.gameState.play);
game.state.start('play');