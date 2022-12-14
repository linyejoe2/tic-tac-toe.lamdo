import { Sprite, Texture } from "pixi.js";
import { GameObject } from "./GameObject";
import { ScenesManager } from "../system/ScenesManager";
// import muteImage from '/picture/mute_rb.png';
// import soundImage from "/picture/soun_rb.png";

export class ToggleMusicButton extends GameObject {
  graph;

  // private _muteTextUre = Texture.from("/picture/mute_rb.png");
  // private _openTextUre = Texture.from("/picture/soun_rb.png");
  private _muteTextUre = Texture.from("./picture/mute_rb.png");
  private _openTextUre = Texture.from("./picture/soun_rb.png");
  // private _muteTextUre = Texture.from(muteImage);
  // private _openTextUre = Texture.from(soundImage);

  constructor(position: number[] = [0, 0]) {
    super(position);
    ScenesManager.bgmStatus() ?
      this.graph = new Sprite(this._openTextUre) :
      this.graph = new Sprite(this._muteTextUre);
    // this.graph = new Sprite(this._openTextUre);
    this.graph.x = 0;
    this.graph.y = 0;
    this.graph.height = 15;
    this.graph.width = 15;
    // this.graph.beginFill(0x213547);
    // this.graph.drawRoundedRect(0, 0, 40, 15, 2);
    // this.graph.endFill();
    this.graph.interactive = true;// 響應交互
    this.graph.buttonMode = true;// 滑鼠會變成點擊

    // 把設定好的文字塞進去
    // if (text) {
    //   const textTemp = new Text(text, { fontSize: 6, fill: ["#246080"] });
    //   this.graph.addChild(textTemp);
    //   this.graph.getChildAt(0).x = this.graph.width / 2 - textTemp.width / 2;// 文字左右置中
    //   this.graph.getChildAt(0).y = this.graph.height / 2 - textTemp.height / 2;// 文字上下置中
    // }
    this.graph.on("pointerdown", () => {
      ScenesManager.toggleBgm();
      this.updateTexture();
      // 切換圖片舊寫法
      // (this.graph.texture === this._openTextUre) ? this.graph.texture = this._muteTextUre : this.graph.texture = this._openTextUre;
    });
  }

  public updateTexture(): void {
    // 如果在播，就顯示在播
    ScenesManager.bgmStatus() ? this.graph.texture = this._openTextUre : this.graph.texture = this._muteTextUre;
    setTimeout(() => {
      ScenesManager.bgmStatus() ? this.graph.texture = this._openTextUre : this.graph.texture = this._muteTextUre;
    }, 500);
  }
}
