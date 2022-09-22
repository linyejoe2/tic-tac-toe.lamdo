import { Application, Graphics, LineStyle } from "pixi.js";
import { GameObject } from "../objects/GameObject";
import { ChessBoard } from "./ChessBoard";

export default class GameView extends GameObject {
  public graph: Graphics = new Graphics();
  public currentPlayer = 1;
  public slots: Graphics[][] = [];
  public board: ChessBoard = new ChessBoard(3);
  private screenWidth = 100;
  private screenHeight = 100;
  private nByn = 3;

  constructor(position: number[] = [0, 0]) {
    super(position);
    // this.graph.position.set(...position);
  }

  /*
   *
   *
   */
  public DrawTicTacToeSlot() {
    //分格子
    const widthPart = this.screenWidth / this.nByn;
    const heightPart = this.screenHeight / this.nByn;
    const color = 0x777777;
    for (let y = 0; y < this.nByn; y++) {
      const lineHead: Graphics[] = [];
      this.slots.push(lineHead);
      for (let x = 0; x < this.nByn; x++) {
        const slot = new Graphics();
        slot.beginFill(color);
        //位移
        slot.drawRect(
          x * widthPart + 1,
          y * heightPart + 1,
          widthPart - 2,
          heightPart - 2
        );
        if (this.board.chesses[y][x] == 1) {
          //slot[y][x] = new Graphics();
          slot.lineStyle(1, 0xff0000);
          //slot.beginFill(0xff0000);
          slot.drawCircle(
            x * widthPart + widthPart / 2,
            y * heightPart + heightPart / 2,
            widthPart / 2
          );
        }
        //二是叉
        else if (this.board.chesses[y][x] == 2) {
          const lineWidth = 1;
          slot.beginFill(0xff0000);
          slot.drawPolygon(
            x * widthPart,
            y * heightPart + lineWidth,
            x * widthPart + lineWidth,
            y * heightPart,

            x * widthPart + widthPart,
            y * heightPart + heightPart - lineWidth,
            x * widthPart + widthPart - lineWidth,
            y * heightPart + heightPart
          );
          slot.beginFill(0xff0000);
          slot.drawPolygon(
            x * widthPart + widthPart - lineWidth,
            y * heightPart,
            x * widthPart + widthPart,
            y * heightPart + lineWidth,

            x * widthPart + lineWidth,
            y * heightPart + heightPart,
            x * widthPart,
            y * heightPart + heightPart - lineWidth
          );
        }

        slot.endFill();
        slot.interactive = true;
        slot.buttonMode = true;
        //點下去先提醒這是第幾塊地
        slot.on("pointerdown", () => {
          console.log(x, y);

          if (this.board.SetChess(x, y, this.currentPlayer)) {
            const winner = this.board.CheckAll(x, y);
            if (winner.find((temp) => temp)) {
              console.log("有贏家欸 贏家是" + (this.currentPlayer == 1 ? "O" : "X"));
              if (winner[0]) console.log("贏在第" + y + "橫排");
              if (winner[1]) console.log("贏在從左上到右下的斜線");
              if (winner[2]) console.log("贏在第" + x + "縱排");
              if (winner[3]) console.log("贏在從右上到左下的斜線");
            }
            //換人，哈
            console.log("換人");
            this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
          } else {
            console.log("這格有東西了");
          }
          //對格子做改動
        });
        this.slots[y].push(slot);
        lineHead.push(slot);
      }
    }
  }

  //畫線
  public DrawTicTacToeLine() {
    //用格數分成三等分
    const widthPart: number = this.screenWidth / this.nByn;
    const heightPart: number = this.screenHeight / this.nByn;
    const color = 0xffffff;
    for (let i = 1; i < this.nByn; i++) {
      this.graph.beginFill(color);
      this.graph.drawRect(0, heightPart * i, widthPart * this.nByn, 1);
      this.graph.drawRect(widthPart * i, 0, 1, heightPart * this.nByn);
    }

    this.graph.endFill();
  }
  public render(app: Application) {
    this.DrawTicTacToeSlot();
    this.DrawTicTacToeLine();
    this.graph.zIndex = 2;
    app.stage.addChild(this.graph);
    this.slots.forEach((slotColumn) => {
      slotColumn.forEach((slot) => {
        app.stage.addChild(slot);
        slot.zIndex = 1;
      });
    });
  }
}
