var stage = {
  map: [
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], // STAGE 1
    [0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3], // STAGE 2
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0], // STAGE 3
    [0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0], // STAGE 4
    [0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 2, 0, 0, 0, 0, 1] // STAGE 5
  ],
  current: 0
};

gameStates.Play = function() {};

gameStates.Play.prototype.create = function() {

  // Add jump action to hero
  var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  spaceKey.onDown.add(this.jumpHero, this);

  // add kills text
  this.killText = game.add.text(20, 20, 'Kills: ' + configs.heroKills, { font: '18px Arial', fill: '#FFFFFF' });

  // load sounds
  this.jumpSound = this.game.add.audio('jump');
  this.hitSound = this.game.add.audio('hit');


  /*
  * Hero configs
  */
  this.hero = this.game.add.sprite(20, 160, 'hero');
  this.hero.anchor.setTo(0.5, 0.5);
  this.hero.body.gravity.y = 1000;

  this.initHero();

  // if hero touch end of screen, goes to next level
  this.hero.events.onOutOfBounds.add(function() {
    stage.current += 1;
    this.hero.y = 160;
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

gameStates.Play.prototype.update = function() {
  /*
  * Update configs
  */

  // Stop hero when touch ground
  this.game.physics.collide(this.hero, this.ground);

  if(this.hero.body.touching.down) {
      this.hero.body.velocity.x = 200;
  }

  // kills hero when touch enemy
  this.game.physics.overlap(this.hero, this.enemies, this.killHero, null, this);
};

gameStates.Play.prototype.initHero = function() {
  this.rotation && this.rotation.pause();

  this.hero.x = 20;
  this.hero.y = 160;
  this.hero.angle = 0;
  this.hero.body.velocity.y = 0;
  this.hero.body.velocity.x = 0;

  var _this = this;
  // not proud of it, but little tricky for a bug that i could not resolve
  setTimeout(function() {
    _this.hero.body.velocity.x = 0;
  }, 5);
};

gameStates.Play.prototype.killHero = function() {
  // plays funny sounds
  this.jumpSound.pause();
  this.hitSound.play();

  configs.heroKills += 1;
  this.killText.setText('Kills: ' + configs.heroKills);

  this.initHero();
};

gameStates.Play.prototype.jumpHero = function() {
  if(this.hero.body.touching.down) {
    this.jumpSound.play();
    this.hero.body.velocity.y = -350;

    // this.jump_s.play('', 0, 0.1);
    this.rotation = this.game.add.tween(this.hero).to({angle: this.hero.angle + 180}, 700, Phaser.Easing.Linear.None);
    this.rotation.start();
  }
};

gameStates.Play.prototype.drawLevel = function(stage) {
  this.enemies.forEachAlive(function(enemy) {
    enemy.kill();
  });

  if(!stage) {
    this.game.state.start('End');
    return;
  }

  var stageLentgh = stage.length;
  for (var i = 0; i < stage.length; i += 1) {

    var enemy, left;
    if(stage[i] == 1) {
      // 1 = normal block
      left = i * 30;
      enemy = this.enemies.create(left, this.game.height - 80, 'enemy');
    } else if(stage[i] == 2) {
      // 2 = bigger block
      left = i * 30;
      enemy = this.enemies.create(left, this.game.height - 89, 'enemy');
      enemy.scale.setTo(1, 1.3);
    } else if(stage[i] == 3) {
      // 3 = smaller block
      left = i * 30;
      enemy = this.enemies.create(left, this.game.height - 59, 'enemy');
      enemy.scale.setTo(1, 0.3);
    } else if(stage[i] == 4) {
      // 3 = smaller block
      left = i * 30;
      enemy = this.enemies.create(left, this.game.height - 87, 'enemy');
      enemy.scale.setTo(1, 0.3);
    }
  }
};