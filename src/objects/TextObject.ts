import { Application, Graphics, InteractionEvent, TextStyle } from "pixi.js"
import { Vector } from "../types";
import { GameObject } from "./GameObject";
import { Text } from 'pixi.js';
import { IGameObject } from "./IGameObject";

export class TextObject implements IGameObject {
  public visible: boolean;
  public text: Text;
  public position: Vector;

  constructor(position: number[] = [0, 0], text = "") {
    this.visible = true;
    this.position = {
      x: position[0],
      y: position[1]
    };
    this.text = new Text(text, {
      fontFamily: "Slabo",
      fontSize: 20,
      fill: ["#07344d"]
    });
    this.text.x = this.position.x - this.text.width / 2;
    this.text.y = this.position.y - this.text.height / 2;
  }
}