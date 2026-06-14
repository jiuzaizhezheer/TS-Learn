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
  const init: RequestInit = {
    method: options.method,
    headers: {
      "content-type": "application/json",
      ...options.headers,
    },
  };

  if (options.body !== undefined) {
    init.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, {
    ...init,
  });

  if (!response.ok) {
    throw new Error(`请求失败：${response.status}`);
  }

  return (await response.json()) as T;
}

async function getUser(id: string): Promise<User> {
  return request<User>(`/api/users/${id}`, { method: "GET" });
}

async function createOrder(input: CreateOrderInput): Promise<Order> {
  return request<Order>("/api/orders", { method: "POST", body: input });
}

const originalFetch = globalThis.fetch;

globalThis.fetch = async (url, init) => {
  const method = init?.method ?? "GET";

  if (url === "/api/users/u1" && method === "GET") {
    return Response.json({ id: "u1", name: "测试用户" });
  }

  if (url === "/api/orders" && method === "POST") {
    const input = JSON.parse(String(init?.body)) as CreateOrderInput;
    return Response.json({
      id: "o1",
      productId: input.productId,
      quantity: input.quantity,
      status: "created",
    } satisfies Order);
  }

  return new Response("Not Found", { status: 404 });
};

try {
  console.log("[01-request-wrapper] get user:", await getUser("u1"));
  console.log("[01-request-wrapper] create order:", await createOrder({ productId: "p1", quantity: 2 }));

  try {
    await request<unknown>("/api/missing", { method: "GET" });
  } catch (error) {
    console.log("[01-request-wrapper] failed request:", error instanceof Error ? error.message : error);
  }
} finally {
  globalThis.fetch = originalFetch;
}
