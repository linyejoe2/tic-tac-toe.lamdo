import { Graphics } from "pixi.js";
import { Vector } from "../types";
import { IGameObject } from "./IGameObject";

export abstract class GameObject implements IGameObject {
  public abstract graph: Graphics;
  public position: Vector;
  public visible: boolean;

  constructor(position: number[] = [0, 0]) {
    this.visible = true;
    this.position = {
      x: position[0],
      y: position[1]
    };
  }
}
