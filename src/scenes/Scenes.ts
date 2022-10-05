import { Application } from "pixi.js";
import { APPSIZE } from "../const";
import { IGameObject } from "../interface/IGameObject";
import { IScenes } from "../interface/IScencs";
import renderer from "../system/renderer";
import resizer from "../system/resizer";

/**
 * 場景抽象類別 
 */
export default abstract class implements IScenes {
  public abstract element: IGameObject[];// 這個場景裡的所有物件
  public abstract name: string;// 這個場景的名稱
  public app: Application;// 這個場景的畫布

  constructor() {
    this.app = new Application({
      width: APPSIZE.width,// 寬度
      height: APPSIZE.height,// 高度
      resolution: 4,// 放大倍數
      backgroundColor: 0x22516b,// 畫布背景顏色
    })
  }

  /**
   * 在畫布上繪製場景裡的物件。
   */
  public render(): void {
    this.app.stage.destroy;
    renderer(this.app, this.element);
    resizer(this.app);
    document.querySelector("#app")?.append(this.app.view);
  }
}
