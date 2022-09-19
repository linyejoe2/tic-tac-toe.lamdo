import { Application, Graphics } from "pixi.js"

export default class GameObject {
  public graph: Graphics;
  public size: Vector;
  protected _position: Vector;

  constructor(position: { x: number, y: number }) {
    this._position = {
      x: position.x || 0,
      y: position.y || 0
    }
    this.graph = this._drawGraph(this._imageArr[0]);
    this.size = this._takeSize(this._imageArr[0]);
  }

  /**
   * 更新要用哪張圖
   * 當 this._imageArr 只有一張時，就不更新了。
   * @param frameTime 這帧花的時間
   */
  public update(frameTime: number): void {
    if (this._imageArr.length < 1) return;
    // 先把當前偵的時間加上去
    this._timeOut += frameTime;

    // 如果到 1 秒了
    if (this._timeOut > 300) {
      // 換一張圖
      this._currentImageIndex++;

      // 重新繪圖
      this.graph = this._drawGraph(
        this._imageArr[this._currentImageIndex %
        this._imageArr.length]);

      // 重新計時
      this._timeOut = 0;
    }
  }


  public get position(): Vector {
    return this._position;
  }


  /**
   * 渲染自己到畫面上
   * @param app 畫面
   */
  public render(app: Application): void {
    app.stage.addChild(this.graph);

    this.graph.position.set(
      this._position.x, this._position.y);
  }


  // 目前播到的動畫 _imageArr[_imageIndex]
  private _currentImageIndex = 0;

  // 切換動畫的時間
  private _timeOut = 0;

  // 定義圖片來源
  private _imageArr = [
    [
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0],
    ], [
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    ], [
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    ], [
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    ], [
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    ], [
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    ]
  ];

  // 畫圖的 mathods
  protected _drawGraph(image: number[][]): Graphics {
    const graphics = new Graphics();

    for (let y = 0; y < image.length; y++) {
      for (let x = 0; x < image[y].length; x++) {
        if (image[y][x] === 0) continue;// 如果是 0 就跳過這格的繪製。

        // 其他的就畫上顏色
        graphics.beginFill(0xffffff);

        graphics.drawRect(x, y, 1, 1);

        graphics.endFill();
      }
    }
    return graphics;
  }

  /**
   * 獲得這個角色的大小，然後把它放進 this.size
   * @param image 這角色的圖片
   * @returns 大小
   */
  protected _takeSize(image: number[][]): Vector {
    return ({ x: image[0].length, y: image.length });
  }
}

// 向量位置
export type Vector = {
  x: number;
  y: number;
};