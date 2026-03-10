// 签文建议（带emoji）
export interface FortuneTip {
  emoji: string;
  text: string;
}

// 能量画像
export interface EnergyProfile {
  romanticEnergy: number;      // 浪漫能量
  charmAura: number;           // 魅力气场
  soulResonance: number;      // 灵魂共振
  emotionalDepth: number;     // 情感深度
  fateConnection: number;     // 命运牵绊
  spiritualAwareness?: number; // 灵性觉知
  adventureIndex?: number;     // 冒险指数
  aestheticPerception?: number; // 美学感知
  earthEnergy?: number;        // 大地能量
  waterEnergy?: number;        // 水流能量
  windEnergy?: number;         // 风之能量
  growthEnergy?: number;       // 生长能量
}

// 今日星象
export interface Celestial {
  planet: string;      // 行星
  aspect: string;      // 星象相位
  moonPhase: string;  // 月相
}

// 解读段落
export interface Reading {
  title: string;
  content: string;
}

// 幸运元素
export interface LuckyElement {
  color: string;
  number: number;
  time: string;
  direction: string;
  place: string;
}

// 脱单抽签结果
export interface LoveFortune {
  id: string;
  emoji: string;
  title: string;
  subtitle?: string;
  description: string;
  overview?: string;
  energyProfile?: EnergyProfile;
  celestial?: Celestial;
  readings?: Reading[];
  tips: string[] | FortuneTip[];
  lucky?: LuckyElement;
  rank: 'super_lucky' | 'lucky' | 'average' | 'bad';
}

// 今日桃花运
export interface DailyFortune {
  date: string;
  loveIndex: number;
  color: string;
  number: number;
  direction: string;
  time?: string;
  place?: string;
  tip: string;
  overview?: string;
  lucky?: LuckyElement;
  energyProfile?: EnergyProfile;
  celestial?: Celestial;
  readings?: Reading[];
}

// 相亲匹配度
export interface MatchResult {
  score: number;
  comment: string;
  advice: string;
  subtitle?: string;
  overview?: string;
  lucky?: LuckyElement;
  energyProfile?: EnergyProfile;
  celestial?: Celestial;
  readings?: Reading[];
  tips?: string[] | FortuneTip[];
  rank?: 'super_lucky' | 'lucky' | 'average' | 'bad';
}

// 复合抽签结果
export interface ReunionFortune {
  id: string;
  emoji: string;
  title: string;
  subtitle?: string;
  description: string;
  overview?: string;
  energyProfile?: EnergyProfile;
  celestial?: Celestial;
  readings?: Reading[];
  tips: string[] | FortuneTip[];
  lucky?: LuckyElement;
  rank: 'super_lucky' | 'lucky' | 'average' | 'bad';
}

// 邀请码验证结果
export interface InviteValidation {
  valid: boolean;
  error?: string;
  data?: {
    tool: string;
    expiresDays: number;
    nonce: string;
  };
}
