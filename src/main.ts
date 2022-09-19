import "./style.css";
import { Application } from 'pixi.js';
import Crab from "./Crab";
import Game from "./Game";
const app = new Application({
  width: 100,// 寬度
  height: 100,// 高度
  resolution: 5// 放大倍數
})

document.querySelector("#app")?.append(app.view);

const crab1 = new Crab({ x: 50, y: 50 });
const game1 = new Game();
// Listen for frame updates
app.ticker.add(() => {
  app.stage.removeChildren();
  game1.render(app);
  crab1.render(app);
  crab1.update(app.ticker.deltaMS);

});