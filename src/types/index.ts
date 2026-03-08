// 脱单抽签结果
export interface LoveFortune {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tips: string[];
  rank: 'super_lucky' | 'lucky' | 'average' | 'bad';
}

// 今日桃花运
export interface DailyFortune {
  date: string;
  loveIndex: number;
  color: string;
  number: number;
  direction: string;
  tip: string;
}

// 相亲匹配度
export interface MatchResult {
  score: number;
  comment: string;
  advice: string;
}

// 复合抽签结果
export interface ReunionFortune {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tips: string[];
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
