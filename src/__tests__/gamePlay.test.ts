import MenuScenes from "../scenes/MenuScenes";
import { ScenesManager } from "../system/ScenesManager";
 
describe('GamePlay', () => {
  // 應該要初始化場景管理器，並顯示第一個場景
  it("should init ScenesManager, and show first scenes (MenuScenes)", () => {
    const scenesManager = ScenesManager;

    // 導入場景
    scenesManager.add(new MenuScenes());// 開始畫面
    // 設定初始場景
    scenesManager.ChangeScenes("MenuScenes");
    
    expect(scenesManager.activeScenes).toBeInstanceOf(MenuScenes);
  });
});
