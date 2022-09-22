import { string2hex } from "@pixi/utils";

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

  SetChess(x: number, y: number, player: number): boolean {
    if (this.chesses[y][x] != 0) return false;
    this.chesses[y][x] = player;
    return true;
  }

  //檢測只會發生在最新下子的地方
  CheckAll(x: number, y: number): boolean[] {
    //橫向檢測
    let horizontalWinner: boolean = this.CheckLine(this.chesses[y]);

    //左上到右下的斜線
    let bevelWinner: boolean = this.CheckBevel(this.chesses);

    //轉置
    let newChesses = this.Transpose(this.chesses);

    //縱向檢測
    let verticalWinner: boolean = this.CheckLine(newChesses[x]);

    //右上到左下的斜線
    let bevel2Winner: boolean = this.CheckBevel(newChesses);
    console.log(this.chesses);
    console.log(newChesses);
    return [horizontalWinner, bevelWinner, verticalWinner, bevel2Winner];
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
