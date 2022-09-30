import { sound } from "@pixi/sound";
import { IScenes } from "../interface/IScencs";
import GameScenes from "../scenes/GameScenes";
import { TScenes } from "../types";

/**
 * 場景管理器 class
 */
export class ScenesManager {
  // 單例模式設定 //
  // --------------
  private static instance: ScenesManager;
  constructor() { }
  public static get Instance(): ScenesManager {
    if (!ScenesManager.instance) {
      ScenesManager.instance = new ScenesManager();
    }
    return ScenesManager.instance;
  }
  // -----------------
  // 單例模式設定 //

  // 場景管理器裡儲存的場景
  private static _scenesMap: Map<string, IScenes> | undefined;
  // 現在作用中的場景
  private static _activeScenes: IScenes;
  // 存取現在作用中的場景
  public static get activeScenes() {
    return this._activeScenes;
  }

  /**
   * 加入場景
   * @param scenes 場景物件
   * @param scenesName 場景的名稱，可選，不定義就是直接去抓場景物件的名稱
   * @returns 加入是否成功，不成功代表有加過了。
   */
  public static add(scenes: IScenes, scenesName?: string): boolean {
    if (!scenesName) scenesName = scenes.name;
    if (!this._scenesMap) this._scenesMap = new Map();
    if (this._scenesMap.has(scenesName)) {
      this._scenesMap.set(scenesName, scenes);
      return false;

    }
    this._scenesMap.set(scenesName, scenes);
    return true;
  }

  /**
 * 加入場景
 * @param scenes 場景物件
 * @param scenesName 場景的名稱，可選，不定義就是直接去抓場景物件的名稱
 * @returns 加入是否成功，不成功代表有加過了。
 */
  public static get(scenesName: TScenes): IScenes | undefined {
    return this._scenesMap?.get(scenesName);
  }

  /**
   * 場景切換
   * @param name 要去的場景的名稱
   */
  public static ChangeScenes(name: TScenes): void {
    if (!this._scenesMap) return;
    if (this._scenesMap.has(name)) {
      if (name === "GameScenes") this._scenesMap.set("GameScenes", new GameScenes());
      // if (name === "MenuScenes") this._scenesMap.set("MenuScenes", new MenuScenes());
      // if (name === "EndGameScenes") this._scenesMap.set("EndGameScenes", new EndGameScenes());
      // 刪除 DOM 上原本的場景
      try {
        this._activeScenes.app.view.remove();
      } catch (e) { /* empty */ }
      // 更改場景
      this._activeScenes = this._scenesMap.get(name)!;
      this._activeScenes?.render();
      // 在 DOM 上繪製
      console.log(this._activeScenes);
      document.querySelector("#app")?.append(this._activeScenes.app.view);
    }
  }

  public static toggleBgm(): void {
    // 如果還沒有加入音樂，就加進去
    if (!sound.exists("bgm")) {
      return;
      // sound.resumeAll();
    }
    // 如果還沒開始撥放，就放，然後循環。
    if (!sound.find("bgm").isPlaying) {
      sound.find("bgm").play();
      sound.find("bgm").loop = true;
      console.log("BGM開始");
    } else {
      // 已經在放了，就停。
      sound.find("bgm").stop();
      console.log("BGM關閉");
    }
  }
}
