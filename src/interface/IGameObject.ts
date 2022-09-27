import { Application, Graphics, Text } from "pixi.js";
import { Vector } from "../types";

export interface IGameObject {
  graph?: Graphics;// 他可能會是圖像物件
  text?: Text|string;// 他可能會是文字物件
  position: Vector;// 物件的位置
  visible?: boolean;// 他看不看的到
  // clicked?: boolean;// 有沒有被點擊
  render?: (app:Application) => void;// 自己可以處理自己的渲染
}

export interface IButton {
  graph: Graphics;// 他會有一個圖像
  text: string;// 他會有一個文字，等於傳入值
  position: Vector;// 他會有位置
  visible: boolean;// 他看不看的到
  // clicked: boolean;// 他要可以點擊
}
