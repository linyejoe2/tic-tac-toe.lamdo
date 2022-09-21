import { Application, IApplicationOptions } from "pixi.js";
import { IGameObject } from "../objects/IGameObject";
import renderer from "../system/renderer";
import { ScenesManager } from "../system/ScenesManager";
import MenuScenes from "./MenuScenes";

/**
 * 場景 abstract class 
 */
export default abstract class {
  public abstract element: IGameObject[];
  public abstract name: string;
  public app: Application;

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

  // public checkButtonClick(app: Application, scenesManager: ScenesManager) {
  //   for (const ele of this.element) {
  //     if (ele.clicked) {
  //       ele.clickfunc()
  //     }
  //   }
  // }
}
