var stage = {
  map: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // STAGE 1
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // STAGE 2
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], // STAGE 3
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // STAGE 4
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1] // STAGE 5
  ],
  current: 0
};
gameState.play.prototype.create = function() {
  // hotkey for spacebar
  var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  this.text = game.add.text(20, 20, 'Kills: ' + configs.heroKills, configs.textStyle);

  spaceKey.onDown.add(this.jumpHero, this);

  /*
  * Hero configs
  */
  this.hero = this.game.add.sprite(20, 160, 'hero');
  this.hero.anchor.setTo(0.5, 0.5);
  this.hero.body.gravity.y = 1000;
  this.heroVelocity = 0;

  this.initHero();

  // if hero touch end of screen, goes to next level
  this.hero.events.onOutOfBounds.add(function() {
    stage.current += 1;
    this.drawLevel(stage.map[stage.current]);
    this.killHero();
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
  this.drawLevel(stage.map[stage.current]);
};

gameState.play.prototype.initHero = function() {
  this.rotation && this.rotation.pause();

  this.hero.x = 20;
  this.hero.y = 160;
  this.hero.angle = 0;
  this.hero.body.velocity.y = 0;
  this.hero.body.velocity.x = 0;
};

gameState.play.prototype.update = function() {
  /*
  * Update configs
  */

  // Stop hero when touch ground
  this.game.physics.collide(this.hero, this.ground);


  if(this.hero.body.touching.down) {
    this.hero.body.velocity.x = 200;
  }

  // kills hero when touch enemy
  this.game.physics.overlap(this.hero, this.enemies, function(hero, enemy) {
    this.killHero();
  }, null, this);
};

gameState.play.prototype.killHero = function() {
  configs.heroKills += 1;
  this.text.setText('Kills: ' + configs.heroKills);

  this.initHero();
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

gameState.play.prototype.jumpHero = function() {
  if(this.hero.body.touching.down) {
    this.hero.body.velocity.y = -350;

    // this.jump_s.play('', 0, 0.1);
    this.rotation = this.game.add.tween(this.hero).to({angle: this.hero.angle + 180}, 700, Phaser.Easing.Linear.None);
    this.rotation.start();
  }
}

game.state.add('play', this.gameState.play);
game.state.start('play');