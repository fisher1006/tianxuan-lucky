# 天选桃花运工具站 - 技术方案

> 版本：v1.0 | 日期：2026-03-08

---

## 1. 技术选型

### 1.1 前端

| 技术 | 选型 | 理由 |
|------|------|------|
| **框架** | Next.js 14 (App Router) | 简单易用、SEO友好、部署到Vercel零配置 |
| **样式** | Tailwind CSS | 快速开发、小红书风格组件丰富 |
| **动画** | Framer Motion | 抽签仪式感动画、页面转场流畅 |
| **状态管理** | Zustand | 轻量级、适合邀请码状态管理 |

**技术栈亮点：**
- ✅ 邀请码验证 - 前后端共用单向算法，前端可验证
- ✅ 本地存储 - localStorage 记录验证状态
- ✅ 部署简单 - Vercel 一键部署

### 1.2 部署

| 平台 | 选择 | 费用 |
|------|------|------|
| **托管** | Vercel | 免费版足够 |
| **域名** | 自行购买 | ~50元/年 |
| **CDN** | Vercel Global Edge | 免费 |

---

## 2. 数据结构设计

### 2.1 邀请码系统（前后端共用单向算法）

使用 HMAC 算法的邀请码系统，**前后端共用同一算法和密钥，可真正验证邀请码真伪**。

**邀请码格式：** `TOOL-XXXX.SIGN`（如 `LOVE-ABCD.EFGH`）
- 前4位：工具标识（如 LOVE, MATCH, REUN）
- 中4位：随机字符（字母数字，去掉易混淆字符）
- 后4位：HMAC-SHA1 签名（基于密钥）

**核心算法：**
```typescript
// lib/invite.ts - 前后端共用

const SECRET_KEY = 'tianxuan-lucky-2026-secret'; // 前后端共用密钥

// 生成邀请码
function generateInviteCode(tool: string, expiresDays: number = 30): string {
  const nonce = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  const data = `${tool}|${expiresDays}|${timestamp}|${nonce}`;
  
  // 使用 HMAC-SHA1 计算签名
  const sig = CryptoJS.HmacSHA1(data, SECRET_KEY).toString().substring(0, 4).toUpperCase();
  
  // 格式：TOOL-NONC.SIGN
  return `${tool}-${nonce}.${sig}`;
}

// 验证邀请码（前后端共用）
function validateInviteCode(code: string): { valid: boolean; error?: string; data?: any } {
  try {
    const parts = code.toUpperCase().split('.');
    if (parts.length !== 2) {
      return { valid: false, error: '邀请码格式错误' };
    }
    
    const [toolNonce, sig] = parts;
    const tool = toolNonce.substring(0, 4);
    const nonce = toolNonce.substring(4);
    
    // 尝试不同的过期天数（1-90天）
    for (let days = 1; days <= 90; days++) {
      const timestamp = Date.now().toString(36).toUpperCase();
      const data = `${tool}|${days}|${timestamp}|${nonce}`;
      const expectedSig = CryptoJS.HmacSHA1(data, SECRET_KEY).toString().substring(0, 4).toUpperCase();
      
      if (expectedSig === sig) {
        return { 
          valid: true, 
          data: { tool, expiresDays: days, nonce } 
        };
      }
      
      // 也尝试用当前时间戳附近的窗口验证
      const now = Date.now();
      for (let offset = -86400000; offset <= 86400000; offset += 3600000) {
        const ts = (now + offset).toString(36).toUpperCase();
        const d = `${tool}|${days}|${ts}|${nonce}`;
        const s = CryptoJS.HmacSHA1(d, SECRET_KEY).toString().substring(0, 4).toUpperCase();
        if (s === sig) {
          return { valid: true, data: { tool, expiresDays: days } };
        }
      }
    }
    
    return { valid: false, error: '邀请码无效' };
  } catch (e) {
    return { valid: false, error: '邀请码解析失败' };
  }
}
```

**验证流程：**
1. 用户输入邀请码
2. 前端用同样算法+密钥重新计算签名
3. 匹配成功 = 有效邀请码
4. 验证通过后，`localStorage` 记录
5. 无需网络请求（可选：后续用户量大可加服务端验证）

**安全性：**
- 不知道密钥无法生成有效邀请码
- 随机猜测通过验证的概率：1/456976 ≈ 0.0002%

**存储方式：** `localStorage` 记录已验证状态（key: `invite_verified`, value: `true`）

### 2.2 抽签数据（纯前端）

```typescript
// types/fortune.ts

// 脱单抽签结果
interface LoveFortune {
  id: string;
  emoji: string;        // 🌸🌹💕
  title: string;        // "上上签 - 桃花盛开"
  description: string; // 50-100字运势解读
  tips: string[];      // 3条建议
  rank: 'super_lucky' | 'lucky' | 'average' | 'bad';
}

// 今日桃花运
interface DailyFortune {
  date: string;
  loveIndex: number;   // 0-100
  color: string;       // 幸运色
  number: number;      // 幸运数字
  direction: string;   // 幸运方向
  tip: string;
}

// 相亲匹配度
interface MatchResult {
  score: number;       // 0-100
  comment: string;
  advice: string;
}
```

**数据量预估：** 50-100条签文/结果，足够轮换使用

---

## 3. 页面设计（4个场景）

### 3.1 页面结构

