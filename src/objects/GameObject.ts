import { Graphics, Sprite } from "pixi.js";
import { Vector } from "../types";
import { IGameObject } from "../interface/IGameObject";

/**
 * 所有物件的抽象類別
 */
export abstract class GameObject implements IGameObject {
  public abstract graph: Graphics | Sprite;
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
