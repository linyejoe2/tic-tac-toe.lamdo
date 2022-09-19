import { Application, Graphics } from "pixi.js";
import { Button } from "../objects/Button";
import { GameObject } from "../objects/GameObject";
import { TextObject } from "../objects/TextObject";


export default class {
  public element: GameObject[];
  public textElement: TextObject[];

  constructor() {
    this.element = [new Button([45, 130], "跟朋友一起玩")];
    this.element.push(new Button([125, 130], "跟機器人玩"));
    this.textElement = [new TextObject([100, 70], "Tic-Tac-Toe.Lamdo")];
  }

  public render(app: Application): void {
    for (const ele of this.element) {
      app.stage.addChild(ele.graph);
      ele.graph.position.set(ele.position.x, ele.position.y);
    }
    for (const ele of this.textElement) {
      app.stage.addChild(ele.text);
    }
  }
}