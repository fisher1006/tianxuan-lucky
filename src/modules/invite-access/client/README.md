# invite-access client 接入说明

目标：新项目只复制 `src/modules/invite-access/client`，然后改配置，不改流程。

## 需要复制的文件

```text
src/modules/invite-access/client/
  InviteGate.tsx
  InviteInput.tsx
  VerifyPageTemplate.tsx
  useInviteRecovery.ts
  index.ts
```

以及保留共享文件：

```text
src/modules/invite-access/shared/constants.ts
src/modules/invite-access/shared/public.ts
```

## 新项目最少接法

### 1. 首页锁态

```tsx
import { InviteGate } from '@/modules/invite-access/client';

<InviteGate isVerified={isVerified} title="你的产品名">
  <YourUnlockedPage />
</InviteGate>
```

### 2. 验证页

```tsx
import { VerifyPageTemplate } from '@/modules/invite-access/client';

export default function VerifyPage() {
  return <VerifyPageTemplate successRedirectPath="/" />;
}
```

### 3. 环境变量

```env
INVITE_API_BASE_URL=
INVITE_PRODUCT_KEY=
INVITE_SESSION_SECRET=
NEXT_PUBLIC_INVITE_GUIDE_URL=
```

## 可以改的

- `title`
- `description`
- `successRedirectPath`
- 页面视觉样式

## 不要改的

- redeem / session 调用流程
- cookie + sessionToken 恢复机制
- guide 按钮跳转逻辑
- localStorage key 使用方式
