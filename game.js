gameState.play.prototype.create = function() {
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    /*
    * Hero configs
    * Gravity
    * Out of Bounds
    * Scale
    * Jump
    */

    this.hero = game.add.sprite(20, 100, 'white');
    this.hero.scale.setTo(3, 3);
    this.hero.anchor.setTo(0.5, 0.5);

    this.hero.body.gravity.y = 1000;

    this.hero.events.onOutOfBounds.add(function() {
        console.log('out');
    }, this);

    spaceKey.onDown.add(function() {
        if(this.hero.body.touching.down) {
            this.hero.angle = 90;
            this.hero.body.velocity.y = -350;
        }
    }, this);


    /*
    * Ground Configs
    */
    this.ground = game.add.sprite(0, game.height - 50, 'white');
    this.ground.scale.x = 60;
    this.ground.body.immovable = true;
};

gameState.play.prototype.update = function() {
    this.game.physics.collide(this.hero, this.ground);
};

game.state.add('play', gameState.play);
game.state.start('play');