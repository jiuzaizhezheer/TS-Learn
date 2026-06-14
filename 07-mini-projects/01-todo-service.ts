export {};

/*
阶段 7：迷你项目 1 - Todo 服务

真实场景：
这是最小 CRUD 业务：建模、创建、更新、筛选、统计。

题目 1：
定义 Todo：
- id: string
- title: string
- status: "todo" | "doing" | "done"
- priority: "low" | "medium" | "high"
- createdAt: Date
- completedAt?: Date

题目 2：
实现 createTodo(title, priority)，返回 Todo。

题目 3：
实现 updateTodoStatus(todo, status)，规则：
- status 变成 done 时写入 completedAt
- 从 done 改回其他状态时移除 completedAt

题目 4：
实现 filterTodos(todos, filters)，支持按 status、priority、keyword 筛选。

题目 5：
实现 getTodoStats(todos)，返回每种 status 的数量。

要求：
- filters 类型要合理，不要所有字段都必填
- stats 可以用 Record<TodoStatus, number>
- 不要修改原对象，返回新对象
*/

type TodoStatus = "todo" | "doing" | "done";
type TodoPriority = "low" | "medium" | "high";

type Todo = {
  id: string;
  title: string;
  status: TodoStatus;
  priority: TodoPriority;
  createdAt: Date;
  completedAt?: Date;
};

type TodoFilters = {
  status?: TodoStatus;
  priority?: TodoPriority;
  keyword?: string;
};

function createTodo(title: string, priority: TodoPriority): Todo {
  return {
    id: `todo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    status: "todo",
    priority,
    createdAt: new Date(),
  };
}

function updateTodoStatus(todo: Todo, status: TodoStatus): Todo {
  if (status === "done") {
    return {
      ...todo,
      status,
      completedAt: todo.completedAt ?? new Date(),
    };
  }

  const { completedAt: _completedAt, ...todoWithoutCompletedAt } = todo;
  return {
    ...todoWithoutCompletedAt,
    status,
  };
}

function filterTodos(todos: Todo[], filters: TodoFilters): Todo[] {
  const keyword = filters.keyword?.trim().toLowerCase();

  return todos.filter((todo) => {
    const matchesStatus = filters.status === undefined || todo.status === filters.status;
    const matchesPriority = filters.priority === undefined || todo.priority === filters.priority;
    const matchesKeyword = keyword === undefined || todo.title.toLowerCase().includes(keyword);

    return matchesStatus && matchesPriority && matchesKeyword;
  });
}

function getTodoStats(todos: Todo[]): Record<TodoStatus, number> {
  const stats: Record<TodoStatus, number> = {
    todo: 0,
    doing: 0,
    done: 0,
  };

  for (const todo of todos) {
    stats[todo.status] += 1;
  }

  return stats;
}

const firstTodo = createTodo("学习 TypeScript 类型建模", "high");
const secondTodo = createTodo("整理练习日志", "medium");
const doingTodo = updateTodoStatus(firstTodo, "doing");
const doneTodo = updateTodoStatus(secondTodo, "done");
const todos = [doingTodo, doneTodo];

console.log("[01-todo-service] created:", firstTodo);
console.log("[01-todo-service] done:", doneTodo);
console.log("[01-todo-service] filtered:", filterTodos(todos, { status: "doing", keyword: "typescript" }));
console.log("[01-todo-service] stats:", getTodoStats(todos));