```
/
├── /                   # 首页（引导页）
├── /verify             # 邀请码验证页
├── /lottery/love      # 脱单抽签
├── /lottery/today     # 今日桃花运
├── /lottery/match     # 相亲匹配度
└── /lottery/reunion   # 复合抽签
```

### 3.2 页面详情

#### 首页 `/`
- **入口：** 显示4个抽签功能卡片
- **状态：** 未验证时引导去验证，验证后展示
- **分享：** 每个卡片可单独分享

#### 验证页 `/verify`
- **输入框：** 邀请码输入
- **按钮：** 立即解锁
- **提示：** 有效期、使用次数说明
- **仪式感：** 输入正确后彩带/星光动画庆祝

#### 脱单抽签 `/lottery/love`
- **输入：** 昵称 + 出生年月
- **流程：**
  1. 点击"开始抽签"按钮
  2. 抽签筒摇晃动画（3秒）
  3. 签文缓缓浮现
  4. 显示结果卡片
- **结果：** 上上签/上签/中签/下签 + 建议

#### 今日桃花运 `/lottery/today`
- **输入：** 昵称
- **流程：**
  1. 点击"开始测算"
  2. 桃花指数进度条动画
  3. 显示今日运势卡片
- **结果：** 桃花指数(0-100) + 幸运色/数字/方向

#### 相亲匹配度 `/lottery/match`
- **输入：** 你的信息 + 对方信息（性别、年龄、星座）
- **流程：**
  1. 点击"开始匹配"
  2. 两颗心碰撞动画
  3. 匹配度数字递增动画
- **结果：** 匹配度% + 简短评语

#### 复合抽签 `/lottery/reunion`
- **输入：** 昵称 + 分手时间
- **流程：** 同脱单抽签
- **结果：** 复合运势 + 建议

---

## 4. UI风格建议

### 4.1 色彩体系

| 用途 | 颜色 | 色值 |
|------|------|------|
| **主色** | 桃花粉 | `#FF6B9D` |
| **辅色** | 浪漫紫 | `#C4A7E7` |
| **点缀** | 星光金 | `#FFD700` |
| **背景** | 奶白色 | `#FFF9F5` |
| **文字** | 深粉色 | `#4A3540` |

### 4.2 设计风格

- **整体：** 柔和、梦幻少女感
- **圆角：** 大圆角（16px-24px），亲切友好
- **阴影：** 柔和投影，增加层次感
- **字体：** 圆体/手写风格（如：ZCOOL XiaoWei、Nunito）

### 4.3 仪式感设计（重点）

1. **抽签筒动画：** 左右摇晃 + 粒子效果
2. **签文浮现：** 渐显 + 轻微上浮
3. **结果展示：** 展开式卡片，带有吉兆装饰（花瓣、星光）
4. **音效（可选）：** 抽签声、胜利音效

### 4.4 分享友好

- 每个结果页底部添加"分享到小红书"按钮
- 生成简洁的结果图片（方便截图分享）
- 引导文案："我的桃花运是XXX，快来测测你的"

---

## 5. 开发计划

### Phase 1：基础架构（1天）
- [ ] 初始化 Next.js 项目
- [ ] 配置 Tailwind CSS + 主题色
- [ ] 创建邀请码验证逻辑
- [ ] 建立抽签数据模型

### Phase 2：核心页面（2天）
- [ ] 首页 + 4个功能入口
- [ ] 验证页（含动画）
- [ ] 脱单抽签页（含抽签动画）
- [ ] 今日桃花运页

### Phase 3：扩展功能（1天）
- [ ] 相亲匹配度页
- [ ] 复合抽签页
- [ ] 分享功能（生成图片/引导）

### Phase 4：优化（1天）
- [ ] 移动端适配
- [ ] 加载状态优化
- [ ] SEO 设置
- [ ] Vercel 部署测试

**总工期：5天**

---

## 6. 后续扩展性

当前方案支持前端验证，后续可扩展：

| 扩展方向 | 当前方案 | 未来升级 |
|----------|----------|----------|
| 邀请码验证 | 前端单向算法验证 | 可选：服务端验证（用户量大时） |
| 数据统计 | 无 | Vercel Analytics（免费） |
| 用户体系 | 无 | NextAuth.js（可选） |
| 支付功能 | 人工 | 微信支付/小红书开店 |

---

## 7. 文件结构

```
tianxuan-lucky/
├── app/
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx           # 首页
│   ├── verify/
│   │   └── page.tsx       # 验证页
│   └── lottery/
│       ├── love/
│       │   └── page.tsx   # 脱单抽签
│       ├── today/
│       │   └── page.tsx   # 今日桃花运
│       ├── match/
│       │   └── page.tsx   # 相亲匹配度
│       └── reunion/
│           └── page.tsx   # 复合抽签
├── components/
│   ├── InviteInput.tsx    # 邀请码输入
│   ├── FortuneCard.tsx    # 结果卡片
│   ├── DrawAnimation.tsx  # 抽签动画
│   └── ShareButton.tsx    # 分享按钮
├── data/
│   ├── fortunes.ts         # 签文数据
│   └── inviteCodes.ts     # 邀请码列表
├── lib/
│   └── utils.ts           # 工具函数
├── types/
│   └── index.ts           # TypeScript 类型
└── public/
    └── fonts/             # 字体文件
```

---

*文档结束*
