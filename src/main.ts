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
scenesManager.add(new GameScenes(false));// 2P遊戲畫面
scenesManager.add(new GameScenes(true), "GameScenesWithRobot");// 1P遊戲畫面
scenesManager.add(new EndGameScenes());// 結尾畫面

scenesManager.ChangeScenes("GameScenesWithRobot");
// 設定初始場景
scenesManager.activeScenes.app.ticker.add(() => {
  if (scenesManager.activeScenes.element[0] instanceof GameView) {

    scenesManager.activeScenes.element[0].render!();
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
document.addEventListener("pointerup", async function () {

  // 加入音樂
  sound.add("bgm", "./music/bgm.mp3");
  // 播放
  await sound.play("bgm");
  // 循環
  sound.find("bgm").loop = true;
  // 只做一次
}, { once: true });
