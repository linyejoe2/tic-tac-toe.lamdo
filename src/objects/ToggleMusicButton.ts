import { Sprite, Texture } from "pixi.js";
import { GameObject } from "./GameObject";
import { ScenesManager } from "../system/ScenesManager";

//// 不要使用這種引用方式(打包)，因為 Jest 會報錯。
// import muteImage from '/picture/mute_rb.png';
// import soundImage from "/picture/soun_rb.png";

export class ToggleMusicButton extends GameObject {
  graph;

  //// 不要使用這種引用方式，打包時會認定你要去根目錄底下的 /picture/ 所以會噴錯
  // private _muteTextUre = Texture.from("/picture/mute_rb.png");
  // private _openTextUre = Texture.from("/picture/soun_rb.png");

  //// 使用這種引用方式，打包時會自動加上專案目錄 -> /tic-tac-toe.lamdo/picture/ 這樣才可以正常吃到檔案。
  private _muteTextUre = Texture.from("./picture/mute_rb.png");
  private _openTextUre = Texture.from("./picture/soun_rb.png");

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
