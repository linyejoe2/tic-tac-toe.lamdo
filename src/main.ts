/*
<<<<<<< HEAD
import "./style.css";
import { Application } from 'pixi.js';
import Game from "./Game/GameView";
const app = new Application({
  width: 100,// 寬度
  height: 100,// 高度
  resolution: 5// 放大倍數
})

document.querySelector("#app")?.append(app.view);

const game1 = new Game(app,true);
// Listen for frame updates
app.ticker.add(() => {
  app.stage.removeChildren();
  game1.render(app);

});
=======
*/
import "./style/style.css";
import MenuScenes from "./scenes/MenuScenes";
import EndGameScenes from "./scenes/EndGameScenes";
import { ScenesManager } from "./system/ScenesManager";
import GameScenes from "./scenes/GameScenes";
import GameView from "./game/GameView";

// 初始化場景管理員
const scenesManager = ScenesManager;
// 導入場景
scenesManager.add(new MenuScenes());// 開始畫面
scenesManager.add(new GameScenes());// 遊戲畫面
scenesManager.add(new EndGameScenes());// 結尾畫面
// 設定初始場景
scenesManager.ChangeScenes("MenuScenes");

scenesManager.activeScenes.app.ticker.add(() => {
  if (scenesManager.activeScenes.element[0] instanceof GameView) {
    scenesManager.activeScenes.element[0].render!(/*scenesManager.activeScenes.app*/);
  }
})
//>>>>>>> ee89ec5acbd7a51e0f55f3b347f77825453e5556
