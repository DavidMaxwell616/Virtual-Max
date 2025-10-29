var circle;
var circleMoving = false;
var newX;
var newY;
var masks = [];
var faces = [];
var faceTimer = 0;
const FACE_TIMER_MAX = 100;
const START_FACE_FRAME = 13;
const END_FACE_FRAME = 31;
const CIRCLE_MIN_MAX = 40;
class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image('background', 'assets/images/face2.png');
    for (let index = START_FACE_FRAME; index < END_FACE_FRAME; index++) {
      this.load.image('mask_' + index, 'assets/images/' + index + '.png');
      this.load.image('face_' + index, 'assets/images/face.png');
    }
    this.load.image('circle', 'assets/images/circle.png');
  }

  create() {
    this.add.image(midX, midY, 'background');
    for (let index = END_FACE_FRAME; index > START_FACE_FRAME; index--) {
      const mask = this.add.bitmapMask(null, midX - index + 35, midY, 'mask_' + index);
      masks.push(mask);
      faces.push(this.add.image(midX - index + 35, midY, 'face_' + index).setMask(mask));
      //obj.setInteractive();
    }
    circle = this.add.image(midX + 35, midY, 'circle');

    //    circle.visible = false;
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
      newX = (midX) + Phaser.Math.Between(-CIRCLE_MIN_MAX, CIRCLE_MIN_MAX);
      newY = (midY) + Phaser.Math.Between(-CIRCLE_MIN_MAX, CIRCLE_MIN_MAX);
      circleMoving = true;
    }

    const circle_speed = .25
    var offset = 0;
    for (var i = 0; i < masks.length; i++) {
      if (circle.x > newX) {
        circle.x -= circle_speed;
        masks[i].x -= circle_speed * offset;
        faces[i].x -= circle_speed * offset;
      }
      if (circle.y > newY) {
        circle.y -= circle_speed;
        masks[i].y -= circle_speed * offset;
        faces[i].y -= circle_speed * offset;
      }
      if (circle.x < newX) {
        circle.x += circle_speed;
        masks[i].x += circle_speed * offset;
        faces[i].x += circle_speed * offset;
      }
      if (circle.y < newY) {
        circle.y += circle_speed;
        masks[i].y += circle_speed * offset;
        faces[i].y += circle_speed * offset;
      }
      if (circle.x == newX && circle.y == newY)
        circleMoving = false;
      offset += .3;
    }

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
