# 邀请码方案团队共识（群内短版）

从现在开始，后续所有需要邀请码门槛的产品，统一采用 `tianxuan-lucky` 当前这套前端方案，不再按项目重新设计和重新验收。

统一规则：

1. 后端统一使用 `invite-code-service`
2. 前端统一采用 `cookie + localStorage sessionToken` 恢复机制
3. 统一包含：
   - 首页未解锁态
   - `/verify` 验证页
   - `/api/invite/redeem`
   - `/api/invite/session`
   - middleware 路由保护
   - “获取邀请码指引”固定按钮逻辑
4. `invite-code-service` 地址必须走环境变量，禁止硬编码
5. `productKey`、guide URL 都必须走配置，禁止散落在多个组件里
6. 权限判断以 cookie 为准，sessionToken 只负责恢复，不反客为主

结论：

**以后新产品接邀请码，不是再开发一遍，而是直接接这套标准件。**

详细版说明见：
- `docs/invite-access-standard.md`
