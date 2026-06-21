export { };

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

function createLogger({
  level = "info",
  prefix = "",
  timestamp = true,
}: Partial<LoggerOptions> = {}): Logger {
  // 1. 组装最终配置
  const config: LoggerOptions = {
    level,
    prefix,
    timestamp,
  };

  // 2. 定义级别权重，用于比较日志级别高低
  const levelWeights: Record<LogLevel, number> = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  };

  const targetWeight = levelWeights[config.level];

  // 3. 通用日志输出处理函数
  const print = (level: LogLevel, message: string) => {
    // 如果当前调用的级别权重低于配置的级别权重，则不输出
    if (levelWeights[level] < targetWeight) {
      return;
    }

    const parts: string[] = [];
    
    // 如果配置了显示时间戳
    if (config.timestamp) {
      parts.push(`[${new Date().toISOString()}]`);
    }
    
    // 如果配置了前缀
    if (config.prefix) {
      parts.push(`[${config.prefix}]`);
    }
    
    parts.push(message);

    const output = parts.join(" ");

    // 根据不同的级别调用不同的 console 方法
    switch (level) {
      case "debug":
        console.debug(output);
        break;
      case "info":
        console.info(output);
        break;
      case "warn":
        console.warn(output);
        break;
      case "error":
        console.error(output);
        break;
    }
  };

  return {
    debug: (message: string) => print("debug", message),
    info: (message: string) => print("info", message),
    warn: (message: string) => print("warn", message),
    error: (message: string) => print("error", message),
  };
}

const logger = createLogger({ level: "warn", prefix: "OrderService" });
logger.info("这条不应该输出");
logger.error("这条应该输出");

const debugLogger = createLogger({ level: "debug", prefix: "DebugService", timestamp: false });
debugLogger.debug("[02-config-options] debug 输出");
debugLogger.info("[02-config-options] info 输出");
