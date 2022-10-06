import { Application } from "pixi.js";
import { ToggleMusicButton } from "../objects/ToggleMusicButton";
import { IGameObject } from "./IGameObject";

export interface IScenes {
  element: IGameObject[] | ToggleMusicButton[],// 這個場景裡的所有物件
  name: string,// 這個場景的名稱
  app: Application,// 這個場景的畫布
  winner?: number,// 贏家是誰
  render(): void// 渲染自己在自己的 app 上
}

export interface IChoseChestScenes {
  // 我要當圈圈，我要當叉叉
  element: IGameObject[],
  name: string,
  app: Application,
  render(): void
}

export interface IGameScenes {
  mode: "0P" | "1P" | "2P",// 分別對應電腦自己玩，一個玩家，兩個玩家
  element: IGameObject[],// 棋盤，棋子
  name: "GameScenes"// 名稱
  app: Application,// 畫布
  chkWinner(): void,// 查看有沒有贏家，有就直接跳到結局了
  render(): void// 渲染
}
