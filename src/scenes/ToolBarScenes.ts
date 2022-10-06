import { IScenes } from "../interface/IScencs";
import { IGameObject } from "../interface/IGameObject";
import { APPSIZE } from "../const";
import { Application } from "pixi.js";
import { ToggleMusicButton } from "../objects/ToggleMusicButton";
import renderer from "../system/renderer";
import resizer from "../system/resizer";

/**
 * 功能列，常駐
 */
export default class implements IScenes {
  public element: IGameObject[];
  public name = "ToolBarScenes";
  public app: Application;// 這個場景的畫布

  constructor() {
    this.app = new Application({
      width: APPSIZE.width,// 寬度
      height: APPSIZE.height,// 高度
      
      resolution: 4,// 放大倍數
      backgroundAlpha: 0// 透明 
    })
    this.element = [new ToggleMusicButton([120, 170])];

    // game loop
    this.app.ticker.add(() => {
      (this.element[0] as ToggleMusicButton).updateTexture();
    })
  }

  /**
  * 在畫布上繪製場景裡的物件。
  */
  public render(): void {
    this.app.stage.destroy;
    renderer(this.app, this.element);
    resizer(this.app);
    // document.querySelector("#app")?.append(this.app.view);
  }
}
