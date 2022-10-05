import { Graphics, Point } from "pixi.js";
import { ChessBoard } from "./ChessBoard";
import { IGameObject } from "../interface/IGameObject";
import { GameObject } from "../objects/GameObject";
import { ScenesManager } from "../system/ScenesManager";
import EndGameScenes from "../scenes/EndGameScenes";

export default class GameView extends GameObject {
  public graph: Graphics = new Graphics();
  public name: string;
  public winner?: number | undefined;
  public graphics: Graphics = new Graphics();
  public element: IGameObject[];
  public board: ChessBoard;
  public currentPlayer: number;
  public firstPlayer: number;
  private _width: number;
  private _height: number;
  private _delay = 1000;
  private _setChessDelayScale = 1;
  private _drawLineDelayScale = 1.4;
  private _endGameDelayScale = 1.8;
  private _bingoLineColor = 0xffffff;//老白線寶了
  private _slotColor = 0x366178;//底色
  private _lineColor = 0x92C3DD;//邊線色
  private _circleColor = 0x5A8AA4;//圈圈486F84
  private _crossColor = 0x76A7C1;//叉叉
  private _transparent = 0.75;
  private _chessSize: number;
  private bingoLineGraphics: Graphics = new Graphics();
  private chessesView: Graphics[][] = [
    [new Graphics(), new Graphics(), new Graphics()],
    [new Graphics(), new Graphics(), new Graphics()],
    [new Graphics(), new Graphics(), new Graphics()],
  ];
  private nByn = 3;
  constructor(isRobotMode: boolean, position: number[] = [0, 0], _firstPlayer: number) {
    super(position);
    this.board = new ChessBoard(isRobotMode);
    this.currentPlayer = _firstPlayer;
    this.firstPlayer = _firstPlayer
    this._height = 120;
    this._width = 120;
    this._chessSize = Math.sqrt(this._width + this._height);
    this.element = [];
    this.name = "";
    this.SetEventOnChessBoard();
    this.render();
    this.DrawTicTacToeSlot();
    this.DrawTicTacToeLine();
  }



