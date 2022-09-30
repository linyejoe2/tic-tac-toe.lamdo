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
scenesManager.add(new GameScenes(false));// 2P遊戲畫面
scenesManager.add(new GameScenes(true),"GameScenesWithRobot");// 1P遊戲畫面
scenesManager.add(new EndGameScenes());// 結尾畫面
// 設定初始場景
scenesManager.ChangeScenes("MenuScenes");

scenesManager.activeScenes.app.ticker.add(() => {
  if (scenesManager.activeScenes.element[0] instanceof GameView) {

    scenesManager.activeScenes.element[0].render!();
  }
})
