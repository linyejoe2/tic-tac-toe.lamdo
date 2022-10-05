import { ICircleChess, IForkChess } from "./interface/IGameObject";

// 向量位置
export type Vector = {
  x: number;
  y: number;
};

// 事先定義有的場景
export type TScenes = "EndGameScenes" | "GameScenes" | "MenuScenes" | string;

export type Chesses = ICircleChess | IForkChess;

export const WINTEXT = {
  default: "還在施工中👷‍♂️，魯🐍",
  tie: "玩個⭕⭕❌❌\n都沒有贏家，魯🐍",
  circleWin: "⭕贏麻了，魯🐍",
  forkWin: "❌贏麻了，魯🐍"
}
