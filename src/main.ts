import "./style.css";
import { Application, TextureSystem } from 'pixi.js';
import Crab from "./Crab";
import Game from "./Game/GameView";
const app = new Application({
  width: 100,// 寬度
  height: 100,// 高度
  resolution: 5// 放大倍數
})

document.querySelector("#app")?.append(app.view);

const crab1 = new Crab({ x: 50, y: 50 });
const game1 = new Game(app,true);
// Listen for frame updates
app.ticker.add(() => {
  app.stage.removeChildren();
  crab1.render(app);
  game1.render(app);
  crab1.update(app.ticker.deltaMS);

});
