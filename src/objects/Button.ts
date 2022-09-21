import { Application, Graphics, InteractionEvent, TextStyle } from "pixi.js"
import { Vector } from "../types";
import { GameObject } from "./GameObject";
import { Text } from 'pixi.js';
import Scenes from "../scenes/Scenes";
import { ScenesManager } from "../system/ScenesManager";

export class Button extends GameObject {
  graph;
  public clicked: boolean;
  public clickFunc = (scenesName: string) => {
    ScenesManager.ChangeScenes(scenesName);
  }

  constructor(position: number[] = [0, 0], text = "", goto?: string) {
    super(position);
    this.clicked = false;
    this.graph = new Graphics();
    this.graph.beginFill(0x213547)
    this.graph.drawRoundedRect(0, 0, 40, 15, 2);
    this.graph.endFill()
    const textTemp = new Text(text, {
      fontSize: 6,
      fill: ["#246080"]
    });
    this.graph.addChild(textTemp);
    this.graph.getChildAt(0).x = this.graph.width / 2 - textTemp.width / 2; // 左右置中
    this.graph.getChildAt(0).y = this.graph.height / 2 - textTemp.height / 2; // 上下置中
    this.graph.interactive = true; // 響應交互
    this.graph.buttonMode = true; // 滑鼠會變成點擊

    if (goto) {
      this.graph.on("pointerdown", () => {
        this.clickFunc(goto);
      });
    }
  }
}
