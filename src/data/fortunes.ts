import { LoveFortune, DailyFortune, MatchResult, ReunionFortune } from '@/types';

// 脱单抽签签文数据
export const loveFortunes: LoveFortune[] = [
  {
    id: '1',
    emoji: '🌸',
    title: '上上签 - 桃花盛开',
    description: '今日姻缘运势极佳！你的桃花运正值高峰期，身旁可能已有欣赏你的人。放下顾虑，主动出击，成功率高达九成！',
    tips: [
      '遇到心仪的对象时，直接表达好感成功率更高',
      '今天适合参加社交活动，婚恋成功率倍增',
      '保持微笑，你的好运正在路上'
    ],
    rank: 'super_lucky'
  },
  {
    id: '2',
    emoji: '🌹',
    title: '上签 - 紅鸞星動',
    description: '红鸾星今日动，你的人格魅力大放异彩！单身的你有望遇到理想型，已有伴侣的你们感情会更加甜蜜。',
    tips: [
      '今天会遇到让你心动的对象，好好把握',
      '对身边的人好一点，惊喜随时降临',
      '保持积极心态，好事连连'
    ],
    rank: 'super_lucky'
  },
  {
    id: '3',
    emoji: '💕',
    title: '中上签 - 情意绵绵',
    description: '感情运势平稳上升，你对爱情的期待正在慢慢实现。耐心等待，属于你的缘分即将出现。',
    tips: [
      '不要急于求成，缘分需要时间酝酿',
      '多参加兴趣活动，扩大社交圈',
      '保持真诚，待人友善'
    ],
    rank: 'lucky'
  },
  {
    id: '4',
    emoji: '🌺',
    title: '中签 - 花开有时',
    description: '感情需要耐心培育，不要急于求成。时机成熟时，爱情自然会绽放。现在是提升自己的好时机。',
    tips: [
      '提升自我，让自己变得更优秀',
      '不要过于执着于结果，享受过程',
      '多关注自己的兴趣爱好'
    ],
    rank: 'lucky'
  },
  {
    id: '5',
    emoji: '🍃',
    title: '中平签 - 静待花开',
    description: '感情运势较为平淡，不宜有太大动作。适合修身养性，等待最佳时机。切勿急于表白或做重大决定。',
    tips: [
      '保持平常心，不要刻意追求',
      '利用这段时间提升内在修养',
      '时机未到，静心等待'
    ],
    rank: 'average'
  },
  {
    id: '6',
    emoji: '🌧️',
    title: '下签 - 暂未相逢',
    description: '今日不宜过于主动，感情方面可能会有小挫折。调整心态，不要灰心，好运很快就会来临。',
    tips: [
      '今天适合独处，不宜表白',
      '保持乐观，不要被负面情绪影响',
      '做点让自己开心的事'
    ],
    rank: 'bad'
  }
];

// 今日桃花运数据
export const dailyFortunes: Omit<DailyFortune, 'date'>[] = [
  {
    loveIndex: 95,
    color: '粉红色',
    number: 7,
    direction: '东南',
    tip: '今天是超级幸运日！表白必成功，邂逅必来电!'
  },
  {
    loveIndex: 88,
    color: '桃红色',
    number: 3,
    direction: '东',
    tip: '运势极佳，遇到真爱的概率高达80%！'
  },
  {
    loveIndex: 75,
    color: '浅紫色',
    number: 5,
    direction: '东北',
    tip: '爱情运势上升，适合主动出击！'
  },
  {
    loveIndex: 65,
    color: '白色',
    number: 8,
    direction: '南',
    tip: '平稳的一天，保持好心情等待缘分。'
  },
  {
    loveIndex: 55,
    color: '淡蓝色',
    number: 2,
    direction: '西北',
    tip: '今天适合学习提升自己，感情稍后再议。'
  },
  {
    loveIndex: 40,
    color: '灰色',
    number: 1,
    direction: '北',
    tip: '今日宜静不宜动，给自己放个假吧。'
  }
];

// 相亲匹配度评语
export const matchComments: { min: number; max: number; comment: string; advice: string }[] = [
  { min: 90, max: 100, comment: '天作之合！', advice: '你们是天生一对，珍惜这段缘分！' },
  { min: 80, max: 89, comment: '心意相通', advice: '彼此很有默契，继续深入了解吧！' },
  { min: 70, max: 79, comment: '潜力无限', advice: '需要双方共同努力培养感情。' },
  { min: 60, max: 69, comment: '还需了解', advice: '多沟通多交流，感情需要时间沉淀。' },
  { min: 50, max: 59, comment: '有缘无分', advice: '或许可以做朋友，不强求。' },
  { min: 0, max: 49, comment: '缘浅缘散', advice: '不建议深入发展，保持普通朋友关系即可。' }
];

