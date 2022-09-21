import Scenes from "../scenes/Scenes";

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
  private static _scenesMap: Map<string, Scenes> | undefined;
  // 現在作用中的場景
  private static _activeScenes: Scenes;
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
  public static add(scenes: Scenes, scenesName?: string): boolean {
    if (!scenesName) scenesName = scenes.name;
    if (!this._scenesMap) this._scenesMap = new Map();
    if (this._scenesMap.has(scenesName)) return false;
    this._scenesMap.set(scenesName, scenes);
    return true;
  }

  /**
   * 場景切換
   * @param name 要去的場景的名稱
   */
  public static ChangeScenes(name: string): void {
    if (!this._scenesMap) return;
    if (this._scenesMap.has(name)) {
      // 刪除 DOM 上原本的場景
      try {
        this._activeScenes.app.view.remove();
      } catch (e) { /* empty */ }
      // 更改場景
      this._activeScenes = this._scenesMap.get(name)!;
      // 渲染物件
      this._activeScenes?.render();
      // 在 DOM 上繪製
      document.querySelector("#app")?.append(this._activeScenes.app.view);
    }
  }
}
