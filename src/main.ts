import "./style.css";
import { Application } from 'pixi.js';

const app = new Application({
  width: 200,// 寬度
  height: 200,// 高度
  resolution: 4// 放大倍數
})

document.querySelector("#app")?.append(app.view);


// Listen for frame updates
app.ticker.add(() => {
});
