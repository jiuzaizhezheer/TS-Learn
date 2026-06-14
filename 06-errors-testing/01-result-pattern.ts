export {};

/*
阶段 6：Result 模式

真实场景：
某些业务不希望到处 throw，而是希望函数返回成功或失败结果，方便页面展示错误。

题目 1：
定义 Result<T, E>：
- 成功：{ ok: true; data: T }
- 失败：{ ok: false; error: E }

题目 2：
定义 LoginError：
- "EMPTY_USERNAME"
- "EMPTY_PASSWORD"
- "INVALID_PASSWORD"

题目 3：
实现 login(username, password)，返回 Result<User, LoginError>。

规则：
- username 为空，返回 EMPTY_USERNAME
- password 为空，返回 EMPTY_PASSWORD
- password !== "12345678"，返回 INVALID_PASSWORD
- 成功时返回 User

题目 4：
实现 getLoginMessage(result)，把成功和失败结果转成中文文案。

要求：
- 使用判别联合
- getLoginMessage 里要通过 result.ok 收窄类型
*/

type Result<T, E> =
  | { ok: true; data: T }
  | { ok: false; error: E };

type LoginError = "EMPTY_USERNAME" | "EMPTY_PASSWORD" | "INVALID_PASSWORD";

type User = {
  id: string;
  username: string;
};

function login(username: string, password: string): Result<User, LoginError> {
  // TODO: 实现题目 3
  return { ok: false, error: "INVALID_PASSWORD" };
}

function getLoginMessage(result: Result<User, LoginError>): string {
  // TODO: 实现题目 4
  return "";
}

console.log(getLoginMessage(login("admin", "wrong")));

