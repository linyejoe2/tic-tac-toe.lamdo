import { Application } from "pixi.js";
import { IGameObject } from "../interface/IGameObject";
import renderer from "../system/renderer";

/**
 * 場景抽象類別 
 */
export default abstract class {
  public abstract element: IGameObject[]; // 這個場景裡的所有物件
  public abstract name: string; // 這個場景的名稱
  public app: Application; // 這個場景的畫布

  constructor() {
    this.app = new Application({
      width: 200,// 寬度
      height: 200,// 高度
      resolution: 4,// 放大倍數
      backgroundColor: 0x22516b// 畫布背景顏色
    })
  }

  /**
   * 在畫布上繪製場景裡的物件。
   */
  public render(): void {
    this.app.stage.destroy;
    for (const ele of this.element) {
      renderer(this.app, ele);
    }
  }
}
