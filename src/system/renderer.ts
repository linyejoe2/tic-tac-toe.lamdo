import { Application } from "pixi.js";
import { GameObject } from "../objects/GameObject";
import { IGameObject } from "../objects/IGameObject";
import { TextObject } from "../objects/TextObject";

export default function (app: Application, obj: IGameObject) {
  if (obj.visible === true) {
    if (obj instanceof GameObject) {
      app.stage.addChild(obj.graph);
      obj.graph.position.set(obj.position.x, obj.position.y);
    } else if (obj instanceof TextObject) {
      app.stage.addChild(obj.text);
    }
  }
}
