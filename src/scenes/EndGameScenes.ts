import { Button,SettingButton } from "../objects/Button";
import { IGameObject } from "../interface/IGameObject";
import { TextObject } from "../objects/TextObject";
import Scnens from "./Scenes";
import renderer from "../system/renderer";

/**
 * 結束場景
 */
export default class extends Scnens {
  public element: IGameObject[];
  public name = "EndGameScenes";
  public winner = -1;

  constructor() {
    super();
    this.element = [new Button([85, 130], "回到主選單", "MenuScenes")];
    this.element.push(new SettingButton([10,180],"BGM ON/OFF"));
  }

  /**
 * 在畫布上繪製場景裡的物件。
 */
  public render(): void {
    // if (this.app.stage.children.) this.app.stage.destroy();
    // this.app.stage.destroy();
    console.log(this.winner);
    switch (this.winner) {
      case 1:
        this.element.push(new TextObject([100, 70], "⭕贏麻了，魯🐍"));
        break;
      case 2:
        this.element.push(new TextObject([100, 70], "❌贏麻了，魯🐍"));
        break;
      case 0:
        this.element.push(new TextObject([100, 70], "玩個⭕⭕❌❌\n都沒有贏家，魯🐍"));
        break;
      case -1:
        this.element.push(new TextObject([100, 70], "還在施工中👷‍♂️，魯🐍"));
        break;

    }
    for (const ele of this.element) {
      renderer(this.app, ele);
    }
  }
}
