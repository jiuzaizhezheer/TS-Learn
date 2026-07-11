export { };

/*
阶段 4：重试和超时

真实场景：
请求第三方服务、上传文件、调用 AI 接口时，经常需要 timeout 和 retry。

题目 1：
定义 RetryOptions：
- retries: number
- delayMs: number
- timeoutMs: number

题目 2：
实现 withTimeout<T>(task, timeoutMs)，如果超时则 reject。

题目 3：
实现 retry<T>(task, options)，失败后重试，超过次数后抛出最后一次错误。

要求：
- task 类型是 () => Promise<T>
- 不要丢失返回值 T 的类型
- 错误处理里不要直接使用 any
*/

type RetryOptions = {
  retries: number;
  delayMs: number;
  timeoutMs: number;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withTimeout<T>(
  task: () => Promise<T>,
  timeoutMs: number,
): Promise<T> {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error("timeout"));
    }, timeoutMs);
  });

  try {
    return await Promise.race([task(), timeoutPromise]);
  } finally {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
  }
}

async function retry<T>(
  task: () => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  // TODO: 实现题目 3，可以使用 sleep
  let lastError: unknown;
  for (let i = 0; i <= options.retries; i++) {
    try {
      return await withTimeout(task, options.timeoutMs);
    } catch (error) {
      lastError = error;
      if (i < options.retries) {
        await sleep(options.delayMs);
      }
    }
  }
  throw lastError;
}

let failedTimes = 0;

console.log("[03-retry-timeout] success:", await retry(async () => "ok", { retries: 3, delayMs: 10, timeoutMs: 1000 }));
console.log(
  "[03-retry-timeout] retry success:",
  await retry(
    async () => {
      failedTimes += 1;

      if (failedTimes < 2) {
        throw new Error("临时失败");
      }

      return "第二次成功";
    },
    { retries: 3, delayMs: 10, timeoutMs: 1000 },
  ),
);

try {
  await retry(async () => sleep(30).then(() => "too late"), { retries: 1, delayMs: 10, timeoutMs: 5 });
} catch (error) {
  console.log("[03-retry-timeout] timeout:", error instanceof Error ? error.message : error);
}
