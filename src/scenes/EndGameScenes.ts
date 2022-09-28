import { Button } from "../objects/Button";
import { IGameObject } from "../interface/IGameObject";
import { TextObject } from "../objects/TextObject";
import Scnens from "./Scenes";
import renderer from "../system/renderer";
import { WINTEXT } from "../types";

/**
 * 結束場景
 */
export default class extends Scnens {
  public element: IGameObject[];
  public name = "EndGameScenes";
  public winner = -1;

  constructor() {
    super();
    this.element = [new Button("回到主選單", [85, 130], "MenuScenes")];
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
        this.element.push(new TextObject([100, 70], WINTEXT.circleWin));
        break;
      case 2:
        this.element.push(new TextObject([100, 70], WINTEXT.forkWin));
        break;
      case 0:
        this.element.push(new TextObject([100, 70], WINTEXT.tie));
        break;
      case -1:
        this.element.push(new TextObject([100, 70], WINTEXT.default));
        break;
      default:
        this.element.push(new TextObject([100, 70], WINTEXT.default));
        break;
    }
    for (const ele of this.element) {
      renderer(this.app, ele);
    }
  }
}
