import { Button } from "../objects/Button";
import { IGameObject } from "../interface/IGameObject";
import { TextObject } from "../objects/TextObject";
import Scnens from "./Scenes";

/**
 * 結束場景
 */
export default class extends Scnens {
  public element: IGameObject[];
  public name = "EndGameScenes";

  constructor() {
    super();
    this.element = [new Button([85, 130], "回到主選單", "MenuScenes")];
    this.element.push(new TextObject([100, 70], "你📕💡了，魯🐍"));
  }
}
