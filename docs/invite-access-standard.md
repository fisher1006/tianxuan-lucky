# 邀请码接入统一方案（团队共识版）

> 适用范围：后续所有需要邀请码门槛的产品前端
> 
> 后端统一：`invite-code-service`
> 
> 当前基准实现：`tianxuan-lucky`

---

## 1. 统一结论

后续所有产品的邀请码方案，前端一律采用 `tianxuan-lucky` 当前这一套，不再每个项目重新设计、重新验收。

统一原则：

1. **邀请码校验服务统一走 `invite-code-service`**
2. **前端统一采用「cookie + localStorage sessionToken」双层机制**
3. **未解锁态、验证页、恢复登录态、首页获取邀请码入口，全部保持同一交互模型**
4. **固定逻辑抽成公共模块，业务项目只传产品配置，不重复造轮子**
5. **获取邀请码按钮的跳转链接逻辑视为固定能力，不再每个产品单独写一版**

一句话：

**以后新产品接邀请码，不是“再做一次”，而是“接这套标准模块”。**

---

## 2. 标准业务流程

### 2.1 用户首次访问

- 服务端读取 `invite_access` cookie
- 若未验证：进入未解锁态
- 首页展示：
  - 输入邀请码解锁
  - 获取邀请码指引

### 2.2 用户进入验证页 `/verify`

- 展示邀请码输入框
- 输入邀请码后，前端调用本项目的 `/api/invite/redeem`
- 本项目服务端再转发到 `invite-code-service`

### 2.3 验证成功后

服务端：
- 设置 `invite_access=granted` 的 httpOnly cookie
- 返回前端可续期的 `sessionToken`

前端：
- 保存 `invite_code` 到 localStorage（便于回显）
- 保存 `sessionToken` 到 localStorage（便于恢复访问状态）
- 跳转首页并刷新

### 2.4 后续访问恢复

如果：
- cookie 丢了，但 localStorage 里还保留 `sessionToken`

则前端自动调用 `/api/invite/session`：
- sessionToken 有效 → 服务端重新下发 cookie + 新 sessionToken
- sessionToken 无效 → 清除本地 sessionToken，回到未解锁态

### 2.5 已解锁用户的状态同步

如果：
- 当前 cookie 有效
- 但本地没有 sessionToken

则首页自动调用 `/api/invite/session` 的 GET：
- 生成新的 sessionToken，同步到 localStorage

这个动作的意义是：

**保证 cookie 和本地恢复凭证始终能互相补位。**

---

## 3. 前端统一状态模型

邀请码能力统一只分三层状态：

### A. 未解锁

表现：
- 首页看到锁态
- 可去 `/verify`
- 可点“获取邀请码指引”

### B. 恢复中

表现：
- 前端发现 localStorage 里有 `sessionToken`
- 正在调用 `/api/invite/session` 恢复 cookie
- 页面文案统一为：`正在恢复邀请码状态...`

### C. 已解锁

表现：
- 可以访问受保护内容
- 首页直接展示业务能力入口

这三层已经够用，别再额外发明一堆“半登录”“准解锁”“待验证”状态，纯增复杂度。

---

## 4. 统一接口协议

前端不直接请求外部 `invite-code-service`，统一走**本项目自己的 BFF API**。

### 4.1 `POST /api/invite/redeem`

用途：兑换邀请码

前端传：

```json
{
  "code": "TIAN-ABCD-EFGH"
}
```

服务端转发给 `invite-code-service` 时统一补齐：

```json
{
  "code": "TIAN-ABCD-EFGH",
  "productKey": "当前产品 key",
  "site": "当前站点标识"
}
```

成功返回：
- `success: true`
- `sessionToken`
- 设置 `invite_access` cookie

失败返回：
- `success: false`
- `status`
- `error`

### 4.2 `POST /api/invite/session`

用途：根据本地 `sessionToken` 恢复访问状态

前端传：

```json
{
  "token": "..."
}
```

成功：
- 返回新的 `sessionToken`
- 重设 `invite_access` cookie

失败：
- 返回无效原因
- 前端清理本地 token

### 4.3 `GET /api/invite/session`

