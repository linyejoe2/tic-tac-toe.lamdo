import { Application, Graphics } from "pixi.js";
import { GameObject } from "../objects/GameObject";
import { IGameObject } from "../interface/IGameObject";
import { TextObject } from "../objects/TextObject";

/**
 * 渲染器
 * @param app 要渲染的畫布
 * @param objs 要渲染的物件們
 */
export default function (app: Application, objs: IGameObject[]) {
  for (let ele of objs) {
    if (ele.visible === true) {
      if (ele instanceof GameObject) {
        app.stage.addChild(ele.graph);
        ele.graph.position.set(ele.position.x, ele.position.y);
      } else if (ele instanceof TextObject) {
        app.stage.addChild(ele.text);
      }
    }
  }
}
