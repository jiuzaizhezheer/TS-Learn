export {};

/*
阶段 3：表单校验

真实场景：
注册、登录、创建订单等页面都需要表单校验，并且要返回字段级错误。

题目 1：
定义 RegisterForm：
- username: string
- email: string
- password: string
- age?: number

题目 2：
定义 FormErrors<T>，要求 key 是表单字段，value 是错误消息数组。

题目 3：
实现 validateRegisterForm(form)，返回 FormErrors<RegisterForm>。

校验规则：
- username 长度至少 3
- email 必须包含 @
- password 长度至少 8
- age 如果存在，必须大于等于 18

要求：
- 没有错误的字段不要出现在返回对象里
- 不要使用 any
- 尝试让 FormErrors<T> 可以复用于其他表单
*/

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  age?: number;
};

type FormErrors<T> = Partial<Record<keyof T, string[]>>;

function validateRegisterForm(form: RegisterForm): FormErrors<RegisterForm> {
  // TODO: 实现题目 3
  return {};
}

console.log(
  validateRegisterForm({
    username: "ab",
    email: "wrong-email",
    password: "123",
  }),
);

