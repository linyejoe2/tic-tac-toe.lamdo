import { Graphics } from "pixi.js";
import { Vector } from "../types";

export abstract class GameObject {
  public abstract graph: Graphics;
  public position: Vector;


  constructor(position: number[] = [0, 0]) {
    this.position = {
      x: position[0],
      y: position[1]
    };
  }
}