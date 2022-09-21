import { Application, IApplicationOptions } from "pixi.js";
import { Button } from "../objects/Button";
import { IGameObject } from "../objects/IGameObject";
import { TextObject } from "../objects/TextObject";
import { ScenesManager } from "../system/ScenesManager";
import Scnens from "./Scenes";

export default class extends Scnens {
  public element: IGameObject[];
  public name = "MenuScenes";
  // public textElement: TextObject[];

  constructor() {
    super()
    this.element = [new Button([45, 130], "跟朋友一起玩", "EndGameScenes")];
    this.element.push(new Button([125, 130], "跟機器人玩", "EndGameScenes"));
    this.element.push(new TextObject([100, 70], "Tic-Tac-Toe.Lamdo"));
  }

  checkClick(): void {
    for (const ele of this.element) {
      if (ele instanceof Button && ele.clicked) {
        return;
      }
    }
  }

  // public render(app: Application): void {
  //   for (const ele of this.element) {
  //     renderer(app, ele);
  //   }
  //   for (const ele of this.textElement) {
  //     renderer(app, ele);
  //   }
  // }
}
