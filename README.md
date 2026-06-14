# TS-Learn

这是一个按真实开发场景拆分的 TypeScript 练习目录。

建议顺序：

1. `01-basics-modeling`：基础类型、对象建模、联合类型、类型收窄。
2. `02-functions-modules`：函数签名、模块边界、配置对象。
3. `03-real-data-processing`：接口数据、表单校验、数据清洗。
4. `04-async-api`：异步请求、分页、重试、缓存。
5. `05-generics-utility-types`：泛型、工具类型、可复用组件类型。
6. `06-errors-testing`：错误建模、Result 模式、可测试函数。
7. `07-mini-projects`：贴近真实业务的小模块综合练习。

使用方式：

```bash
npm install
```

每个 `.ts` 文件里的题目都写在注释中。直接按 TODO 实现，然后运行：

```bash
npm run typecheck
```

如果你想快速执行某个文件，可以安装依赖后使用：

```bash
npm run dev -- 01-basics-modeling/01-user-profile.ts
```

