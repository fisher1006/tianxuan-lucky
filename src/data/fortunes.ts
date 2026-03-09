import { LoveFortune, DailyFortune, MatchResult, ReunionFortune } from '@/types';

// 脱单抽签签文数据
export const loveFortunes: LoveFortune[] = [
  {
    id: '1',
    emoji: '🌸',
    title: '上上签 - 桃花盛开',
    subtitle: '今日姻缘运势极佳！你的桃花运正值高峰期，身旁可能已有欣赏你的人。放下顾虑，主动出击，成功率高达九成！',
    description: '今日姻缘运势极佳！你的桃花运正值高峰期，身旁可能已有欣赏你的人。放下顾虑，主动出击，成功率高达九成！',
    overview: '在宇宙星图的某个角落，你的正缘正在悄然绽放。星辰为你铺就一条浪漫之路，那个人带着星光走向你。把握今天，勇敢迈出第一步，爱情的奇迹就在眼前。',
    lucky: { color: '粉红色', number: 7, time: '14:00-16:00', direction: '东南', place: '咖啡馆' },
    tips: [
      { emoji: '☕', text: '去咖啡馆放松，好运正在来临' },
      { emoji: '👀', text: '注意身边的人，TA可能在偷偷看你' },
      { emoji: '💌', text: '遇到心动的人就主动表达' }
    ],
    rank: 'super_lucky',
    energyProfile: { romanticEnergy: 95, charmAura: 92, soulResonance: 90, emotionalDepth: 88, fateConnection: 96 },
    celestial: { planet: '金星', aspect: '合金星', moonPhase: '满月' },
    readings: [
      { title: '命中注定之人', content: '那个人可能有着温暖的笑容，声音里带着轻微的笑意。你们会在一个充满阳光的地方相遇——也许是街角的咖啡馆，也许是公园的长椅上。' },
      { title: '今日你的光', content: '你今天的魅力正处于年度峰值。所有被你吸引的人，都在被你的灵魂之光照亮。不要隐藏自己的光芒。' }
    ]
  },
  {
    id: '2',
    emoji: '🌹',
    title: '上签 - 紅鸞星動',
    subtitle: '红鸾星今日动，你的人格魅力大放异彩！单身的你有望遇到理想型，已有伴侣的你们感情会更加甜蜜。',
    description: '红鸾星今日动，你的人格魅力大放异彩！单身的你有望遇到理想型，已有伴侣的你们感情会更加甜蜜。',
    overview: '月老为你系上红线，丘比特之箭已悄然射出。你的灵魂伴侣正在这个世界的某个角落等待与你相遇。魅力的光芒在你身上流转，吸引着命中注定的那个TA。',
    lucky: { color: '酒红色', number: 3, time: '19:00-21:00', direction: '东', place: '书店' },
    tips: [
      { emoji: '📚', text: '去书店逛逛，可能遇到同好之人' },
      { emoji: '✨', text: '保持魅力，好运会主动找上门' },
      { emoji: '💬', text: '对身边的人好一点，惊喜随时降临' }
    ],
    rank: 'super_lucky',
    energyProfile: { romanticEnergy: 88, charmAura: 85, soulResonance: 82, emotionalDepth: 78, fateConnection: 90 },
    celestial: { planet: '金星', aspect: '水星拱', moonPhase: '盈凸月' },
    readings: [
      { title: '命中注定之人', content: '那个人的眼神里藏着星光让你们在文字的世界里相遇，从一本共同喜欢的书开始。' },
      { title: '今日你的光', content: '你的气质今天格外迷人，举手投足间都在发光。这是表达心意的最佳时机。' }
    ]
  },
  {
    id: '3',
    emoji: '💕',
    title: '中上签 - 情意绵绵',
    subtitle: '感情运势平稳上升，你对爱情的期待正在慢慢实现。耐心等待，属于你的缘分即将出现。',
    description: '感情运势平稳上升，你对爱情的期待正在慢慢实现。耐心等待，属于你的缘分即将出现。',
    overview: '爱情的花蕾正在枝头悄然孕育，只需要再给它一点时间。春风轻拂，你的心动信号正在被宇宙接收。那个对的人，正在穿越人海向你走来。',
    lucky: { color: '浅紫色', number: 5, time: '10:00-12:00', direction: '东北', place: '公园' },
    tips: [
      { emoji: '🌿', text: '去公园散步，享受春日的浪漫' },
      { emoji: '🎨', text: '参加兴趣活动，扩大社交圈' },
      { emoji: '😊', text: '保持真诚，待人友善' }
    ],
    rank: 'lucky',
    energyProfile: { romanticEnergy: 72, charmAura: 70, soulResonance: 75, emotionalDepth: 80, fateConnection: 68 },
    celestial: { planet: '月亮', aspect: '土星拱', moonPhase: '上弦月' },
    readings: [
      { title: '命中注定之人', content: '那个人可能在你经常去的公园或美术馆出现，与你有着相似的审美和爱好。' },
      { title: '今日你的光', content: '你的温柔今天特别动人，这种由内而外的魅力会吸引真正欣赏你的人。' }
    ]
  },
  {
    id: '4',
    emoji: '🌺',
    title: '中签 - 花开有时',
    subtitle: '感情需要耐心培育，不要急于求成。时机成熟时，爱情自然会绽放。现在是提升自己的好时机。',
    description: '感情需要耐心培育，不要急于求成。时机成熟时，爱情自然会绽放。现在是提升自己的好时机。',
    overview: '每一朵花都有它的花期，爱情亦然。你的缘分如同含苞待放的花朵，需要阳光和雨露的滋养。现在是自我成长的最佳时机，当你盛开，蝴蝶自來。',
    lucky: { color: '白色', number: 8, time: '15:00-17:00', direction: '南', place: '健身房' },
    tips: [
      { emoji: '💪', text: '去健身房提升自己' },
      { emoji: '🌸', text: '不要过于执着结果，享受过程' },
      { emoji: '🎵', text: '多关注自己的兴趣爱好' }
    ],
    rank: 'lucky',
    energyProfile: { romanticEnergy: 65, charmAura: 68, soulResonance: 70, emotionalDepth: 72, fateConnection: 60 },
    celestial: { planet: '火星', aspect: '太阳拱', moonPhase: '峨眉月' },
    readings: [
      { title: '命中注定之人', content: '那个人可能被你的自律和上进心吸引，在健身房或运动场所与你不期而遇。' },
      { title: '今日你的光', content: '你今天的活力满满，这种健康的美比任何妆容都更加吸引人。' }
    ]
  },
  {
    id: '5',
    emoji: '🍃',
    title: '中平签 - 静待花开',
    subtitle: '感情运势较为平淡，不宜有太大动作。适合修身养性，等待最佳时机。切勿急于表白或做重大决定。',
    description: '感情运势较为平淡，不宜有太大动作。适合修身养性，等待最佳时机。切勿急于表白或做重大决定。',
    overview: '湖面平静如镜，正是内心修养的好时光。爱情尚未成熟，强行追求只会惊扰了这份美好。静心等待，让时间和宇宙为你安排最合适的相遇。',
    lucky: { color: '淡蓝色', number: 2, time: '20:00-22:00', direction: '西北', place: '家中' },
    tips: [
      { emoji: '🧘', text: '保持平常心，不要刻意追求' },
      { emoji: '📖', text: '利用这段时间阅读提升内在' },
      { emoji: '🌙', text: '时机未到，静心等待缘分' }
    ],
    rank: 'average',
    energyProfile: { romanticEnergy: 50, charmAura: 55, soulResonance: 65, emotionalDepth: 70, fateConnection: 48 },
    celestial: { planet: '土星', aspect: '月亮拱', moonPhase: '新月' },
    readings: [
      { title: '命中注定之人', content: '那个人还在来时的路上，现在是你修炼内功的最佳时机。提升自己，才能在相遇时展现最好的自己。' },
      { title: '今日你的光', content: '今天适合韬光养晦，你的内在之美正在悄悄积累，等待绽放的那一刻。' }
    ]
  },
  {
    id: '6',
    emoji: '🌧️',
    title: '下签 - 暂未相逢',
    subtitle: '今日不宜过于主动，感情方面可能会有小挫折。调整心态，不要灰心，好运很快就会来临。',
    description: '今日不宜过于主动，感情方面可能会有小挫折。调整心态，不要灰心，好运很快就会来临。',
    overview: '乌云会散去，彩虹会出现。今天的挫折是为了明天更好的相遇暂时让心灵休憩，给自己一个拥抱。好运正在赶来的路上，属于你的爱情不会缺席。',
    lucky: { color: '灰色', number: 1, time: '08:00-10:00', direction: '北', place: '卧室' },
    tips: [
      { emoji: '🛏️', text: '今天适合独处，不宜表白' },
      { emoji: '🌈', text: '保持乐观，坏天气很快过去' },
      { emoji: '🎮', text: '做点让自己开心的事，放松心情' }
    ],
    rank: 'bad',
    energyProfile: { romanticEnergy: 35, charmAura: 40, soulResonance: 50, emotionalDepth: 55, fateConnection: 30 },
    celestial: { planet: '天王星', aspect: '火星冲', moonPhase: '残月' },
    readings: [
      { title: '命中注定之人', content: '今天不是相遇的好日子，但请相信，属于你的人终会出现。给自己一个拥抱，好运即将到来。' },
      { title: '今日你的光', content: '今天你的能量可能在低点，但这也是你倾听内心、积蓄力量的好时机。爱自己最重要。' }
    ]
  }
];

