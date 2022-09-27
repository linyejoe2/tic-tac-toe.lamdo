import { IButton } from "../interface/IGameObject";
import { Button } from "../objects/Button";


// 所有 unit test 都放這
describe('unit testing.', () => {
  // 按鈕
  describe('button', () => {
    const testButton: IButton = new Button("I will test the Button");
    // 有個圖案，且沒有超過畫布
    it('should have a graph to show', () => {
      expect(testButton.graph.width).toBeGreaterThan(0);
      expect(testButton.graph.height).toBeGreaterThan(0);
      expect(testButton.graph.width + testButton.position.x).toBeLessThanOrEqual(200);
      expect(testButton.graph.height + testButton.position.y).toBeLessThanOrEqual(200);
    });
    // 有位置，且沒有超過畫布
    it('should have a position proprity', () => {
      expect(testButton.position.x).toBeGreaterThanOrEqual(0);
      expect(testButton.position.y).toBeGreaterThanOrEqual(0);
      expect(testButton.position.x).toBeLessThanOrEqual(200);
      expect(testButton.position.y).toBeLessThanOrEqual(200);
    });
    // 有個文字
    it('should have a text to tell user it mathod.', () => {
      expect(testButton.text).toBe("I will test the Button");
      const text1: any = testButton.graph.getChildAt(0); 
      expect(text1.text).toBe("I will test the Button");
    });
    // 初始化時應該要有看的到的旗標，且可以關掉。
    it('should can set visible, default should be ture.', () => {
      expect(testButton.visible).toBeTruthy();
      testButton.visible = false;
      expect(testButton.visible).toBeFalsy();
    });
  });
});
