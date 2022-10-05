import { Application, Graphics, Sprite, Text, Texture } from "pixi.js";
import { Chesses, Vector } from "../types";

export interface IGameObject {
  graph?: Graphics | Texture | Sprite;// 他可能會是圖像物件
  text?: Text | string;// 他可能會是文字物件
  position: Vector;// 物件的位置
  visible?: boolean;// 他看不看的到
  // clicked?: boolean;// 有沒有被點擊
  render?: (app: Application) => void;// 自己可以處理自己的渲染
}

export interface IButton {
  graph: Graphics;// 他會有一個圖像
  position: Vector;// 他會有位置
  text: string;// 他會有一個文字，等於傳入值
  visible: boolean;// 他看不看的到
  // clicked: boolean;// 他要可以點擊
}

export interface IChessBoard {
  graph: Graphics;// 畫棋盤，畫棋子
  position: Vector;// 位置
  chesses: Chesses[][];// 放棋子，拿去判定
}

export interface IForkChess {
  graph: Graphics;
  position: Vector;
}

export interface ICircleChess {
  graph: Graphics;
  position: Vector;
}
