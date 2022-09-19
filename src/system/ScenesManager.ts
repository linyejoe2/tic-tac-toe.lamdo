import { Application } from "pixi.js";
import Scenes from "../scenes/Scenes";

export class ScenesManager {
  public scenesMap: Map<string, Scenes>;
  public activeScenes: Scenes;
  constructor(scenes: Scenes) {
    this.scenesMap = new Map();
    this.scenesMap.set(scenes.name, scenes);
    this.activeScenes = scenes;
  }

  add(scenes: Scenes) {
    this.scenesMap.set(scenes.name, scenes); 
  }
}

export function changeScenes(app: Application, scenes: Scenes) {
  app.stage.destroy;
  scenes.render(app);
}