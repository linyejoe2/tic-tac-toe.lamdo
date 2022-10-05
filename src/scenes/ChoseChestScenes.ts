import { Button } from "../objects/Button";
import Scnens from "./Scenes";
import { IChoseChestScenes } from "../interface/IScencs";
import { ButtonV2 } from "../objects/ButtonV2";

/**
 * 結束場景
 */
export default class extends Scnens implements IChoseChestScenes {
  public element: [Button, Button, Button];
  public name = "ChoseChestScenes";
  public winner = -1;

  constructor() {
    super();
    this.element = [new ButtonV2("我想當圈圈", [33, 100], "GameScenesWithRobot")
      , new ButtonV2("我想當叉叉", [100, 100], "MenuScenes")
      , new ButtonV2("機器人自己玩", [165, 100], "MenuScenes")];
    // this.element.push(new ToggleMusicButton([10, 170]));
  }

}
