import { Application, Graphics, Point } from "pixi.js";
import { ChessBoard } from "./ChessBoard";

export default class GameView {
  public graphics: Graphics = new Graphics();
  public board: ChessBoard;
  private _width: number;
  private _height: number;
  private bingoLineGraphics: Graphics = new Graphics();
  private chessesView: Graphics[][] = [
    [new Graphics(), new Graphics(), new Graphics()],
    [new Graphics(), new Graphics(), new Graphics()],
    [new Graphics(), new Graphics(), new Graphics()],
  ];
  private nByn = 3;
  constructor(app: Application, isRobotMode: boolean) {
    this.board = new ChessBoard(isRobotMode);
    this._height = app.screen.height;
    this._width = app.screen.width;
    this.SetEventOnChessBoard();
    this.render(app);
    this.DrawTicTacToeSlot();
    this.DrawTicTacToeLine();
  }

  //註冊當玩家勝利的事件
  private SetEventOnChessBoard(): void {
    //平手
    this.board.PlayerDraw = () => {
      console.log("平手，嫩");
    };

    //有人贏啦
    //當玩家勝利時會呼叫這個funciton，並從參數傳入勝利者 1為O 2為X
    //還沒加入勝利者在第幾排
    this.board.PlayerWon.push((winner: number) => {
      //贏了要把按鈕都disable，防止偷按
      console.log("贏家出現了!!!!勝利者是:" + (winner == 1 ? "O" : "X"));
      for (let y = 0; y < this.nByn; y++) {
        for (let x = 0; x < this.nByn; x++) {
          this.chessesView[y][x].interactive = false;
          this.chessesView[y][x].buttonMode = false;
        }
      }
      //把bingo線都拿出來畫，哈
      console.log(this.board.bingoLines);

      const color = 0x089487;
      const lineWidth = 3;

      this.bingoLineGraphics.beginFill(color);
      //橫線
      if (this.board.bingoLines[0] >= 0) {
        this.bingoLineGraphics.drawRect(
          0,
          this._height / 6 + (this._height / 6) * this.board.bingoLines[0] * 2,
          this._width,
          lineWidth
        );
      }
      //左上右下斜線
      if (this.board.bingoLines[1] >= 0) {
        this.bingoLineGraphics.drawPolygon(
          new Point(lineWidth,0),
          new Point(0,lineWidth),
          new Point(this._width-lineWidth,this._height),
          new Point(this._width,this._height-lineWidth)
        );

      }
      //縱線
      if (this.board.bingoLines[2] >= 0) {
        this.bingoLineGraphics.drawRect(
          this._width / 6 + (this._width / 6) * this.board.bingoLines[2] * 2,
          0,
          lineWidth,
          this._height,
        );
      }
      //右上左下斜線
      if (this.board.bingoLines[3] >= 0) {
        this.bingoLineGraphics.drawPolygon(
          new Point(this._width-lineWidth,0),
          new Point(this._width,lineWidth),
          new Point(lineWidth,this._height),
          new Point(0,this._height-lineWidth),
        );
      }
      //bingoLineGraphics
    });

    //棋盤更新，通常是被機器人更新的，哈
    this.board.Update = () => {
      this.DrawSlot(this.board.lastX, this.board.lastY);
      return;
    };
  }

