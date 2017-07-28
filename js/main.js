function init() {
  // mapLoader(MapManager); // Loads map

  DrawManager.initScene();
  DrawManager.setSpritesheet("assets/sprites/ground.png");

  createjs.Ticker.setFPS(30);
  createjs.Ticker.useRAF = true;
  createjs.Ticker.addEventListener("tick", GameEventsController.handleTick);

  ControllsManager.init();
}

// Code below wont work on local
// Library "Simulate" must be loaded
//
// function mapLoader (mapManager) {
//   var xhr = new XMLHttpRequest();
//   xhr.open( 'GET', 'assets/maps/map.json', true);
//
//   xhr.onreadystatechange = function () {
//
//     if (xhr.status != 200) {
//       alert(xhr.status + ': ' + xhr.statusText);
//     } else {
//       alert(xhr.responseText);
//       mapManager.map = JSON.parse(xhr.responseText);
//     }
//   }
//
//   xhr.send();
// }

var DrawManager = {
  spritesheet : {},
  scene : {},
  board : {},
  initScene : function () {
    DrawManager.scene   = new createjs.Stage("canvas");
    DrawManager.board   = new createjs.Container();
    DrawManager.board.x = 0;
    DrawManager.board.y = 0;
    DrawManager.scene.addChild(DrawManager.board);
  },
  setSpritesheet : function (url) {
    var image    = new Image();
    image.onload = handleLoad;
    image.src    = url;

    function handleLoad (evt) {
      DrawManager.spritesheet = new createjs.SpriteSheet(
        {
          images: [evt.target],
          frames: {width: 32, height: 32, regX: 0, regY: 0, spacing: 2, margin: 0}
        }
      );

      MapManager.drawMap();
    }
  },
  drawTile : function (x, y, idx) {
    var tile = new createjs.Sprite(DrawManager.spritesheet);
    tile.gotoAndStop(idx);
    tile.x = x;
    tile.y = y;
    DrawManager.board.addChild(tile);
  },
  update : function () {
    DrawManager.scene.update();
  }
}

var MapManager = {
  map : {},
  drawMap : function () {
    for (var i = 0; i < MapManager.map.width; i++) {
      for (var j = 0; j < MapManager.map.height; j++) {
        var x   = i * 32;
        var y   = j * 32;
        // Floor level draw
        var idxFloor       = MapManager.map.layers[0].data[i + (j * MapManager.map.width)] - 1;
        DrawManager.drawTile(x, y, idxFloor);
        // Buildings level draw
        // Walls
        var idxWalls       = MapManager.map.layers[1].layers[0].data[i + (j * MapManager.map.width)] - 1;
        DrawManager.drawTile(x, y, idxWalls);
        // Windows and doors
        var idxBldElements = MapManager.map.layers[1].layers[1].data[i + (j * MapManager.map.width)] - 1;
        DrawManager.drawTile(x, y, idxBldElements);
        // objects & decorations level
        var idxDeco        = MapManager.map.layers[2].data[i + (j * MapManager.map.width)] - 1;
        DrawManager.drawTile(x, y, idxDeco);
      }
    }

    DrawManager.update();
  }
}

var ControllsManager = {
  keysPressed : {
      38: 0,
      40: 0,
      37: 0,
      39: 0
  },
  init : function () {
    document.addEventListener("keydown", function (e) {
        ControllsManager.keysPressed[e.keyCode] = 1;

    });

    document.addEventListener("keyup", function (e) {
        ControllsManager.keysPressed[e.keyCode] = 0;

    });
  },
  detectKeys : function () {
    if (ControllsManager.keysPressed[38] === 1) { // up
      DrawManager.board.y += 2;
    }
    if (ControllsManager.keysPressed[40] === 1) { // down
      DrawManager.board.y -= 2;
    }
    if (ControllsManager.keysPressed[37] === 1) { // left
      DrawManager.board.x += 2;
    }
    if (ControllsManager.keysPressed[39] === 1) { // right
      DrawManager.board.x -= 2;
    }
  }
}

var GameEventsController = {
  handleTick : function () {
    ControllsManager.detectKeys();
    DrawManager.scene.update();
  }
}
