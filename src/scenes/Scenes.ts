import { Application } from "pixi.js";
import { IGameObject } from "../objects/IGameObject";
import renderer from "../system/renderer";

export default abstract class {
  public abstract element: IGameObject[];
  public abstract name: string;

  public render(app: Application): void {
    app.stage.destroy;
    for (const ele of this.element) {
      renderer(app, ele);
    }
  }

  public toggleVisible(app: Application): void {
    for (const ele of this.element) {
      if (ele.visible != undefined) {
        ele.visible ? ele.visible = false : ele.visible;
      }
    }
    this.render(app);
  }
}