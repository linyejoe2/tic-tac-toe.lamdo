import { Graphics, Text } from "pixi.js";
import { Vector } from "../types";

export interface IGameObject {
  graph?: Graphics;// 他可能會是圖像物件
  text?: Text;// 他可能會是文字物件
  position: Vector;// 物件的位置
  visible?: boolean;// 他看不看的到
  clicked?: boolean;// 有沒有被點擊
}
