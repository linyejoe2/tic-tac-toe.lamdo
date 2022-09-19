import { Application, Graphics, InteractionEvent } from "pixi.js"
import { Vector } from "../types";
import { GameObject } from "./GameObject";

export class Button extends GameObject {
  public visible: boolean;
  graph: Graphics;

  constructor(position: number[] = [0, 0]) {
    super(position);
    this.visible = false;
    this.graph = new Graphics();
    this.graph.beginFill(0x0bef47)
    this.graph.drawCircle(20, 20, 5)
    this.graph.endFill()
    this.graph.interactive = true;//响应交互
    this.graph.buttonMode = true;//鼠标变手型
    this.graph.on("pointerdown", (event: InteractionEvent) => {
      console.log("graphics")
    })
  }
}