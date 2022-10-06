import { Text } from "pixi.js";
import { IButton } from "../interface/IGameObject";
import { IScenes } from "../interface/IScencs";
import { Button } from "../objects/Button";
import { TextObject } from "../objects/TextObject";
import EndGameScenes from "../scenes/EndGameScenes";
import MenuScenes from "../scenes/MenuScenes";
import Scenes from "../scenes/Scenes";
import { APPSIZE, WINTEXT } from "../const";
import GameScenes from "../scenes/GameScenes";
require('webgl-mock');

// 所有 unit test 都放這
describe('unit testing.', () => {
  // 按鈕
  describe('testing Button.', () => {
    const testButton: IButton = new Button("I will test the Button");
    // 有個圖案，且沒有超過畫布
    it('should have a graph to show', () => {
      expect(testButton.graph.width).toBeGreaterThan(0);
      expect(testButton.graph.height).toBeGreaterThan(0);
      expect(testButton.graph.width + testButton.position.x).toBeLessThanOrEqual(APPSIZE.width);
      expect(testButton.graph.height + testButton.position.y).toBeLessThanOrEqual(APPSIZE.height);
    });
    // 有位置，且沒有超過畫布
    it('should have a position proprity', () => {
      expect(testButton.position.x).toBeGreaterThanOrEqual(0);
      expect(testButton.position.y).toBeGreaterThanOrEqual(0);
      expect(testButton.position.x).toBeLessThanOrEqual(APPSIZE.width);
      expect(testButton.position.y).toBeLessThanOrEqual(APPSIZE.width);
    });
    // 有個文字
    it('should have a text to tell user it mathod.', () => {
      expect(testButton.text).toBe("I will test the Button");
      // const text1: any = testButton.graph.getChildAt(0);
      // expect(text1.text).toBe("I will test the Button");
      expect("I will test the Button").toEqual((testButton.graph.getChildAt(0) as Text).text);
    });
    // 初始化時應該要有看的到的旗標，且可以關掉。
    it('should can set visible, default should be ture.', () => {
      expect(testButton.visible).toBeTruthy();
      testButton.visible = false;
      expect(testButton.visible).toBeFalsy();
    });
  });
  describe('testing textObject', () => {
    const testText = new TextObject(undefined, "this is a testText");
    // 要有一個 pixi 文字物件。
    it('should have a pixi.text proprity', () => {
      expect(testText.text).toBeInstanceOf(Text);
    });
    // 要有一個位置
    it('should have a position', () => {
      expect(testText.position.x).toBeGreaterThanOrEqual(0);
      expect(testText.position.y).toBeGreaterThanOrEqual(0);
      expect(testText.position.x).toBeLessThanOrEqual(APPSIZE.width);
      expect(testText.position.y).toBeLessThanOrEqual(APPSIZE.width);
    });
  });
  // 開始(選單)畫面
  describe('testing MenuScenes.', () => {
    const testMenuScenes: Scenes = new MenuScenes();

    // 測試場景名稱
    it('should naming `MenuScenes`',
      () => expect(testMenuScenes.name).toBe("MenuScenes"));

    // 測試畫面上該有的東西
    it('should have those thing in scenes and on this.app.', () => {
      // 定義有什麼
      const buttonNameList = ['跟朋友一起玩', '跟機器人玩'];
      const textList = ['Tic-Tac-Toe.Lamdo'];

      // 繪製
      testMenuScenes.render();

      for (const ele of testMenuScenes.element) {
        // 所有按紐
        if (ele instanceof Button) {
          expect(buttonNameList).toContain(ele.text);// 場景裡有這個物件
          expect(testMenuScenes.app.stage.children).toContain(ele.graph);// 場景的畫布裡有這個物件
          buttonNameList.splice(buttonNameList.indexOf(ele.text), 1);
        }
        // 所有文字
        if (ele instanceof TextObject) {
          expect(textList).toContain(ele.text.text);// 場景裡有這個物件
          expect(testMenuScenes.app.stage.children).toContain(ele.text);// 場景的畫布裡有這個物件
          textList.splice(textList.indexOf(ele.text.text), 1);
        }
      }
    });
  });
  describe('testing GameScenes.', () => {
    const testGameScenes: IScenes = new GameScenes(false, 1);
    // const testGameScenesWithRobot: IScenes = new GameScenes(true);
    it('should naming `GameScenes`', () => {
      expect(testGameScenes.name).toBe('GameScenes');
    });

  });
  describe('testing EndGameScenes.', () => {
    const testEndGameScenes: IScenes = new EndGameScenes();

    // 測試場景名稱
    it('should naming `MenuScenes`',
      () => expect(testEndGameScenes.name).toBe("EndGameScenes"));

    // 應該要有判斷贏家的 proprity
    it('should have proprity to identify winner.',
      () => expect(testEndGameScenes).toHaveProperty('winner'));

    // 要有一個按鈕讓你回到主選單
    it('should have a button use to go bace home scenes.', () =>
      expect(testEndGameScenes.element).toEqual(expect.arrayContaining([expect.objectContaining({ text: '回到主選單' })]))
    );

    /**
     * 每修改贏家參數時，應該要有不同的結果顯示在畫布上。
     * @see {@link WINTEXT} 勝利結果
     * @see {@link https://codewithhugo.com/jest-array-object-match-contain/}
     */
    describe('testing winState.', () => {
      // 沒有更動時，畫下去應該要是施工中
      it('should show in progress', () => {
        testEndGameScenes.render();
        expect(testEndGameScenes.app.stage.children).toEqual(expect.arrayContaining([expect.objectContaining({
          text: WINTEXT.default
        })]));
      });
      // 圈圈贏
      it('should show circle win', () => {
        testEndGameScenes.winner = 1;
        testEndGameScenes.render();
        expect(testEndGameScenes.app.stage.children).toEqual(expect.arrayContaining([expect.objectContaining({
          text: WINTEXT.circleWin
        })]));
      });
      // 叉叉贏
      it('should show fork win', () => {
        testEndGameScenes.winner = 2;
        testEndGameScenes.render();
        expect(testEndGameScenes.app.stage.children).toEqual(expect.arrayContaining([expect.objectContaining({
          text: WINTEXT.forkWin
        })]));
      });
      // 平手
      it('should show tie', () => {
        testEndGameScenes.winner = 0;
        testEndGameScenes.render();
        expect(testEndGameScenes.app.stage.children).toEqual(expect.arrayContaining([expect.objectContaining({
          text: WINTEXT.tie
        })]));
      });
    });
  });
});
