export { };

/*
阶段 4：分页和简单缓存

真实场景：
后台管理系统经常有分页列表，并且会缓存最近一次查询结果。

题目 1：
定义 QueryParams：
- keyword?: string
- page: number
- pageSize: number

题目 2：
定义 PageData<T>：
- items: T[]
- total: number

题目 3：
实现 createPageCache<T>()，返回：
- get(key): PageData<T> | undefined
- set(key, value): void
- clear(): void

题目 4：
实现 buildQueryKey(params)，要求同样的参数得到同样的 key。

要求：
- 缓存内部可以使用 Map
- createPageCache 必须是泛型函数
- key 的生成要避免 undefined 导致不稳定
*/

type QueryParams = {
  keyword?: string;
  page: number;
  pageSize: number;
};

type PageData<T> = {
  items: T[];
  total: number;
};

type PageCache<T> = {
  get(key: string): PageData<T> | undefined;
  set(key: string, value: PageData<T>): void;
  clear(): void;
};

function createPageCache<T>(): PageCache<T> {
  const cache = new Map<string, PageData<T>>();
  // TODO: 实现题目 3
  return {
    get: (key: string) => cache.get(key),
    set: (key: string, value: PageData<T>) => cache.set(key, value),
    clear: () => cache.clear(),
  };
}

function buildQueryKey(params: QueryParams): string {
  // TODO: 实现题目 4
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}:${value}`)
    .join("-");
}

const cache = createPageCache<{ id: string; title: string }>();
cache.set(buildQueryKey({ page: 1, pageSize: 10 }), {
  items: [{ id: "a1", title: "公告" }],
  total: 1,
});

const firstPageKey = buildQueryKey({ page: 1, pageSize: 10 });
const keywordKey = buildQueryKey({ keyword: "公告", page: 1, pageSize: 10 });

console.log("[02-pagination-cache] cached first page:", cache.get(firstPageKey));
console.log("[02-pagination-cache] missing keyword page:", cache.get(keywordKey));
cache.clear();
console.log("[02-pagination-cache] after clear:", cache.get(firstPageKey));
