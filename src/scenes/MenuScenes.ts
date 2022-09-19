import { Application, Graphics } from "pixi.js";
import { Button } from "../objects/Button";
import { GameObject } from "../objects/GameObject";


export default class {
  public element: GameObject[];

  constructor() {
    this.element = [new Button([20, 20])];
  }

  public render(app:Application): void{
    for (const ele of this.element) {
      app.stage.addChild(ele.graph);
      ele.graph.position.set(ele.position.x, ele.position.y);
    }
  }
}