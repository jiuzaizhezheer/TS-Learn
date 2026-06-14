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
  // TODO: 实现题目 3
  throw new Error("TODO");
}

function getTotalPages<T>(pageResult: PageResult<T>): number {
  // TODO: 实现题目 4
  return 0;
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

console.log(getTotalPages(unwrapResponse(response)));

