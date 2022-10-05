import { IGameObject } from "../interface/IGameObject";
import Scnens from "./Scenes";
import GameView from "../game/GameView";
import { ToggleMusicButton } from "../objects/ToggleMusicButton";

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
  constructor(isRobotMode: boolean) {
    super()
    this.element = [new GameView(isRobotMode,[40,30])];
    this.element.push(new ToggleMusicButton([10, 170]));
  }
}
