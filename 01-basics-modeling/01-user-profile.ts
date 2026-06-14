export {};

/*
阶段 1：对象建模和基础类型

真实场景：
后端返回用户资料，前端需要展示用户名、会员等级、联系方式等信息。

题目 1：
定义 UserProfile 类型，要求包含：
- id：数字
- name：字符串
- email：字符串
- phone：可选字符串
- role：只能是 "admin" | "editor" | "viewer"
- createdAt：Date

题目 2：
实现 formatUserDisplayName(user)，返回：
- admin 用户："[管理员] 张三"
- editor 用户："[编辑] 张三"
- viewer 用户："[访客] 张三"

题目 3：
实现 maskContact(user)，返回优先级：
- 如果有 phone，返回隐藏后的手机号，例如 "138****8888"
- 如果没有 phone，返回 email

要求：
- 不要使用 any
- role 必须用联合类型限制
- phone 不存在时不能报错
*/

type UserRole = "admin" | "editor" | "viewer";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
};

function formatUserDisplayName(user: UserProfile): string {
  // TODO: 在这里实现题目 2
  throw new Error("TODO");
}

function maskContact(user: UserProfile): string {
  // TODO: 在这里实现题目 3
  throw new Error("TODO");
}

const demoUser: UserProfile = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  phone: "13812348888",
  role: "admin",
  createdAt: new Date(),
};

const editorUser: UserProfile = {
  ...demoUser,
  id: 2,
  name: "李四",
  role: "editor",
};

const viewerWithoutPhone: UserProfile = {
  id: 3,
  name: "王五",
  email: "wangwu@example.com",
  role: "viewer",
  createdAt: new Date(),
};

console.log("[01-user-profile] admin display:", formatUserDisplayName(demoUser));
console.log("[01-user-profile] editor display:", formatUserDisplayName(editorUser));
console.log("[01-user-profile] masked phone:", maskContact(demoUser));
console.log("[01-user-profile] fallback email:", maskContact(viewerWithoutPhone));