用途：当 cookie 已有效时，为前端补发一个可续期的 `sessionToken`

成功：
- `success: true`
- `sessionToken`

---

## 5. 统一存储约定

### Cookie

统一字段：

- `invite_access=granted`

作用：
- 作为服务端受保护页面放行依据
- httpOnly，不让前端直接改

### localStorage

统一字段：

- `INVITE_CODE_STORAGE_KEY`
- `INVITE_SESSION_STORAGE_KEY`

默认值命名建议：

- `xxx_invite_code`
- `xxx_invite_session`

作用：
- `invite_code`：仅用于输入框回显和体验优化
- `sessionToken`：用于 cookie 丢失后的状态恢复

原则：

**权限判断以 cookie 为准，恢复能力以 sessionToken 为辅。**

不要反过来。

---

## 6. 获取邀请码按钮：统一固定逻辑

这个逻辑以后不要再讨论了，直接固化。

### 统一规则

未解锁态下，以下两个位置都展示：

1. 首页未解锁态
2. `/verify` 验证页

统一按钮文案：

- `获取邀请码指引`

统一行为：

- 点击后新开外链
- 链接来自 `NEXT_PUBLIC_INVITE_GUIDE_URL`
- 未配置时使用产品默认兜底链接

统一补充文案：

- `需要邀请码？可前往指定商品或页面查看获取方式`

### 为什么必须固定

因为这不是业务创新点，只是转化漏斗的一部分。

如果每个项目都自己写：
- 文案会漂
- 链接接法会漂
- QA 会重复验
- 用户路径会不一致

这类逻辑最适合直接标准化。

---

## 7. 路由保护统一规则

统一用 middleware 保护受限业务路由。

当前 `tianxuan-lucky` 是：

- `/lottery/:path*`

后续新项目按业务改 matcher，但机制不变：

1. 检查 `invite_access` cookie
2. 没有就跳转 `/verify`
3. 带上 `next` 参数记录来源路径

注意：

- `/verify` 本身不能被保护
- 首页是否直接锁态展示，取决于产品设计；但**受保护核心页必须靠 middleware 防守**

别只做前端按钮隐藏，那不叫权限控制，那叫安慰剂。

---

## 8. 环境变量统一约定

每个接入邀请码的产品至少要有：

```env
INVITE_API_BASE_URL=
INVITE_PRODUCT_KEY=
INVITE_SESSION_SECRET=
NEXT_PUBLIC_INVITE_GUIDE_URL=
```

说明：

- `INVITE_API_BASE_URL`：邀请码服务地址，必须由环境变量提供，禁止写死
- `INVITE_PRODUCT_KEY`：当前产品在邀请码系统内的唯一标识
- `INVITE_SESSION_SECRET`：前端项目本地 sessionToken 签名密钥
- `NEXT_PUBLIC_INVITE_GUIDE_URL`：获取邀请码按钮跳转地址

### 强约束

- **禁止在代码里硬编码服务地址**
- **禁止把产品 key 写死在多个文件里**
- **禁止把获取邀请码链接散落在多个组件里**

这些都应该集中配置。

---

## 9. 公共模块拆分方案

建议以后统一抽成 `invite-access` 模块，业务项目只做装配。

### 9.1 推荐目录

```text
src/modules/invite-access/
  client/
    InviteGate.tsx
    InviteInput.tsx
    useInviteRecovery.ts
  server/
    cookie.ts
    session.ts
    config.ts
  api/
    redeem.ts
    session.ts
  shared/
    constants.ts
    types.ts
```

### 9.2 各模块职责

#### `shared/constants.ts`
放所有公共常量：
- cookie key
- localStorage key
- 默认错误文案
- 默认按钮文案

#### `server/config.ts`
放所有配置读取：
- `getInviteApiBaseUrl()`
- `getInviteProductKey()`
- `getInviteGuideUrl()`

#### `server/session.ts`
放：
- `createInviteSessionToken()`
- `verifyInviteSessionToken()`
- `setInviteAccessCookie()`

#### `api/redeem.ts`
封装兑换逻辑：
- 参数校验
- 转发 `invite-code-service`
- 统一错误映射
- 发 cookie
- 返回 sessionToken

