import IStrategy from "./IStrategy";
import { RandomStrategy } from "./RandomStrategy";

//機器人 aka 智慧代理人(agent)，用來做動作的 哈
export class Agent implements IStrategy {
  SetStrategyAsRandom(): void {
    this._strategy = new RandomStrategy(this.environment);
  }
  //遊玩的環境，棋局的狀態
  public environment: number[][];
  //使用的策略
  private _strategy: IStrategy;
  public constructor(
    env: number[][] = [],
    strategy: IStrategy = new RandomStrategy(env)
  ) {
    this._strategy = strategy;
    this.environment = env;
  }
  PickPosition(): number[] {
    return this._strategy.PickPosition();
  }
  UpdateEnvironment(env: number[][]): void {
    this._strategy.UpdateEnvironment(env);
  }
}
