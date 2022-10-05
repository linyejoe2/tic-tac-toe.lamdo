import Scnens from "./Scenes";
import { IChoseChestScenes } from "../interface/IScencs";
import { ButtonV2 } from "../objects/ButtonV2";
import { TextObject } from "../objects/TextObject";
import { IGameObject } from "../interface/IGameObject";
import { CHOSECHESTTEXT } from "../const";

/**
 * 結束場景
 */
export default class extends Scnens implements IChoseChestScenes {
  public element: IGameObject[];
  public name = "ChoseChestScenes";
  public winner = -1;

  constructor() {
    super();
    this.element = [new ButtonV2(CHOSECHESTTEXT.choseCircle, [65, 150], "GameScenesWithRobot")
      , new ButtonV2(CHOSECHESTTEXT.choseFork, [135, 150], "MenuScenes", [45, 15])
      // , new ButtonV2("機器人自己玩", [165, 100], "MenuScenes")
    ];
    this.element.push(new TextObject([100, 70], CHOSECHESTTEXT.title));
    // this.element.push(new ToggleMusicButton([10, 170]));
  }

}
