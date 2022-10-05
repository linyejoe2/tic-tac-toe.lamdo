import { ICircleChess, IForkChess } from "./interface/IGameObject";

// 向量位置
export type Vector = {
  x: number;
  y: number;
};

// 事先定義有的場景
export type TScenes = "EndGameScenes" | "GameScenes" | "MenuScenes" | string;

export type Chesses = ICircleChess | IForkChess;
