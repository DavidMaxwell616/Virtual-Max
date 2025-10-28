var circle;
var circleMoving = false;
var newX;
var newY;
var masks = [];
var faces = [];

class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image('background', 'assets/images/face.png');
    for (let index = 13; index < 31; index++) {
      this.load.image('mask_' + index, 'assets/images/' + index + '.png');
      this.load.image('face_' + index, 'assets/images/face.png');
    }
    this.load.image('circle', 'assets/images/circle.png');
  }

  create() {
    this.add.image(midX, midY, 'background');
    for (let index = 31; index > 13; index--) {
      const mask = this.add.bitmapMask(null, midX - index + 50, midY, 'mask_' + index);
      masks.push(mask);
      faces.push(this.add.image(midX - index, midY, 'face_' + index).setMask(mask));
      //obj.setInteractive();
    }
    circle = this.add.image(midX, midY, 'circle');
    //   this.input.on('pointerdown', this.startDrag, this);
    //   this.input.on('pointerup', this.stopDrag, this);
  }
  // startDrag(pointer, targets) {
  //   this.input.on('pointerdown', this.startDrag, this);
  //   this.dragObj = targets[0];
  //   this.input.on('pointermove', this.doDrag, this);
  //   console.log(pointer.x, pointer.y);
  // }
  // stopDrag(pointer, targets) {
  //   this.input.on('pointerdown', this.startDrag, this);
  //   this.input.off('pointermove', this.doDrag, this);
  //   this.input.off('pointerup', this.stopDrag, this);
  // }
  // doDrag(pointer) {
  //   this.dragObj.x = pointer.x;
  //   this.dragObj.y = pointer.y;
  //}

  update() {
    if (!circleMoving) {
      newX = (midX) + Phaser.Math.Between(-20, 20);
      newY = (midY) + Phaser.Math.Between(-20, 20);
      circleMoving = true;
    }


    if (circle.x > newX) circle.x -= .25;
    if (circle.y > newY) circle.y -= .25;
    if (circle.x < newX) circle.x += .25;
    if (circle.y < newY) circle.y += .25;
    if (circle.x == newX && circle.y == newY)
      circleMoving = false;

    for (var i = 0; i < masks.length; i++) {
      masks[i].x = faces[i].x = circle.x;
      masks[i].y = faces[i].y = circle.y;
    }

    masks.forEach(mask => {
      mask.x = circle.x;
      mask.y = circle.y;
    });
  }
}



const config = {
  type: Phaser.WEBGL,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: Example
};
const game = new Phaser.Game(config);
const midX = game.config.width / 2;
const midY = game.config.height / 2;
