import IStrategy from "../interface/IStrategy";

export class RandomStrategy implements IStrategy {
  public name = "random";
  environment: number[][];
  PickPosition(): number[] {
    //空位們
    const pickingList: number[][] = [];

    //找到空位
    for (let y = 0; y < this.environment.length; y++) {
      for (let x = 0; x < this.environment[0].length; x++) {
        if (this.environment[y][x] == 0) {
          pickingList.push([x, y]);
        }
      }
    }

    //在空位中隨機挑一個
    const p = Math.trunc(Math.random() * 10000) % pickingList.length;
    return pickingList[p];
  }
  UpdateEnvironment(env: number[][]): void {
    this.environment = env;
  }
  constructor(env: number[][]) {
    this.environment = env;
  }
}
