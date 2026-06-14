export {};

/*
阶段 6：可测试纯函数

真实场景：
价格计算、优惠券、运费、权限判断都应该优先写成纯函数，方便测试。

题目 1：
定义 CartItem：
- productId
- price
- quantity

题目 2：
定义 Coupon：
- type: "amount" | "percent"
- value: number

题目 3：
实现 calculateSubtotal(items)，计算商品小计。

题目 4：
实现 applyCoupon(subtotal, coupon)，规则：
- amount：直接减 value，最低为 0
- percent：按百分比打折，例如 20 表示减 20%

题目 5：
实现 calculatePayable(items, coupon?)。

要求：
- 不依赖 Date.now、Math.random、外部变量
- 对 quantity <= 0 或 price < 0 的数据要明确处理
*/

type CartItem = {
  productId: string;
  price: number;
  quantity: number;
};

type Coupon =
  | { type: "amount"; value: number }
  | { type: "percent"; value: number };

function calculateSubtotal(items: CartItem[]): number {
  // TODO: 实现题目 3
  return 0;
}

function applyCoupon(subtotal: number, coupon: Coupon): number {
  // TODO: 实现题目 4
  return subtotal;
}

function calculatePayable(items: CartItem[], coupon?: Coupon): number {
  // TODO: 实现题目 5
  return calculateSubtotal(items);
}

console.log(
  "[03-testable-pure-functions] percent coupon:",
  calculatePayable(
    [{ productId: "p1", price: 100, quantity: 2 }],
    { type: "percent", value: 20 },
  ),
);
console.log(
  "[03-testable-pure-functions] amount coupon:",
  calculatePayable(
    [
      { productId: "p1", price: 100, quantity: 2 },
      { productId: "p2", price: 50, quantity: 0 },
      { productId: "p3", price: -10, quantity: 1 },
    ],
    { type: "amount", value: 250 },
  ),
);
console.log("[03-testable-pure-functions] no coupon:", calculatePayable([{ productId: "p4", price: 30, quantity: 3 }]));
