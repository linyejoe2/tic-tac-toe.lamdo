import { Agent } from "../Robot/Agent";

type PlayerWinEvent = (winner: number) => void;
type PlayerDrawEvent = () => void;
type BoardUpdateEvent = () => void;
export class ChessBoard {
  public isRobotMode = true;
  public chesses: number[][] = [];
  public nByn = 3;
  public lines: number[][] = [];
  public agent: Agent;
  public lastX = -1;
  public lastY = -1;
  //from to
  public bingoLines: number[] = [];
  constructor(isRobotBattle: boolean) {
    this.isRobotMode = isRobotBattle;
    for (let i = 0; i < this.nByn; i++) {
      this.chesses.push([]);
      for (let j = 0; j < this.nByn; j++) {
        this.chesses[i].push(0);
      }
    }
    this.agent = new Agent(this.chesses);
    if (isRobotBattle) {
      this.agent.SetStrategyAsRandom();
    }
  }

  public PlayerWon: PlayerWinEvent[] = [];
  public PlayerDraw!: PlayerDrawEvent;
  public Update!: BoardUpdateEvent;
  //這是一個很醜的function
  //包含了設定棋子，勝利判定，平手判定，跟機器人下棋
  SetChess(x: number, y: number, curr: number, first: number): boolean {
    // console.log('first1:' + this.firstPlayer);
    //已經被按過了
    if (this.chesses[y][x] != 0) return false;
    this.lastX = x;
    this.lastY = y;
    //玩家下棋先處理
    this.chesses[y][x] = curr;
    const hasWinner = this.CheckAll().findIndex((element) => element == true);
    if (hasWinner >= 0) {
      return true;
    }
    curr = (curr == 1 ? 2 : 1);
    //是機器人模式，而且接下來是機器人的回合
    // console.log('curr:' + curr);
    // console.log('first:' + this.firstPlayer);
    if (this.isRobotMode && curr != first) {
      //更新機器人所看到的環境
      this.agent.UpdateEnvironment(this.chesses);
      console.log("機器人下棋中");
      //機器人選一個地方
      const position = this.agent.PickPosition();
      //機器人下棋
      if (!position) return false;
      this.chesses[position[1]][position[0]] = curr;
      this.lastX = position[0];
      this.lastY = position[1];
      this.Update();
      const hasWinner = this.CheckAll().findIndex((element) => element == true);
      if (hasWinner > 0) return true;
      curr = (curr == 1 ? 2 : 1);
      return true;
    }

    return true;
  }

  //檢測只會發生在最新下子的地方
  private CheckAll(): boolean[] {
    //橫向檢測
    const horizontalWinner: boolean = this.CheckLine(this.chesses[this.lastY]);
    //左上到右下的斜線
    const bevelWinner: boolean = this.CheckBevel(this.chesses);

    //轉置
    const newChesses = this.Transpose(this.chesses);

    //縱向檢測
    const verticalWinner: boolean = this.CheckLine(newChesses[this.lastX]);

    //右上到左下的斜線
    const bevel2Winner: boolean = this.CheckBevel(this.chesses.reverse());
    this.chesses.reverse();

    const winningArr = [
      horizontalWinner,
      bevelWinner,
      verticalWinner,
      bevel2Winner,
    ];
    const hasWinner = winningArr.findIndex((element) => element == true);

    if (winningArr.find((temp) => temp)) {
      this.bingoLines = [-1, -1, -1, -1];
      if (winningArr[0]) {
        console.log("贏在第" + this.lastY + "橫排");
        this.bingoLines[0] = this.lastY;
      }
      if (winningArr[1]) {
        console.log("贏在從左上到右下的斜線");
        this.bingoLines[1] = 1;
      }
      if (winningArr[2]) {
        console.log("贏在第" + this.lastX + "縱排");
        this.bingoLines[2] = this.lastX;
      }
      if (winningArr[3]) {
        console.log("贏在從右上到左下的斜線");
        this.bingoLines[3] = 1;
      }
    }

    if (hasWinner >= 0) {
      this.PlayerWon.forEach((element) => {
        element.call(this, this.chesses[this.lastY][this.lastX]);
      });
      return winningArr;
    } else {
      if (this.CheckDraw(this.chesses)) {
        this.PlayerDraw();
        return [false, false, false, false];
      }
    }

    return winningArr;
  }

  CheckLine(line: number[]): boolean {
    const sign = line[0];
    if (sign == 0) return false;
    for (let i = 1; i < this.nByn; i++) {
      if (line[i] != sign) return false;
    }
    return true;
  }

  CheckBevel(mat: number[][]): boolean {
    const sign = mat[0][0];
    if (sign == 0) return false;
    for (let i = 0; i < this.nByn; i++) {
      if (mat[i][i] != sign) return false;
    }
    return true;
  }

  //平手回傳True
  CheckDraw(mat: number[][]): boolean {
    for (let col = 0; col < mat.length; col++) {
      for (let row = 0; row < mat[0].length; row++) {
        if (mat[col][row] == 0) return false;
      }
    }
    return true;
  }

  Transpose(mat: number[][]): number[][] {
    const nmat: number[][] = [];
    for (let i = 0; i < this.nByn; i++) {
      nmat.push([]);
      for (let j = 0; j < this.nByn; j++) {
        nmat[i].push(mat[j][i]);
      }
    }
    return nmat;
  }
}
