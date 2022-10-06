import { Button } from "../objects/Button";

describe('這是一個測試的範例', () => {
  it('1 + 2 應該要等於 3', () => {
    expect(1 + 2).toBe(3);
  });

  it('0.1 + 0.2 應該要等於 0.3 但不等於，所以我們可以用大約等於 (toBeCloseTo)', () => {
    // expect(0.1 + 0.2).toBe(0.3);// 這行會噴錯
    expect(0.1 + 0.2).toBeCloseTo(0.3, 0.00001);
  })

  it('can recursively checks', () => {
    const arrToBeCheck = [[1, 1, 2], [1, 1, 3]];
    // expect(arrToBeCheck).toBe([[1,1,2],[1,1,3]]);// 這行會噴錯
    // expect(arrToBeCheck).toEqual([[1,1,2],[1,1,2]]);// 這行會噴錯
    expect(arrToBeCheck).toEqual([[1, 1, 2], [1, 1, 3]]);
  });

  it('can check null, defined or not, true or false', () => {
    let s;
    expect(s).toBeUndefined();
    s = new Button("");
    expect(s).toBeDefined();
    s = null;
    expect(s).toBeNull();

    // falsys = 所有在 JS 裡 == false 的東西
    const falsys = [false, undefined, null, NaN, 0, ""];
    for (const falsy of falsys) {
      expect(falsy).toBeFalsy();
    }

    // truthys = 所有在 JS 裡 == true 的東西
    const truthys = [true, new Button(""), [], {}, 1, "1"];
    for (const truthy of truthys) {
      expect(truthy).toBeTruthy();
    }
  });

  it('should be 1', () => {
    expect(1).toBe(1);
  });
});
