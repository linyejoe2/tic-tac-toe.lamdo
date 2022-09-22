import { IGameObject } from "../interface/IGameObject";
import Scnens from "./Scenes";
import GameView from "../game/GameView";
import { Button } from "../objects/Button";

/**
 * 開始(主菜單)畫面
 */
export default class extends Scnens {
  public element: IGameObject[];
  public name = "GameScenes";

  /**
   * 初始化場景，塞入我預先想好想塞的所有物件
   * 其中包含按鈕( Button )以及文字( TextoObject )
   */
  constructor() {
    super()
    this.element = [new Button([85, 130], "回到主選單", "MenuScenes")];
    this.element = [new GameView([100, 100])];
    // this.element = [new Button([45, 130], "跟朋友一起玩", "GameScenes")];
  }

  /**
 * 在畫布上繪製場景裡的物件。
 */
  public render(): void {
    if (this.element[0] instanceof GameView) {
      this.element[0].render(this.app);
    }
  }
}
