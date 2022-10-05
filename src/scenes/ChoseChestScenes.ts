import { Button } from "../objects/Button";
import Scnens from "./Scenes";
import { IChoseChestScenes } from "../interface/IScencs";

/**
 * 結束場景
 */
export default class extends Scnens implements IChoseChestScenes {
  public element: [Button, Button, Button];
  public name = "ChoseChestScenes";
  public winner = -1;

  constructor() {
    super();
    this.element = [new Button("我想當圈圈", [20, 100], "MenuScenes")
      , new Button("我想當叉叉", [100, 100], "MenuScenes")
      , new Button("機器人自己玩", [150, 100], "MenuScenes")];
    // this.element.push(new ToggleMusicButton([10, 170]));
  }

}
