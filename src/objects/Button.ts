import { Graphics } from "pixi.js"
import { GameObject } from "./GameObject";
import { Text } from 'pixi.js';
import { ScenesManager } from "../system/ScenesManager";
import { sound } from "@pixi/sound";
const scenesManager = ScenesManager;
export class Button extends GameObject {
  graph;
  public text: string;

  /**
   * 點擊切換場景事件
   * @param scenesName 要切換的場景的名稱
   */
  public clickFunc = (scenesName: string) => {
    ScenesManager.ChangeScenes(scenesName);
  }

  constructor(_text: string, position: number[] = [0, 0], goto?: string) {
    super(position);
    this.graph = new Graphics();
    this.graph.beginFill(0x213547);
    this.graph.drawRoundedRect(0, 0, 40, 15, 2);
    this.graph.endFill();
    this.graph.interactive = true;// 響應交互
    this.graph.buttonMode = true;// 滑鼠會變成點擊

    // 把設定好的文字塞進去
    this.text = _text;
    const textTemp = new Text(_text, {
      fontSize: 6,
      fill: ["#246080"]
    });
    this.graph.addChild(textTemp);
    this.graph.getChildAt(0).x = this.graph.width / 2 - textTemp.width / 2;// 文字左右置中
    this.graph.getChildAt(0).y = this.graph.height / 2 - textTemp.height / 2;// 文字上下置中

    // 設定滑鼠點擊事件
    if (goto) {
      this.graph.on("pointerdown", () => {
        this.clickFunc(goto);
      });
    }
  }
}

export class SettingButton extends GameObject {
  graph;

  constructor(position: number[] = [0, 0], text?: string) {
    super(position);
    this.graph = new Graphics();
    this.graph.beginFill(0x213547);
    this.graph.drawRoundedRect(0, 0, 40, 15, 2);
    this.graph.endFill();
    this.graph.interactive = true;// 響應交互
    this.graph.buttonMode = true;// 滑鼠會變成點擊

    // 把設定好的文字塞進去
    if (text) {
      const textTemp = new Text(text, {
        fontSize: 6,
        fill: ["#246080"]
      });
      this.graph.addChild(textTemp);
      this.graph.getChildAt(0).x = this.graph.width / 2 - textTemp.width / 2;// 文字左右置中
      this.graph.getChildAt(0).y = this.graph.height / 2 - textTemp.height / 2;// 文字上下置中
    }
    this.graph.on("pointerdown", () => {
      scenesManager.toggleBgm();
    });

  }
}
