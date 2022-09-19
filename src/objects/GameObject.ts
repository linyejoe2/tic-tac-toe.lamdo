import { Graphics } from "pixi.js";
import { Vector } from "../types";
import { IGameObject } from "./IGameObject";

export abstract class GameObject implements IGameObject {
  public abstract graph: Graphics;
  public position: Vector;


  constructor(position: number[] = [0, 0]) {
    this.position = {
      x: position[0],
      y: position[1]
    };
  }
}