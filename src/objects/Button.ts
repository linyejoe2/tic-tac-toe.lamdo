import { Application, Graphics, InteractionEvent, TextStyle } from "pixi.js"
import { Vector } from "../types";
import { GameObject } from "./GameObject";
import { Text } from 'pixi.js';
import Scenes from "../scenes/Scenes";
import { ScenesManager } from "../system/ScenesManager";

export class Button extends GameObject {
  public visible: boolean;
  graph;

  constructor(position: number[] = [0, 0], text = "") {
    super(position);
    this.visible = true;
    this.graph = new Graphics();
    this.graph.beginFill(0x213547)
    this.graph.drawRoundedRect(0, 0, 40, 15, 2);
    this.graph.endFill()
    const textTemp = new Text(text, {
      fontSize: 6,
      fill: ["#246080"]
    });
    this.graph.addChild(textTemp);
    this.graph.getChildAt(0).x = this.graph.width / 2 - textTemp.width / 2; // 置中
    this.graph.getChildAt(0).y = this.graph.height / 2 - textTemp.height / 2; // 置中
    this.graph.interactive = true; // 響應交互
    this.graph.buttonMode = true; // 滑鼠會變成點擊
    this.graph.on("pointerdown", () => {
      // scenesManager.activeScenes = scenesManager.scenesMap.get("EndGameScenes")!;
      // scenesManager.activeScenes.render(app)
    });
  }
}