export { };

/*
阶段 3：清洗不可靠数据

真实场景：
外部系统、旧接口、Excel 导入的数据经常类型不稳定。

题目 1：
RawEmployee 表示原始数据：
- id 可能是 string 或 number
- name 可能为空字符串
- department 可能为空
- salary 可能是 string 或 number

题目 2：
Employee 表示清洗后的数据：
- id: string
- name: string
- department: string
- salary: number

题目 3：
实现 normalizeEmployee(raw)，规则：
- id 转成 string
- name 去除首尾空格，空 name 返回 null
- department 为空时设为 "未分配"
- salary 转为 number，无法转换或小于 0 时返回 null

题目 4：
实现 normalizeEmployees(rawList)，过滤掉无效数据。

要求：
- 返回类型明确写 Employee | null
- 使用类型收窄处理 string | number
*/

type RawEmployee = {
  id: string | number;
  name: string;
  department?: string | null;
  salary: string | number;
};

type Employee = {
  id: string;
  name: string;
  department: string;
  salary: number;
};


function parseSalary(salary: number | string): number | null {
  if (typeof salary === "string" && salary.trim() === "") {
    return null;
  }
  const value = Number(salary);
  return Number.isFinite(value) && value >= 0 ? value : null;
}
function normalizeEmployee(raw: RawEmployee): Employee | null {
  // TODO: 实现题目 3
  const id: string = String(raw.id)
  const name: string = raw.name.trim()
  if (name === "") return null
  const department: string = raw.department?.trim() || "未分配"
  const salary = parseSalary(raw.salary)

  if (salary === null) return null
  return { id, name, department, salary }
}

function normalizeEmployees(rawList: RawEmployee[]): Employee[] {
  return rawList
    .map(normalizeEmployee)
    .filter((e): e is Employee => e !== null);
}

console.log(
  "[03-normalize-raw-data] list:",
  normalizeEmployees([
    { id: 1, name: " 赵六 ", salary: "12000" },
    { id: 2, name: "", salary: "abc" },
    { id: "3", name: "钱七", department: " 研发 ", salary: 18000 },
    { id: "4", name: "孙八", salary: -1 },
  ]),
);
console.log("[03-normalize-raw-data] single invalid:", normalizeEmployee({ id: 5, name: " ", salary: 100 }));
