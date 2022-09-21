import { IApplicationOptions } from "pixi.js";
import { Button } from "../objects/Button";
import { IGameObject } from "../objects/IGameObject";
import { TextObject } from "../objects/TextObject";
import Scnens from "./Scenes";

export default class extends Scnens {
  public element: IGameObject[];
  public name = "EndGameScenes";

  constructor() {
    super();
    this.element = [new Button([85, 130], "回到主選單", "MenuScenes")];
    this.element.push(new TextObject([100, 70], "你📕💡了，魯🐍"));
  }

  // public render(app: Application): void {
  //   for (const ele of this.element) {
  //     renderer(app, ele);
  //   }
  // }

  // public toggleVisible(): void {
  //   for (const ele of this.element) {
  //     if (ele.visible != undefined) {
  //       ele.visible ? ele.visible = false : ele.visible;
  //     }
  //   }
  // }
}
