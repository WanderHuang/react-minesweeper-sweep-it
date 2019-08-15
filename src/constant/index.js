/**
 * 等级分布
 * 0 - easy   - 8 * 8   - 10
 * 1 - medium - 12 * 12 - 20
 * 2 - hard   - 16 * 16 - 30
 * 3 - super  - 20 * 20 - 40
 */
export const mapLevel = [
  {
    // 0.08
    baseCount: 8,
    mineCount: 10
  },
  {
    // 0.11
    baseCount: 15,
    mineCount: 25
  },
  {
    // 0.15
    baseCount: 16,
    mineCount: 40
  },
  {
    // 0.2
    baseCount: 20,
    mineCount: 80
  }
]
/**
 * 定义方块状态
 * 0 未翻开
 * 1 翻开 且为空
 * 2 翻开 且为数字
 * 3 翻开 且为地雷
 * 4 未翻开 且被标记
 * 9 翻开 且展示emoji图像
 */
export const CellTypes = {
  CELL_NOT_REVEAL: 0,
  CELL_NULL: 1,
  CELL_NUMBER: 2,
  CELL_MINE: 3,
  CELL_FLAG: 4,
  CELL_EMOJI: 9
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

/**
 * 定义时钟状态
 * 0 停止
 * 1 继续
 */
export const ClockStatus = {
  STOP: 0,
  CONTINUE: 1
}

/**
 * 系统级Emoji定义
 */
export const Emojis = {
  GAME_EASY: {
    content: '😀',
    description: 'Easy'
  },
  GAME_MEDIUM: {
    content: '😃',
    description: 'Medium'
  },
  GAME_HARD: {
    content: '😅',
    description: 'Hard'
  },
  GAME_SUPER: {
    content: '😨',
    description: 'Super'
  },
  INFO_LEVEL_CHOICE: {
    content: '🎲',
    description: 'Level choice'
  },
  INFO_LEVEL: {
    content: '🌡️',
    description: 'Current Level'
  },
  INFO_GAME_STATUS: {
    content: '🕹️',
    description: 'Game Status'
  },
  INFO_GAME_BLOCK: {
    content: '⬛',
    description: 'Blocks'
  },
  INFO_CLOCK: {
    content: '🕒',
    description: 'time(s)'
  },
  MONKEY: {
    content: '🙈',
    description: 'Monkey see nothing'
  },
  FLAG: {
    content: '⛳',
    description: 'Flagged Block'
  },
  MINE: {
    content: '💣',
    description: 'Mine'
  },
  GAME_FAILED: {
    content: '☠️',
    description: 'Game Over'
  },
  GAME_PLAYING: {
    content: '🎮',
    description: 'On Game'
  },
  GAME_PAUSED: {
    content: '⏸️',
    description: 'Paused'
  },
  GAME_IDLE: {
    content: '💤',
    description: 'Idle'
  },
  GAME_SUCCESS: {
    content: '🙌',
    description: 'Game Success'
  }
}

export const NumberColors = {
  MINE_0: '#000000',
  MINE_1: '#00CCFF',
  MINE_2: '#00CC33',
  MINE_3: '#FF9966',
  MINE_4: '#0000FF',
  MINE_5: '#9900FF',
  MINE_6: '#CC0099',
  MINE_7: '#000099',
  MINE_8: '#FF0000'
}

/**
 * 定义动画
 */
export const Animations = [
  {
    'backgroundImage': 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)'
  },
  {
    'animation': 'transition-bg 10s infinite reverse'
  }
]