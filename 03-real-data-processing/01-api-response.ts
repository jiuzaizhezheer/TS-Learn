export {};

/*
阶段 3：API 响应类型

真实场景：
后端接口经常返回统一结构，例如 { code, message, data }。

题目 1：
定义泛型 ApiResponse<T>：
- code: number
- message: string
- data: T

题目 2：
定义 PageResult<T>：
- list: T[]
- page: number
- pageSize: number
- total: number

题目 3：
实现 unwrapResponse(response)，要求：
- code === 0 时返回 data
- code !== 0 时 throw Error(message)

题目 4：
实现 getTotalPages(pageResult)，返回总页数，向上取整。

要求：
- unwrapResponse 必须是泛型函数
- getTotalPages 能支持 PageResult<User>、PageResult<Order> 等任意数据
*/

type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type PageResult<T> = {
  list: T[];
  page: number;
  pageSize: number;
  total: number;
};

type User = {
  id: string;
  name: string;
};

function unwrapResponse<T>(response: ApiResponse<T>): T {
  if (response.code !== 0) {
    throw new Error(response.message);
  }

  return response.data;
}

function getTotalPages<T>(pageResult: PageResult<T>): number {
  if (pageResult.pageSize <= 0) {
    return 0;
  }

  return Math.ceil(pageResult.total / pageResult.pageSize);
}

const response: ApiResponse<PageResult<User>> = {
  code: 0,
  message: "ok",
  data: {
    list: [{ id: "u1", name: "王五" }],
    page: 1,
    pageSize: 10,
    total: 36,
  },
};

const failedResponse: ApiResponse<null> = {
  code: 500,
  message: "服务异常",
  data: null,
};

console.log("[01-api-response] total pages:", getTotalPages(unwrapResponse(response)));
console.log("[01-api-response] empty total pages:", getTotalPages({ list: [], page: 1, pageSize: 10, total: 0 }));

try {
  unwrapResponse(failedResponse);
} catch (error) {
  console.log("[01-api-response] failed message:", error instanceof Error ? error.message : error);
}