// 获取匹配结果
export function getMatchResult(score: number): MatchResult {
  const result = matchComments.find(m => score >= m.min && score <= m.max);
  return {
    score,
    comment: result?.comment || '未知',
    advice: result?.advice || '顺其自然'
  };
}

// 复合抽签签文数据
export const reunionFortunes: ReunionFortune[] = [
  {
    id: '1',
    emoji: '💖',
    title: '上上签 - 破镜重圆',
    description: '你们复合的时机已到！对方心中仍有你，只是缺少一个契机。主动联系，成功率极高！',
    tips: [
      '今天主动发消息问候一下',
      '回忆过去的美好时光能加分',
      '真诚道歉，表达真心'
    ],
    rank: 'super_lucky'
  },
  {
    id: '2',
    emoji: '💝',
    title: '上签 - 旧情复燃',
    description: '感情有复苏的迹象！对方对你还有感情，只是都在等待对方先开口。',
    tips: [
      '可以约出来见面聊聊',
      '适当展现你的改变',
      '保持耐心，好事将近'
    ],
    rank: 'super_lucky'
  },
  {
    id: '3',
    emoji: '💗',
    title: '中上签 - 柳暗花明',
    description: '复合有望，但需要时间。保持联系，不要过于激进，让感情自然发展。',
    tips: [
      '先从朋友做起',
      '展示你积极的一面',
      '给自己和对方一些时间'
    ],
    rank: 'lucky'
  },
  {
    id: '4',
    emoji: '💓',
    title: '中签 - 静候佳音',
    description: '复合的可能性存在但不确定。不要抱太大希望，也不要放弃，保持平常心。',
    tips: [
      '先专注自己的生活',
      '提升自己的价值',
      '缘分天注定'
    ],
    rank: 'average'
  },
  {
    id: '5',
    emoji: '🌱',
    title: '中平签 - 重新开始',
    description: '虽然复合不易，但你可以选择重新开始。放下过去，也许会遇到更好的人。',
    tips: [
      '接受现实，向前看',
      '把自己变得更好',
      '新感情可能会更适合你'
    ],
    rank: 'average'
  },
  {
    id: '6',
    emoji: '🍂',
    title: '下签 - 缘尽于此',
    description: '这段感情已经走到尽头。强行复合只会带来更多痛苦，是时候放手了。',
    tips: [
      '接受分离是成长的开始',
      '把注意力转移到自己身上',
      '未来还有更好的人在等你'
    ],
    rank: 'bad'
  }
];

// 随机获取签文
export function getRandomFortune<T>(fortunes: T[]): T {
  const index = Math.floor(Math.random() * fortunes.length);
  return fortunes[index];
}

// 根据日期获取固定的桃花运（每天一样）
export function getDailyFortuneByDate(date: string): DailyFortune {
  // 使用日期生成一个固定的索引
  const dateNum = date.split('-').reduce((acc, val) => acc + parseInt(val), 0);
  const index = dateNum % dailyFortunes.length;
  return {
    date,
    ...dailyFortunes[index]
  };
}

// 计算匹配度（基于生日和星座）
export function calculateMatchScore(yourInfo: { birthday: string; zodiac?: string }, otherInfo: { birthday: string; zodiac?: string }): number {
  // 简单的匹配算法
  const yourDay = parseInt(yourInfo.birthday.split('-')[2]);
  const otherDay = parseInt(otherInfo.birthday.split('-')[2]);
  
  // 基于日期的伪随机匹配度
  let score = 50 + Math.abs(yourDay - otherDay) % 40;
  
  // 如果有星座信息，可以增加匹配度
  if (yourInfo.zodiac && otherInfo.zodiac) {
    const compatibleZodiacs: Record<string, string[]> = {
      '白羊座': ['狮子座', '射手座', '双子座'],
      '金牛座': ['处女座', '摩羯座', '金牛座'],
      '双子座': ['天秤座', '水瓶座', '白羊座'],
      '巨蟹座': ['天蝎座', '双鱼座', '金牛座'],
      '狮子座': ['白羊座', '射手座', '双子座'],
      '处女座': ['金牛座', '摩羯座', '处女座'],
      '天秤座': ['双子座', '水瓶座', '狮子座'],
      '天蝎座': ['巨蟹座', '双鱼座', '摩羯座'],
      '射手座': ['白羊座', '狮子座', '水瓶座'],
      '摩羯座': ['金牛座', '处女座', '天蝎座'],
      '水瓶座': ['双子座', '天秤座', '射手座'],
      '双鱼座': ['巨蟹座', '天蝎座', '金牛座']
    };
    
    if (compatibleZodiacs[yourInfo.zodiac]?.includes(otherInfo.zodiac)) {
      score += 15;
    }
  }
  
  return Math.min(100, score);
}
