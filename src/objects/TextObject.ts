import { Vector } from "../types";
import { Text } from 'pixi.js';
import { IGameObject } from "../interface/IGameObject";

/**
 * 文本物件
 */
export class TextObject implements IGameObject {
  public visible: boolean;
  public text: Text;
  public position: Vector;

  /**
   * @param position 這個文本的中心點
   * @param text 文本內容
   */
  constructor(position: number[] = [0, 0], text = "") {
    this.visible = true;// 看的到
    this.position = {// 位置
      x: position[0],
      y: position[1]
    };
    this.text = new Text(text, {
      fontFamily: "Slabo",// 字型
      fontSize: 20,// 大小
      fill: ["#07344d"]// 顏色
    });
    this.text.x = this.position.x - this.text.width / 2;// 左右置中
    this.text.y = this.position.y - this.text.height / 2;// 上下置中
  }
}
