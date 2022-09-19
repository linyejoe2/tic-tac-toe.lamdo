// 向量位置
export type Vector = {
    x: number;
    y: number;
};


// 按了什麼按鍵(可以按什麼按鈕)
export enum Key {
    Left,// 雷射炮向左走
    Right,// 雷射炮向右走
    Space// 雷射炮發射
}

export type EnemyTypes = "squid" | "crab" | "octopus";
export type CharacterType = "enemy" | "scene" | "laser";

export type EnemyStateType = {
    moveTimeIntevel: number,// 預設幾毫秒動一次
    moveTimeNow: number,// 計時器
    moveDirection: number,// 移動方向與大小
    moveY: boolean// 是不是要往下動
    shootTimeIntevel: number,// 預設幾毫秒射一次
    shootTimeNow: number,// 計時器
}