#### `api/session.ts`
封装恢复逻辑：
- POST 恢复
- GET 补发 sessionToken

#### `client/useInviteRecovery.ts`
封装前端恢复逻辑：
- cookie 有但 localStorage 无 → 同步 sessionToken
- cookie 无但 localStorage 有 → 尝试恢复 cookie
- 恢复失败 → 清理本地状态

#### `client/InviteInput.tsx`
只关心 UI + 调用 redeem API

#### `client/InviteGate.tsx`
统一负责：
- 未解锁页
- 恢复中态
- 已解锁态切换

---

## 10. 哪些是公共的，哪些是业务自己的

### 公共能力（必须抽离）

1. 邀请码兑换 API 调用流程
2. sessionToken 续期/恢复逻辑
3. cookie 设置逻辑
4. localStorage 键名和恢复机制
5. 未解锁态按钮结构
6. 获取邀请码按钮逻辑
7. middleware 鉴权模式
8. 错误状态映射

### 业务自定义（允许覆盖）

1. 页面视觉风格
2. 浮层动画和装饰元素
3. 标题、副标题
4. matcher 的业务路由范围
5. 验证成功后的跳转目标
6. 指引文案的轻微业务化表达

边界要清楚：

**流程层统一，视觉层可变。**

不要把流程逻辑藏在视觉组件里，不然永远抽不干净。

---

## 11. 新产品接入最小清单

新产品接邀请码时，只做这些事：

1. 配环境变量
   - `INVITE_API_BASE_URL`
   - `INVITE_PRODUCT_KEY`
   - `INVITE_SESSION_SECRET`
   - `NEXT_PUBLIC_INVITE_GUIDE_URL`

2. 接公共模块
   - middleware
   - `/api/invite/redeem`
   - `/api/invite/session`
   - verify 页面
   - 首页未解锁态

3. 配本产品信息
   - 产品标题
   - 默认跳转页
   - 受保护路由 matcher
   - guide 文案（如需）

4. 验证四条核心链路
   - 无 cookie 无 token → 未解锁
   - 有 token 无 cookie → 可恢复
   - 有 cookie 无 token → 可补发 token
   - token 失效 → 正确回退未解锁

---

## 12. 验收标准（以后统一用这份）

### 功能验收

- 输入正确邀请码可解锁
- 输入错误邀请码有正确提示
- 刷新后仍保持已解锁
- cookie 丢失时可由 sessionToken 恢复
- token 无效时会自动清理并回到锁态
- 未解锁时“获取邀请码指引”按钮可正常跳转

### 技术验收

- 未硬编码 `invite-code-service` 地址
- `productKey` 来自环境变量
- guide URL 来自环境变量
- 权限判断以 cookie 为准
- 前端不直连外部邀请码服务
- 受保护路径由 middleware 控制

### 体验验收

- 恢复中有明确状态提示
- 验证成功后反馈明确
- 首页和验证页入口一致
- 错误文案不要抽象到用户看不懂

---

## 13. 对团队的最终共识

以后邀请码前端能力，统一按下面这句执行：

> **邀请码校验后端统一使用 `invite-code-service`；前端统一复用 `tianxuan-lucky` 这套「cookie + sessionToken 恢复 + verify 页面 + 首页获取邀请码入口」标准模块，不再按项目重新开发和重新验收。**

再说直白点：

**这已经不是某个项目的临时实现了，而是后续产品的邀请码标准件。**

---

## 14. 当前基准实现映射

当前 `tianxuan-lucky` 已有实现可作为标准参考：

- `src/lib/invite-auth.ts`
- `src/lib/invite-session.ts`
- `src/app/api/invite/redeem/route.ts`
- `src/app/api/invite/session/route.ts`
- `src/components/InviteInput.tsx`
- `src/components/HomePageClient.tsx`
- `src/app/verify/page.tsx`
- `middleware.ts`

下一步建议不是重写，而是：

1. **先从这些文件里抽公共层**
2. **把产品特有 UI 留在业务目录**
3. **把共通逻辑收敛成单独模块**

这是正确路径，别再二次发明邀请码系统。