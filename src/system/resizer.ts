import { Application, autoDetectRenderer, Graphics, RenderTexture, Sprite, Texture } from "pixi.js";
import { GameObject } from "../objects/GameObject";
import { IGameObject } from "../interface/IGameObject";
import { TextObject } from "../objects/TextObject";
import renderer from "../system/renderer";

/**
 * 修正畫布大小[器]
 * @param app 要修正的畫布
 */
export default function (app: Application, objs: IGameObject[]): void {
  let size = [200, 200];
  let ratio = size[0] / size[1];
  // document.body.appendChild(renderer.view);
  // let r1 = Texture.from("/picture/mute_rb.png");
  // let block = new Sprite(r1);
  // block.position.x = 100;
  // block.position.y = 100;
  // block.anchor.x = .5;
  // block.anchor.y = .5;
  renderer(app, objs);
  function resize() {
    let w: number;
    let h: number;
    const iw = window.innerWidth - 64;
    const ih = window.innerHeight - 64;
    if (iw / ih >= ratio) {
      w = ih * ratio;
      h = ih;
    } else {
      w = iw;
      h = iw / ratio;
    }
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';
  }
  resize()
  window.onresize = resize;
}
