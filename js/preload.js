function preload() {
    for (let index = 13; index < 31; index++) {
        this.load.image('mask_' + index, 'assets/images/' + index + '.png');
        this.load.image('face_' + index, 'assets/images/face.png');
        game.load.image('masked', 'http://blog-imgs-27.fc2.com/w/j/h/wjham/toypop0001.gif');
       }
}