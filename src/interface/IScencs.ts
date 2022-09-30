import { Application } from "pixi.js";
import { IGameObject } from "./IGameObject";

export interface IScenes {
  element: IGameObject[],// 這個場景裡的所有物件
  name: string,// 這個場景的名稱
  app: Application,// 這個場景的畫布
  winner?: number// 贏家是誰
  render(): void// 渲染自己在自己的 app 上
}
