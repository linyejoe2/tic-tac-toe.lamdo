import { Application, Graphics } from "pixi.js";
import { ChessBoard } from "./ChessBoard";

export default class GameView {
  public graphics: Graphics = new Graphics();
  public slots: Graphics[][] = [];
  public board: ChessBoard = new ChessBoard(true);
  private bingoLineGraphics: Graphics = new Graphics();
  private screenWidth = 100;
  private screenHeight = 100;
  private nByn = 3;

  constructor() {
    this.SetEventOnChessBoard();
  }

  //註冊當玩家勝利的事件
  private SetEventOnChessBoard(): void {
    this.board.PlayerWon.push(this.WhenWinnerOut);
    this.board.PlayerDraw = this.WhenDraw;
  }
  //當玩家勝利時會呼叫這個funciton，並從參數傳入勝利者 1為O 2為X
  //還沒加入勝利者在第幾排
  private WhenWinnerOut(winner: number): void {
    console.log("贏家出現了!!!!勝利者是:" + (winner == 1 ? "O" : "X"));
  }
  private WhenDraw() {
    console.log("平手，嫩");
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

        //點下去
        slot.on("pointerdown", () => {
          //設符號
          const setSuccessfully = this.board.SetChess(
            x,
            y,
            this.board.currentPlayer
          );
          //成功設置
          if (setSuccessfully) {
            x = setSuccessfully[1]?setSuccessfully[1]:x;
            y = setSuccessfully[2]?setSuccessfully[2]:y;
            
            if (this.board.bingoLines[0]>0) {
              console.log("贏在第" + this.board.lastY + "橫排");
            }
            if (this.board.bingoLines[1]>0) {
              console.log("贏在從左上到右下的斜線");
            }
            if (this.board.bingoLines[2]>0) {
              console.log("贏在第" + this.board.lastX + "縱排");
            }
            if (this.board.bingoLines[3]>0) {
              console.log("贏在從右上到左下的斜線");
            }

            //換人，哈
            console.log("換人");
          } else {
            console.log("這格有東西了");
          }
        });
        this.slots[y].push(slot);
        lineHead.push(slot);
      }
    }
    this.slots[0][0].endFill();
    this.bingoLineGraphics.beginFill(0xff0000);
    //橫線
    if (this.board.bingoLines[0] > -1) {
      this.bingoLineGraphics.drawPolygon(
        0,
        (this.board.bingoLines[0] * this.screenHeight) / this.nByn +
          this.screenHeight / this.nByn / 2,
        this.screenWidth,
        (this.board.bingoLines[0] * this.screenHeight) / this.nByn +
          this.screenHeight / this.nByn / 2,
        this.screenWidth,
        (this.board.bingoLines[0] * this.screenHeight) / this.nByn +
          this.screenHeight / this.nByn / 2 +
          1,
        0,
        (this.board.bingoLines[0] * this.screenHeight) / this.nByn +
          this.screenHeight / this.nByn / 2 +
          1
      );
    }
    //斜線1
    if (this.board.bingoLines[1] > -1) {
      this.bingoLineGraphics.drawPolygon(
        1,
        0,
        this.screenWidth,
        this.screenHeight - 1,
        this.screenWidth - 1,
        this.screenHeight,
        0,
        1
      );
    }
    //縱線
    if (this.board.bingoLines[2] > -1) {
      this.bingoLineGraphics.drawPolygon(
        (this.board.bingoLines[2] * this.screenWidth) / this.nByn +
          this.screenWidth / this.nByn / 2,
        0,
        (this.board.bingoLines[2] * this.screenWidth) / this.nByn +
          this.screenWidth / this.nByn / 2 +
          1,
        0,
        (this.board.bingoLines[2] * this.screenWidth) / this.nByn +
          this.screenWidth / this.nByn / 2 +
          1,
        this.screenHeight,
        (this.board.bingoLines[2] * this.screenWidth) / this.nByn +
          this.screenWidth / this.nByn / 2,
        this.screenHeight
      );
    }
    //斜線2
    if (this.board.bingoLines[3] > -1) {
      this.bingoLineGraphics.drawPolygon(
        this.screenWidth - 1,
        0,

        this.screenWidth,
        1,

        1,
        this.screenHeight,

        0,
        this.screenHeight - 1
      );
    }
    this.bingoLineGraphics.endFill();
  }

  //畫線
  public DrawTicTacToeLine() {
    //用格數分成三等分
    const widthPart: number = this.screenWidth / this.nByn;
    const heightPart: number = this.screenHeight / this.nByn;
    const color = 0xffffff;
    for (let i = 1; i < this.nByn; i++) {
      this.graphics.beginFill(color);
      this.graphics.drawRect(0, heightPart * i, widthPart * this.nByn, 1);
      this.graphics.drawRect(widthPart * i, 0, 1, heightPart * this.nByn);
    }

    this.graphics.endFill();
  }
  public render(app: Application) {
    this.DrawTicTacToeSlot();
    this.DrawTicTacToeLine();
    //this.graphics.zIndex = 2;
    app.stage.addChild(this.graphics);
    this.slots.forEach((slotColumn) => {
      slotColumn.forEach((slot) => {
        app.stage.addChild(slot);
      });
    });
    app.stage.addChild(this.bingoLineGraphics);
  }
}
