import { Application } from "pixi.js";
import { Button } from "../objects/Button";
import { IGameObject } from "../objects/IGameObject";
import { TextObject } from "../objects/TextObject";
import { changeScenes } from "../system/ScenesManager";
import Scnens from "./Scenes";

export default class extends Scnens {
  public element: IGameObject[];
  public name = "MenuScenes";
  // public textElement: TextObject[];

  constructor() {
    super();
    this.element = [new Button([45, 130], "跟朋友一起玩")];
    this.element.push(new Button([125, 130], "跟機器人玩"));
    this.element.push(new TextObject([100, 70], "Tic-Tac-Toe.Lamdo"));
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
