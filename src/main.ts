import "./style/style.css";
import { Application } from 'pixi.js';
import MenuScenes from "./scenes/MenuScenes";

const app = new Application({
  width: 200,// 寬度
  height: 200,// 高度
  resolution: 4,// 放大倍數
  backgroundColor: 0x22516b// 畫布背景顏色
})

document.querySelector("#app")?.append(app.view);

const menuSenes = new MenuScenes;
menuSenes.render(app);

// Listen for frame updates
app.ticker.add(() => {
  return;
});
