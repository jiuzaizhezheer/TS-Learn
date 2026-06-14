export {};

/*
阶段 4：异步请求封装

真实场景：
前端项目通常会封装 request<T>()，让接口返回值有类型。

题目 1：
定义 RequestOptions：
- method: "GET" | "POST" | "PUT" | "DELETE"
- headers?: Record<string, string>
- body?: unknown

题目 2：
实现 request<T>(url, options)，返回 Promise<T>。

题目 3：
实现 getUser(id)，内部调用 request<User>()。

题目 4：
实现 createOrder(input)，内部调用 request<Order>()。

要求：
- request<T> 必须是泛型函数
- body 不要使用 any
- 处理 response.ok 为 false 的情况
*/

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
};

type User = {
  id: string;
  name: string;
};

type CreateOrderInput = {
  productId: string;
  quantity: number;
};

type Order = {
  id: string;
  productId: string;
  quantity: number;
  status: "created" | "paid" | "cancelled";
};

async function request<T>(url: string, options: RequestOptions): Promise<T> {
  // TODO: 使用 fetch 实现题目 2
  throw new Error(`TODO: ${url} ${options.method}`);
}

async function getUser(id: string): Promise<User> {
  // TODO: 实现题目 3
  return request<User>(`/api/users/${id}`, { method: "GET" });
}

async function createOrder(input: CreateOrderInput): Promise<Order> {
  // TODO: 实现题目 4
  return request<Order>("/api/orders", { method: "POST", body: input });
}

void getUser("u1");
void createOrder({ productId: "p1", quantity: 2 });

