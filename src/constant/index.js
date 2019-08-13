/**
 * 等级分布
 * 0 - easy   - 8 * 8   - 10
 * 1 - medium - 12 * 12 - 20
 * 2 - hard   - 16 * 16 - 30
 * 3 - super  - 20 * 20 - 40
 */
export const mapLevel = [
  {
    baseCount: 8,
    mineCount: 10
  },
  {
    baseCount: 12,
    mineCount: 20
  },
  {
    baseCount: 16,
    mineCount: 30
  },
  {
    baseCount: 20,
    mineCount: 40
  }
]
/**
 * 定义方块状态
 * 0 未翻开
 * 1 翻开 且为空
 * 2 翻开 且为数字
 * 3 翻开 且为地雷
 * 4 未翻开 且被标记
 */
export const CellTypes = {
  CELL_NOT_REVEAL: 0,
  CELL_NULL: 1,
  CELL_NUMBER: 2,
  CELL_MINE: 3,
  CELL_FLAG: 4
}

/**
 * 定义游戏状态
 * 0 未开始
 * 1 游戏开始
 * 2 游戏暂停
 * 3 游戏继续
 * 4 游戏失败
 * 5 游戏成功
 */
export const GameStatus = {
  GAME_NOT_START: 0,
  GAME_ON: 1,
  GAME_PAUSED: 2,
  GAME_CONTINUED: 3,
  GAME_FAILED: 4,
  GAME_SUCCESS: 5
}

/**
 * 定义游戏等级
 * 0 简单
 * 1 中级
 * 2 困难
 * 3 超难
 */
export const GameLevel = {
  SIMPLE: 0,
  MEDIUM: 1,
  HARD: 2,
  SUPER: 3
}