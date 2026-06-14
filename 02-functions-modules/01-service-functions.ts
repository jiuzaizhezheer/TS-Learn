export {};

/*
阶段 2：服务函数签名设计

真实场景：
业务代码里经常会有 service 层函数，例如创建用户、更新用户、查询用户。

题目 1：
定义 CreateUserInput，只包含创建用户需要的字段：
- name
- email
- role

题目 2：
定义 UpdateUserInput，要求：
- id 必填
- name、email、role 都是可选

题目 3：
实现 createUser(input)，返回完整 User。

题目 4：
实现 updateUser(user, input)，只更新 input 中提供的字段。

要求：
- 不要让调用方传 id、createdAt 这类应该由系统生成的字段
- UpdateUserInput 不要手写重复字段，尝试使用工具类型
*/

type UserRole = "admin" | "member";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

type CreateUserInput = Pick<User, "name" | "email" | "role">;

type UpdateUserInput = {
  id: User["id"];
} & Partial<Pick<User, "name" | "email" | "role">>;

function createUser(input: CreateUserInput): User {
  const now = new Date();

  return {
    id: `user-${Date.now()}`,
    ...input,
    createdAt: now,
    updatedAt: now,
  };
}

function updateUser(user: User, input: UpdateUserInput): User {
  if (user.id !== input.id) {
    throw new Error(`用户 id 不匹配：${input.id}`);
  }

  return {
    ...user,
    ...input,
    updatedAt: new Date(),
  };
}

const createdUser = createUser({ name: "李四", email: "lisi@example.com", role: "member" });
const updatedUser = updateUser(createdUser, { id: createdUser.id, name: "李四-new" });

console.log("[01-service-functions] created:", createdUser);
console.log("[01-service-functions] updated:", updatedUser);