  /*
   *
   *
   */
  public DrawTicTacToeSlot() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        this.CreateSlot(x, y);
      }
    }
    return;
  }

  public CreateSlot(x: number, y: number) {
    const bound = 2;
    this.chessesView[y][x].setParent(this.graphics);
    this.chessesView[y][x].interactive = true;
    this.chessesView[y][x].buttonMode = true;

    this.DrawSlot(x, y);
    this.chessesView[y][x].width = this._width / this.nByn - bound * 1.5;
    this.chessesView[y][x].height = this._height / this.nByn - bound * 1.5;

    //置中，但沒那麼中，哈
    this.chessesView[y][x].position = new Point(
      //依照格子位移+向右靠
      (this._width / this.nByn) * x + bound,
      (this._height / this.nByn) * y + bound
    );

    this.chessesView[y][x]
      .on("pointerdown", this.SetChess, [x, y, this.chessesView[y][x], this])
      .on("pointerover", this.MoveOnChess, [
        x,
        y,
        this.board,
        this.chessesView[y][x],
        this,
      ])
      .on("pointerout", this.MoveOutChess, [
        x,
        y,
        this.chessesView[y][x],
        this,
      ]);
  }

  public DrawSlot(x: number, y: number) {
    this.chessesView[y][x].beginFill(0x666666);
    //this.chesses[y][x].angle = 45;
    this.chessesView[y][x].drawRect(0, 0, this._width / 3, this._height / 3);
    this.chessesView[y][x].endFill();
    const lineWidth = 1;
    switch (this.board.chesses[y][x]) {
      case 0:
        break;
      case 1:
        this.chessesView[y][x].lineStyle(1, 0xff0000, 1);
        this.chessesView[y][x].drawCircle(
          this._width / 6,
          this._height / 6,
          Math.sqrt(this._width + this._height)
        );
        this.chessesView[y][x].endFill();
        break;
      case 2:
        this.chessesView[y][x].beginFill(0x000fff, 1);
        this.chessesView[y][x].drawPolygon(
          new Point(lineWidth, 0),
          new Point(this._width / 3 + lineWidth, this._height / 3),
          new Point(this._width / 3, this._height / 3 + lineWidth),
          new Point(0, lineWidth)
        );
        this.chessesView[y][x].drawPolygon(
          new Point(this._width / 3 - lineWidth, 0),
          new Point(this._width / 3, lineWidth),
          new Point(0, this._height / 3 + lineWidth),
          new Point(0, this._height / 3 - lineWidth)
        );
        this.chessesView[y][x].endFill();
        break;
      default:
        break;
    }
    this.chessesView[y][x].endFill();
  }
  private SetChess(): void {
    const temp = this as unknown as Array<any>;
    const x = temp[0] as number;
    const y = temp[1] as number;
    const chessView = temp[2] as Graphics;
    const gameView = temp[3] as GameView;

    gameView.board.SetChess(x, y);
    if (gameView.board.chesses[y][x] == 1) {
      chessView.lineStyle(1, 0xff0000, 1);
      chessView.drawCircle(
        gameView._width / 6,
        gameView._height / 6,
        Math.sqrt(gameView._width + gameView._height)
      );
      chessView.endFill();
    } else if (gameView.board.chesses[y][x] == 2) {
      const lineWidth = 1;
      chessView.beginFill(0x000fff, 1);
      chessView.drawPolygon(
        new Point(lineWidth, 0),
        new Point(gameView._width / 3 + lineWidth, gameView._height / 3),
        new Point(gameView._width / 3, gameView._height / 3 + lineWidth),
        new Point(0, lineWidth)
      );
      chessView.drawPolygon(
        new Point(gameView._width / 3 - lineWidth, 0),
        new Point(gameView._width / 3, lineWidth),
        new Point(0, gameView._height / 3 + lineWidth),
        new Point(0, gameView._height / 3 - lineWidth)
      );
      chessView.endFill();
    }
  }

  private MoveOnChess(): void {
    const temp = this as unknown as any;
    const x = temp[0] as number;
    const y = temp[1] as number;
    const board = temp[2] as ChessBoard;
    const graphic = temp[3] as Graphics;
    const gameView = temp[4] as GameView;
    //1是O，2是X
    if (board.chesses[y][x] == 0) {
      if (board.currentPlayer == 1) {
        //graphic.beginFill(0xff0000);
        graphic.lineStyle(1, 0xff0000, 0.25);
        graphic.drawCircle(
          gameView._width / 6,
          gameView._height / 6,
          Math.sqrt(gameView._width + gameView._height)
        );
        graphic.endFill();
      } else if (board.currentPlayer == 2) {
        const lineWidth = 1;
        graphic.beginFill(0x000fff, 0.25);
        graphic.drawPolygon(
          new Point(lineWidth, 0),
          new Point(gameView._width / 3 + lineWidth, gameView._height / 3),
          new Point(gameView._width / 3, gameView._height / 3 + lineWidth),
          new Point(0, lineWidth)
        );
        graphic.drawPolygon(
          new Point(gameView._width / 3 - lineWidth, 0),
          new Point(gameView._width / 3, lineWidth),
          new Point(0, gameView._height / 3 + lineWidth),
          new Point(0, gameView._height / 3 - lineWidth)
        );
        graphic.endFill();
      }
    }
  }

  private MoveOutChess(): void {
    const temp = this as unknown as any;
    const x = temp[0] as number;
    const y = temp[1] as number;
    const graphic = temp[2] as Graphics;
    const gameView = temp[3] as GameView;
    graphic.clear();
    gameView.DrawSlot(x, y);
  }
  //畫線
  public DrawTicTacToeLine(): void {
    //用格數分成三等分
    const widthPart: number = this._width / this.nByn;
    const heightPart: number = this._height / this.nByn;
    const color = 0xffffff;
    this.graphics.beginFill(color);
    for (let i = 0; i < this.nByn; i++) {
      this.graphics.drawRect(0, heightPart * i, widthPart * this.nByn, 1);
      this.graphics.drawRect(widthPart * i, 0, 1, heightPart * this.nByn);
    }
    this.graphics.drawRect(0, this._width - 1, widthPart * this.nByn, 1);
    this.graphics.drawRect(
      widthPart * this.nByn - 1,
      0,
      1,
      heightPart * this.nByn
    );

    this.graphics.endFill();
  }
  public render(app: Application) {
    app.stage.addChild(this.graphics);
    app.stage.addChild(this.bingoLineGraphics);
  }
}
