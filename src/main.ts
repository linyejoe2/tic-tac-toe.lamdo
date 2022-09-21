import "./style/style.css";
import { Application } from 'pixi.js';
import MenuScenes from "./scenes/MenuScenes";
import EndGameScenes from "./scenes/EndGameScenes";
import { ScenesManager } from "./system/ScenesManager";

// 初始化遊戲畫面
const app = new Application({
  width: 200,// 寬度
  height: 200,// 高度
  resolution: 4,// 放大倍數
  backgroundColor: 0x22516b// 畫布背景顏色
})
// document.querySelector("#app")?.append(app.view);

// 初始化場景管理員
const scenesManager = ScenesManager;
// 導入第一個場景
scenesManager.add(new MenuScenes());
scenesManager.add(new EndGameScenes());
// 設定初始場景
scenesManager.ChangeScenes("MenuScenes");

// Listen for frame updates
app.ticker.add(() => {
  return;
});
