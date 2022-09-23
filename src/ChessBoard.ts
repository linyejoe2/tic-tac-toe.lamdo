type PlayerWinEvent = (winner: number) => void;

export class ChessBoard {
  public chesses: number[][] = [];
  public nByn: number;
  public lines: number[][] = [];
  constructor(n: number) {
    this.nByn = n;
    for (let i = 0; i < n; i++) {
      this.chesses.push([]);
      for (let j = 0; j < n; j++) {
        this.chesses[i].push(0);
      }
    }
  }

  public PlayerWon: PlayerWinEvent[] = [];

  SetChess(x: number, y: number, player: number): boolean {
    if (this.chesses[y][x] != 0) return false;
    this.chesses[y][x] = player;
    return true;
  }

  //檢測只會發生在最新下子的地方
  CheckAll(x: number, y: number): boolean[] {
    //橫向檢測
    const horizontalWinner: boolean = this.CheckLine(this.chesses[y]);
    //左上到右下的斜線
    const bevelWinner: boolean = this.CheckBevel(this.chesses);

    //轉置
    const newChesses = this.Transpose(this.chesses);

    //縱向檢測
    const verticalWinner: boolean = this.CheckLine(newChesses[x]);

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
    if (hasWinner >= 0) {
      this.PlayerWon.forEach((element) => {
        element.call(this, this.chesses[y][x]);
      });
    }
    return winningArr;
  }

  CheckLine(line: number[]): boolean {
    const sign = line[0];
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
