import { Application, Graphics, InteractionEvent, TextStyle } from "pixi.js"
import { Vector } from "../types";
import { GameObject } from "./GameObject";
import { Text } from 'pixi.js';

export class Button extends GameObject {
  public visible: boolean;
  graph: Graphics;

  constructor(position: number[] = [0, 0], text = "") {
    super(position);
    this.visible = false;
    this.graph = new Graphics();
    this.graph.beginFill(0x213547)
    this.graph.drawRoundedRect(0, 0, 30, 8, 2);
    this.graph.endFill()
    const textTemp = new Text(text, { 
      fontSize: 4 ,
      fill: ["#246080"]
    });
    this.graph.addChild(textTemp);
    this.graph.getChildAt(0).x = this.graph.width / 2 - textTemp.width / 2;
    this.graph.getChildAt(0).y = this.graph.height / 2 - textTemp.height / 2;
    this.graph.interactive = true;//响应交互
    this.graph.buttonMode = true;//鼠标变手型
    this.graph.on("pointerdown", (event: InteractionEvent) => {
      console.log("graphics")
    })
  }
}