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
  [Key in keyof T]: {
    key: Key;
    title: string;
    render?: (value: T[Key], row: T) => string;
  };
}[keyof T];

function createColumns<T>(columns: TableColumn<T>[]): TableColumn<T>[] {
  return columns;
}

function renderCell<T, Key extends keyof T>(
  column: {
    key: Key;
    title: string;
    render?: (value: T[Key], row: T) => string;
  },
  row: T,
): string {
  const value = row[column.key];
  return column.render ? column.render(value, row) : String(value);
}

function renderUserCell(column: TableColumn<User>, row: User): string {
  switch (column.key) {
    case "id":
      return renderCell(column, row);
    case "name":
      return renderCell(column, row);
    case "age":
      return renderCell(column, row);
    case "status":
      return renderCell(column, row);
  }
}

type User = {
  id: string;
  name: string;
  age: number;
  status: "active" | "disabled";
};

const userColumns = createColumns<User>([
  { key: "name", title: "姓名" },
  { key: "age", title: "年龄", render: (value) => `${value} 岁` },
  {
    key: "status",
    title: "状态",
    render: (value) => (value === "active" ? "启用" : "禁用"),
  },
]);

const tableUser: User = {
  id: "u1",
  name: "小明",
  age: 18,
  status: "active",
};

console.log("[02-table-columns] columns:", userColumns);
console.log(
  "[02-table-columns] rendered row:",
  userColumns.map((column) => ({
    title: column.title,
    value: renderUserCell(column, tableUser),
  })),
);