// 今日桃花运数据
export const dailyFortunes: Omit<DailyFortune, 'date'>[] = [
  {
    loveIndex: 95,
    color: '粉红色',
    number: 7,
    direction: '东南',
    time: '14:00-16:00',
    place: '咖啡馆',
    tip: '今天是超级幸运日！表白必成功，邂逅必来电!',
    energyProfile: { romanticEnergy: 95, charmAura: 92, soulResonance: 90, emotionalDepth: 88, fateConnection: 96 },
    celestial: { planet: '金星', aspect: '合金星', moonPhase: '满月' },
    readings: [
      { title: '命中注定之人', content: '那个人可能有着温暖的笑容，声音里带着轻微的笑意。你们会在一个充满阳光的地方相遇——也许是街角的咖啡馆，也许是公园的长椅上。' },
      { title: '今日你的光', content: '你今天的魅力正处于年度峰值。所有被你吸引的人，都在被你的灵魂之光照亮。不要隐藏自己的光芒。' }
    ]
  },
  {
    loveIndex: 88,
    color: '桃红色',
    number: 3,
    direction: '东',
    time: '19:00-21:00',
    place: '书店',
    tip: '运势极佳，遇到真爱的概率高达80%！',
    energyProfile: { romanticEnergy: 88, charmAura: 85, soulResonance: 82, emotionalDepth: 78, fateConnection: 90 },
    celestial: { planet: '金星', aspect: '水星拱', moonPhase: '盈凸月' },
    readings: [
      { title: '命中注定之人', content: '那个人的眼神里藏着星光让你们在文字的世界里相遇，从一本共同喜欢的书开始。' },
      { title: '今日你的光', content: '你的气质今天格外迷人，举手投足间都在发光。这是表达心意的最佳时机。' }
    ]
  },
  {
    loveIndex: 75,
    color: '浅紫色',
    number: 5,
    direction: '东北',
    time: '10:00-12:00',
    place: '公园',
    tip: '爱情运势上升，适合主动出击！',
    energyProfile: { romanticEnergy: 72, charmAura: 70, soulResonance: 75, emotionalDepth: 80, fateConnection: 68 },
    celestial: { planet: '月亮', aspect: '土星拱', moonPhase: '上弦月' },
    readings: [
      { title: '命中注定之人', content: '那个人可能在你经常去的公园或美术馆出现，与你有着相似的审美和爱好。' },
      { title: '今日你的光', content: '你的温柔今天特别动人，这种由内而外的魅力会吸引真正欣赏你的人。' }
    ]
  },
  {
    loveIndex: 65,
    color: '白色',
    number: 8,
    direction: '南',
    time: '15:00-17:00',
    place: '健身房',
    tip: '平稳的一天，保持好心情等待缘分。',
    energyProfile: { romanticEnergy: 65, charmAura: 68, soulResonance: 70, emotionalDepth: 72, fateConnection: 60 },
    celestial: { planet: '火星', aspect: '太阳拱', moonPhase: '峨眉月' },
    readings: [
      { title: '命中注定之人', content: '那个人可能被你的自律和上进心吸引，在健身房或运动场所与你不期而遇。' },
      { title: '今日你的光', content: '你今天的活力满满，这种健康的美比任何妆容都更加吸引人。' }
    ]
  },
  {
    loveIndex: 55,
    color: '淡蓝色',
    number: 2,
    direction: '西北',
    time: '20:00-22:00',
    place: '家中',
    tip: '今天适合学习提升自己，感情稍后再议。',
    energyProfile: { romanticEnergy: 50, charmAura: 55, soulResonance: 65, emotionalDepth: 70, fateConnection: 48 },
    celestial: { planet: '土星', aspect: '月亮拱', moonPhase: '新月' },
    readings: [
      { title: '命中注定之人', content: '那个人还在来时的路上，现在是你修炼内功的最佳时机。提升自己，才能在相遇时展现最好的自己。' },
      { title: '今日你的光', content: '今天适合韬光养晦，你的内在之美正在悄悄积累，等待绽放的那一刻。' }
    ]
  },
  {
    loveIndex: 40,
    color: '灰色',
    number: 1,
    direction: '北',
    time: '08:00-10:00',
    place: '卧室',
    tip: '今日宜静不宜动，给自己放个假吧。',
    energyProfile: { romanticEnergy: 35, charmAura: 40, soulResonance: 50, emotionalDepth: 55, fateConnection: 30 },
    celestial: { planet: '天王星', aspect: '火星冲', moonPhase: '残月' },
    readings: [
      { title: '命中注定之人', content: '今天不是相遇的好日子，但请相信，属于你的人终会出现。给自己一个拥抱，好运即将到来。' },
      { title: '今日你的光', content: '今天你的能量可能在低点，但这也是你倾听内心、积蓄力量的好时机。爱自己最重要。' }
    ]
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
    rank: 'super_lucky',
    energyProfile: { romanticEnergy: 95, charmAura: 90, soulResonance: 92, emotionalDepth: 88, fateConnection: 94 },
    celestial: { planet: '金星', aspect: '合金星', moonPhase: '满月' },
    readings: [
      { title: '命中注定之人', content: '你们之间的羁绊从未真正断开，那根红线还系在彼此手腕上。只要一方主动，奇迹就会发生。' },
      { title: '今日你的光', content: '你今天的复合能量达到峰值！对方能感受到你的诚意，这是一个可以改变命运的日子。' }
    ]
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
    rank: 'super_lucky',
    energyProfile: { romanticEnergy: 85, charmAura: 82, soulResonance: 80, emotionalDepth: 78, fateConnection: 85 },
    celestial: { planet: '月亮', aspect: '金星拱', moonPhase: '盈凸月' },
    readings: [
      { title: '命中注定之人', content: '对方也在偷偷关注你的一切，你们都在等对方先迈出那一步。勇敢一点，幸福就在眼前。' },
      { title: '今日你的光', content: '你散发的温柔气质今天特别强大，这种成熟的美比年轻时更加动人。' }
    ]
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
    rank: 'lucky',
    energyProfile: { romanticEnergy: 70, charmAura: 68, soulResonance: 72, emotionalDepth: 75, fateConnection: 65 },
    celestial: { planet: '水星', aspect: '太阳拱', moonPhase: '上弦月' },
    readings: [
      { title: '命中注定之人', content: '复合的可能性正在萌芽，但需要耐心培养。不要急于求成，让感情自然生长。' },
      { title: '今日你的光', content: '你今天的耐心和成熟是最吸引人的特质。这种淡定的魅力会让对方重新认识你。' }
    ]
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
    rank: 'average',
    energyProfile: { romanticEnergy: 55, charmAura: 52, soulResonance: 60, emotionalDepth: 65, fateConnection: 50 },
    celestial: { planet: '土星', aspect: '月亮刑', moonPhase: '峨眉月' },
    readings: [
      { title: '命中注定之人', content: '感情的结果还未确定，现在最重要的是做好自己。吸引力法则会帮助你吸引对的人。' },
      { title: '今日你的光', content: '今天专注于自我提升是最好的选择。你的独立和自信是最美的样子。' }
    ]
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
    rank: 'average',
    energyProfile: { romanticEnergy: 45, charmAura: 50, soulResonance: 55, emotionalDepth: 60, fateConnection: 42 },
    celestial: { planet: '天王星', aspect: '太阳拱', moonPhase: '新月' },
    readings: [
      { title: '命中注定之人', content: '有时候，放手不是结束，而是新故事的开始。属于你的幸福可能在下一个转角。' },
      { title: '今日你的光', content: '你的勇气和洒脱是今天最耀眼的光芒。接受过去，才能拥抱更好的未来。' }
    ]
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
    rank: 'bad',
    energyProfile: { romanticEnergy: 25, charmAura: 30, soulResonance: 40, emotionalDepth: 45, fateConnection: 20 },
    celestial: { planet: '冥王星', aspect: '火星冲', moonPhase: '残月' },
    readings: [
      { title: '命中注定之人', content: '这段缘分已经走到尽头，但请相信，每段结束都是新开始的铺垫。未来的幸福正在等你。' },
      { title: '今日你的光', content: '今天虽然感性上很难受，但你是坚强的。好好爱自己，这才是最重要的事。' }
    ]
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
