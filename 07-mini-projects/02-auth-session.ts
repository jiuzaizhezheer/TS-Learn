export {};

/*
阶段 7：迷你项目 2 - 登录态和权限

真实场景：
Web 项目经常需要判断当前用户是否登录、是否有权限访问某个资源。

题目 1：
定义 AuthState 判别联合：
- 未登录：status 为 "guest"
- 已登录：status 为 "authenticated"，包含 user 和 token
- 过期：status 为 "expired"，包含 expiredAt

题目 2：
定义 Permission：
- "user:read"
- "user:write"
- "article:read"
- "article:write"
- "system:admin"

题目 3：
实现 hasPermission(state, permission)，规则：
- guest 和 expired 都返回 false
- admin 角色拥有所有权限
- 普通用户只拥有 user:read 和 article:read
- editor 拥有 article:read 和 article:write

题目 4：
实现 requireLogin(state)，如果已登录返回 user，否则返回错误字符串。

要求：
- AuthState 用判别联合建模
- 权限集合建议使用 Record 或数组常量
- 不要用布尔字段 isLogin/isExpired 叠加表达状态
*/

type Role = "admin" | "user" | "editor";

type User = {
  id: string;
  name: string;
  role: Role;
};

type AuthState =
  | { status: "guest" }
  | { status: "authenticated"; user: User; token: string }
  | { status: "expired"; expiredAt: Date };

type Permission =
  | "user:read"
  | "user:write"
  | "article:read"
  | "article:write"
  | "system:admin";

function hasPermission(state: AuthState, permission: Permission): boolean {
  // TODO: 实现题目 3
  return false;
}

function requireLogin(state: AuthState): User | string {
  // TODO: 实现题目 4
  return "请先登录";
}

console.log(hasPermission({ status: "guest" }, "article:read"));

