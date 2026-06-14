export {};

/*
阶段 2：配置对象和默认值

真实场景：
组件、SDK、工具函数经常需要配置项，并且有默认值。

题目 1：
定义 LoggerOptions：
- level: "debug" | "info" | "warn" | "error"
- prefix?: string
- timestamp?: boolean

题目 2：
实现 createLogger(options?)，返回对象：
- debug(message)
- info(message)
- warn(message)
- error(message)

题目 3：
要求 level 控制输出级别：
- level = "warn" 时，只输出 warn 和 error
- level = "debug" 时，全部输出

要求：
- options 可以不传
- 默认 level 为 "info"
- 默认 timestamp 为 true
- 内部不要用 any
*/

type LogLevel = "debug" | "info" | "warn" | "error";

type LoggerOptions = {
  level: LogLevel;
  prefix?: string;
  timestamp?: boolean;
};

type Logger = Record<LogLevel, (message: string) => void>;

function createLogger(options?: Partial<LoggerOptions>): Logger {
  // TODO: 实现题目 2 和题目 3
  return {
    debug: () => undefined,
    info: () => undefined,
    warn: () => undefined,
    error: () => undefined,
  };
}

const logger = createLogger({ level: "warn", prefix: "OrderService" });
logger.info("这条不应该输出");
logger.error("这条应该输出");