  private SetAllButtonActivate(activate: boolean) {
    for (let y = 0; y < this.nByn; y++) {
      for (let x = 0; x < this.nByn; x++) {
        this.chessesView[y][x].interactive = activate;
        this.chessesView[y][x].buttonMode = activate;
      }
    }
  }
  //註冊當玩家勝利的事件
  private SetEventOnChessBoard(): void {
    //平手
    this.board.PlayerDraw = () => {
      if (ScenesManager.get("EndGameScenes")) {
        setTimeout(() => {
          ScenesManager.add(new EndGameScenes);
          ScenesManager.get("EndGameScenes")!.winner = 0;
          ScenesManager.ChangeScenes("EndGameScenes");
          return;
        }, this._delay * this._endGameDelayScale)
      }
      console.log("平手，嫩");
    };

    //有人贏啦
    //當玩家勝利時會呼叫這個funciton，並從參數傳入勝利者 1為O 2為X
    //還沒加入勝利者在第幾排
    this.board.PlayerWon.push(async (winner: number) => {
      this.SetAllButtonActivate(false);
      if (ScenesManager.get("EndGameScenes")) {
        setTimeout(() => {
          ScenesManager.add(new EndGameScenes);
          ScenesManager.get("EndGameScenes")!.winner = winner;
          ScenesManager.ChangeScenes("EndGameScenes");
          return;
        }, this._delay * this._endGameDelayScale)
      }
      //贏了要把按鈕都disable，防止偷按
      //console.log("贏家出現了!!!!勝利者是:" + (winner == 1 ? "O" : "X"));
      //把bingo線都拿出來畫，哈
      //console.log(this.board.bingoLines);

      const lineWidth = 3;

      this.bingoLineGraphics.beginFill(this._bingoLineColor);
      await new Promise(f => setTimeout(f, this._delay * this._drawLineDelayScale));
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
          new Point(lineWidth, 0),
          new Point(0, lineWidth),
          new Point(this._width - lineWidth, this._height),
          new Point(this._width, this._height - lineWidth)
        );
      }
      //縱線
      if (this.board.bingoLines[2] >= 0) {
        this.bingoLineGraphics.drawRect(
          this._width / 6 + (this._width / 6) * this.board.bingoLines[2] * 2,
          0,
          lineWidth,
          this._height
        );
      }
      //右上左下斜線
      if (this.board.bingoLines[3] >= 0) {
        this.bingoLineGraphics.drawPolygon(
          new Point(this._width - lineWidth, 0),
          new Point(this._width, lineWidth),
          new Point(lineWidth, this._height),
          new Point(0, this._height - lineWidth)
        );
      }
      //bingoLineGraphics
    });

    //棋盤更新，通常是被機器人更新的，哈
    this.board.Update = async () => {
      this.SetAllButtonActivate(false);
      await new Promise(f => setTimeout(f, this._delay * this._setChessDelayScale));
      this.DrawSlot(this.board.lastX, this.board.lastY);
      this.SetAllButtonActivate(true);
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
    this.chessesView[y][x].beginFill(this._slotColor);
    this.chessesView[y][x].drawRect(0, 0, this._width / 3, this._height / 3);
    this.chessesView[y][x].endFill();
    switch (this.board.chesses[y][x]) {
      case 0:
        break;
      case 1:
        this.chessesView[y][x].lineStyle(1, this._circleColor, 1);
        this.chessesView[y][x].drawCircle(
          this._width / 6,
          this._height / 6,
          this._chessSize
        );
        this.chessesView[y][x].endFill();
        break;
      case 2:
        this.chessesView[y][x].lineStyle(1, this._crossColor, 1);

        this.chessesView[y][x].moveTo(this._chessSize / 2, this._chessSize / 2)
          .lineTo(this._width / 3 - this._chessSize / 2, this._height / 3 - this._chessSize / 2)//左上到右下的線
          .moveTo(this._width / 3 - this._chessSize / 2, this._chessSize / 2)
          .lineTo(this._chessSize / 2, this._height / 3 - this._chessSize / 2);//右上到左下的線
        this.chessesView[y][x].endFill();
        break;
      default:
        break;
    }
    this.chessesView[y][x].endFill();
  }
  private async SetChess(): Promise<void> {
    const temp = this as unknown as Array<any>;
    const x = temp[0] as number;
    const y = temp[1] as number;
    const chessView = temp[2] as Graphics;
    const gameView = temp[3] as GameView;
    chessView.clear();

    gameView.board.SetChess(x, y, this.currentPlayer, this.firstPlayer);
    if (gameView.board.chesses[y][x] == 1) {
      chessView.lineStyle(1, this._circleColor, 1);
      chessView.drawCircle(
        gameView._width / 6,
        gameView._height / 6,
        this._chessSize
        //Math.sqrt(gameView._width + gameView._height)
      );
      chessView.endFill();
    } else if (gameView.board.chesses[y][x] == 2) {
      chessView.lineStyle(1, this._crossColor, 1);
      chessView.moveTo(this._chessSize / 2, this._chessSize / 2)
        .lineTo(this._width / 3 - this._chessSize / 2, this._height / 3 - this._chessSize / 2)//左上到右下的線
        .moveTo(this._width / 3 - this._chessSize / 2, this._chessSize / 2)
        .lineTo(this._chessSize / 2, this._height / 3 - this._chessSize / 2);//右上到左下的線
      chessView.endFill();
    }
    gameView.DrawSlot(x, y);
  }

  private MoveOnChess(): void {
    const temp = this as unknown as any;
    const x = temp[0] as number;
    const y = temp[1] as number;
    const board = temp[2] as ChessBoard;
    const chessView = temp[3] as Graphics;
    const gameView = temp[4] as GameView;
    //1是O，2是X
    if (board.chesses[y][x] == 0) {
      if (this.currentPlayer == 1) {
        chessView.lineStyle(1, gameView._circleColor, gameView._transparent);
        chessView.drawCircle(
          gameView._width / 6,
          gameView._height / 6,
          Math.sqrt(gameView._width + gameView._height)
        );
        chessView.endFill();
      } else if (this.currentPlayer == 2) {
        chessView.lineStyle(1, gameView._circleColor, gameView._transparent);
        chessView.moveTo(gameView._chessSize / 2, gameView._chessSize / 2)
          .lineTo(gameView._width / 3 - gameView._chessSize / 2, gameView._height / 3 - gameView._chessSize / 2)//左上到右下的線
          .moveTo(gameView._width / 3 - gameView._chessSize / 2, gameView._chessSize / 2)
          .lineTo(gameView._chessSize / 2, gameView._height / 3 - gameView._chessSize / 2);//右上到左下的線
        chessView.endFill();
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
    this.graphics.beginFill(this._lineColor);
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
  public render(): void {
    this.graph.addChild(this.graphics);
    this.graph.addChild(this.bingoLineGraphics);
    if (this.element[0] instanceof GameView) {
      this.element[0].render!();
    }
  }
}
