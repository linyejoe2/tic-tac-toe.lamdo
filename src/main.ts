import "./style.css";
import { Application } from 'pixi.js';
import Game from "./Game/GameView";
const app = new Application({
  width: 100,// 寬度
  height: 100,// 高度
  resolution: 5// 放大倍數
})

document.querySelector("#app")?.append(app.view);

const game1 = new Game(app,true);
// Listen for frame updates
app.ticker.add(() => {
  app.stage.removeChildren();
  game1.render(app);

});
