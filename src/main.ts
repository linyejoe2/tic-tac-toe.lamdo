import "./style/style.css";
import MenuScenes from "./scenes/MenuScenes";
import EndGameScenes from "./scenes/EndGameScenes";
import { ScenesManager } from "./system/ScenesManager";
import GameScenes from "./scenes/GameScenes";
import GameView from "./game/GameView";
import { sound } from "@pixi/sound";

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
    scenesManager.activeScenes.element[0].render!(scenesManager.activeScenes.app);
  }
})

// 音樂相關
/*
let toggleBgmButton: HTMLButtonElement = document.getElementById("toggleButton") as HTMLButtonElement;
toggleBgmButton.addEventListener("pointerup", function () {
  scenesManager.toggleBgm();
  toggleBgmButton.value === "BGM:ON" ? toggleBgmButton.value = "BGM:OFF" : toggleBgmButton.value = "BGM:ON";
});
*/
document.addEventListener("pointerup", function () {
  sound.add("bgm", "./music/bgm.wav");
  sound.play("bgm");
  sound.find("bgm").loop = true;
}, { once: true });

