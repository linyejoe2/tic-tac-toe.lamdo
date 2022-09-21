import { Application } from "pixi.js";
import { GameObject } from "../objects/GameObject";
import { IGameObject } from "../interface/IGameObject";
import { TextObject } from "../objects/TextObject";

/**
 * 渲染器
 * @param app 要渲染的畫布
 * @param obj 要渲染的物件
 */
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
