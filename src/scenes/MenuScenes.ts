import { Button } from "../objects/Button";
import { IGameObject } from "../interface/IGameObject";
import { TextObject } from "../objects/TextObject";
import Scnens from "./Scenes";

/**
 * 開始(主菜單)畫面
 */
export default class extends Scnens {
  public element: IGameObject[];
  public name = "MenuScenes";

  /**
   * 初始化場景，塞入我預先想好想塞的所有物件
   * 其中包含按鈕( Button )以及文字( TextoObject )
   */
  constructor() {
    super()
    this.element = [new Button([45, 130], "跟朋友一起玩", "GameScenes")];
    this.element.push(new Button([125, 130], "跟機器人玩", "EndGameScenes"));
    this.element.push(new TextObject([100, 70], "Tic-Tac-Toe.Lamdo"));
  }
}
