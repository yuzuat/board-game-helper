import { Character, Task, Building, QAItem, RuleSection } from './types';

export const RULES: RuleSection[] = [
  {
    title: "遊戲目標",
    content: "玩家需要在有限的回合內，透過完成任務、探索景點與利用人物技能，積累最高的分數或達成特定勝利條件。"
  },
  {
    title: "回合流程",
    content: "1. **抽卡階段**：抽取一張任務卡。\n2. **行動階段**：可以選擇移動到景點或使用能力。\n3. **結算階段**：檢查是否達成任務條件。"
  },
  {
    title: "特殊規則",
    content: "- 每個角色每回合只能使用一次主動技能。\n- 景點效果在進入時立即觸發。"
  }
];

export const CHARACTERS: Character[] = [
  { id: "1", name: "苗真", role: "冒險者", description: "神秘的冒險家", ability: "查看 C_1B 獲取詳細技能", image: "/pictures/front/C_1A.png" },
  { id: "2", name: "郝任", role: "守護者", description: "堅毅的盾牌", ability: "查看 C_2B 獲取詳細技能", image: "/pictures/front/C_2A.png" },
  { id: "3", name: "南桓", role: "施法者", description: "奧術的掌控者", ability: "查看 C_3B 獲取詳細技能", image: "/pictures/front/C_3A.png" },
  { id: "4", name: "李賀", role: "暗殺者", description: "陰影中的利刃", ability: "查看 C_4B 獲取詳細技能", image: "/pictures/front/C_4A.png" },
  { id: "5", name: "宜思", role: "治癒者", description: "生命的守護神", ability: "查看 C_5B 獲取詳細技能", image: "/pictures/front/C_5A.png" },
  { id: "6", name: "劉鴻", role: "狂戰士", description: "憤怒的化身", ability: "查看 C_6B 獲取詳細技能", image: "/pictures/front/C_6A.png" },
  { id: "7", name: "酒伊", role: "遊俠", description: "荒野的追蹤者", ability: "查看 C_7B 獲取詳細技能", image: "/pictures/front/C_7A.png" },
  { id: "8", name: "世濟", role: "聖騎士", description: "正義的象徵", ability: "查看 C_8B 獲取詳細技能", image: "/pictures/front/C_8A.png" },
  { id: "9", name: "哲興", role: "召喚師", description: "異界的引導者", ability: "查看 C_9B 獲取詳細技能", image: "/pictures/front/C_9A.png" }
];

export const TASKS: Task[] = [
  { id: "t1", title: "採集藥草", description: "前往神秘森林收集三種稀有藥草。", reward: "獲得 50 金幣", difficulty: "easy" },
  { id: "t2", title: "修復橋樑", description: "在斷橋處使用木材與工具進行修繕。", reward: "全體移動力 +1", difficulty: "medium" },
  { id: "t3", title: "討伐惡龍", description: "前往火山口與惡龍對決。", reward: "贏得遊戲勝利", difficulty: "hard" }
];

export const BUILDINGS: Building[] = [
  { id: "b1", name: "酒館", description: "冒險者聚集之地。", effect: "恢復 20 點體力", location: "市中心" },
  { id: "b2", name: "神廟", description: "神神聖莊嚴的祭祀場所。", effect: "消除所有負面狀態", location: "山頂" },
  { id: "b3", name: "市集", description: "交易物資的熱鬧地方。", effect: "可以用半價購買道具", location: "河邊" }
];

export const QA_BANK: QAItem[] = [
  { id: "q1", category: "基礎規則", question: "如果任務卡抽完了怎麼辦？", answer: "將棄卡堆重新洗牌後作為薪任務堆使用。" },
  { id: "q2", category: "戰鬥細節", question: "反擊會消耗行動點嗎？", answer: "不會，反擊是被動觸發的。" }
];
