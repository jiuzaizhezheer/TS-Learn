export {};

/*
阶段 5：表格列配置类型

真实场景：
后台管理系统经常需要给表格配置 columns，字段名必须和数据类型对应。

题目 1：
定义 TableColumn<T>：
- key: keyof T
- title: string
- render?: (value, row) => string

题目 2：
实现 createColumns<T>(columns)，直接返回 columns。

题目 3：
为 User 创建 columns，要求：
- name 列正常显示
- age 列 render 成 "18 岁"
- status 列 render 成中文状态

要求：
- key 不能写不存在的字段
- render 的 value 类型应该和 key 对应

进阶：
如果你发现 render 的 value 只能推导成 T[keyof T]，尝试把 TableColumn 改造成按 key 分发的联合类型。
*/

type TableColumn<T> = {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], row: T) => string;
};

function createColumns<T>(columns: TableColumn<T>[]): TableColumn<T>[] {
  return columns;
}

type User = {
  id: string;
  name: string;
  age: number;
  status: "active" | "disabled";
};

const userColumns = createColumns<User>([
  // TODO: 实现题目 3
]);

console.log("[02-table-columns] columns:", userColumns);
