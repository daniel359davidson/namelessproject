function init() {
  var stage;
  function init() {
    // create a new stage and point it at our canvas:
    stage = new createjs.Stage("testCanvas");

    // load the spritesheet image:
    var image = new Image();
    image.onload = handleLoad;
    image.src = "../_assets/art/tmw_desert_spacing.png";
  }
  
  function handleLoad(evt) {
    // define the spritesheet:
    var ss = new createjs.SpriteSheet({
        images: [evt.target],
        frames: {width:32, height:32, regX:0, regY:0, spacing:1, margin:1}
      });

    // define a tile map:
    var map = [
      [ 1,  2,  2,  2,  2,  2,  2,  2,  2,  3],
      [ 9, 10, 10, 10, 10, 10, 10, 10, 10, 11],
      [ 9, 10, 10, 10, 20, 21, 10, 10, 10, 11],
      [17, 18, 18, 18, 19, 17, 18, 18, 18, 19],
      [30, 30, 31, 30,  6,  8, 46, 30, 40, 30],
      [30, 30, 40, 32, 14, 16, 30, 30, 30, 30],
      [30, 30, 30, 30, 14, 16, 48, 30, 31, 30],
      [40, 30, 48, 31, 14, 16, 30, 40, 30, 30],
      [30, 30, 30, 30, 14, 16, 30, 48, 32, 30],
      [30, 30, 40, 30, 14, 16, 30, 30, 30, 30]
    ]

    // draw the map:
    for (var row=0; row<map.length; row++) {
      for (var col=0; col<map[0].length; col++) {
        var idx = map[row][col] - 1;

        var tile = new createjs.Sprite(ss);
        tile.gotoAndStop(idx);
        tile.x = 32*col;
        tile.y = 32*row;
        stage.addChild(tile);
      }
    }

    // update the stage to draw to screen:
    stage.update();
  }
}
