export {};

/*
阶段 6：领域错误建模

真实场景：
下单失败有很多原因：库存不足、商品不存在、用户被禁用、数量非法。

题目 1：
定义 PlaceOrderError 判别联合：
- PRODUCT_NOT_FOUND: productId
- OUT_OF_STOCK: productId, availableStock
- USER_DISABLED: userId
- INVALID_QUANTITY: quantity

题目 2：
实现 formatPlaceOrderError(error)，返回适合展示给用户的中文文案。

题目 3：
实现 canRetryPlaceOrder(error)，判断是否应该允许用户重试：
- OUT_OF_STOCK、PRODUCT_NOT_FOUND 不允许
- INVALID_QUANTITY 可以让用户修改后重试
- USER_DISABLED 不允许

要求：
- 不要用字符串拼接所有错误后再猜
- 使用 switch + exhaustive check
*/

type PlaceOrderError =
  | { type: "PRODUCT_NOT_FOUND"; productId: string }
  | { type: "OUT_OF_STOCK"; productId: string; availableStock: number }
  | { type: "USER_DISABLED"; userId: string }
  | { type: "INVALID_QUANTITY"; quantity: number };

function assertNever(value: never): never {
  throw new Error(`Unhandled error: ${JSON.stringify(value)}`);
}

function formatPlaceOrderError(error: PlaceOrderError): string {
  switch (error.type) {
    case "PRODUCT_NOT_FOUND":
      return `商品不存在：${error.productId}`;
    case "OUT_OF_STOCK":
      return `商品库存不足，当前库存：${error.availableStock}`;
    case "USER_DISABLED":
      return `用户已被禁用：${error.userId}`;
    case "INVALID_QUANTITY":
      return `下单数量不合法：${error.quantity}`;
    default:
      return assertNever(error);
  }
}

function canRetryPlaceOrder(error: PlaceOrderError): boolean {
  switch (error.type) {
    case "INVALID_QUANTITY":
      return true;
    case "PRODUCT_NOT_FOUND":
    case "OUT_OF_STOCK":
    case "USER_DISABLED":
      return false;
    default:
      return assertNever(error);
  }
}

const orderErrors: PlaceOrderError[] = [
  { type: "PRODUCT_NOT_FOUND", productId: "p404" },
  { type: "OUT_OF_STOCK", productId: "p1", availableStock: 0 },
  { type: "USER_DISABLED", userId: "u1" },
  { type: "INVALID_QUANTITY", quantity: 0 },
];

console.log(
  "[02-domain-errors] formatted:",
  orderErrors.map((error) => formatPlaceOrderError(error)),
);
console.log(
  "[02-domain-errors] retry flags:",
  orderErrors.map((error) => ({ type: error.type, canRetry: canRetryPlaceOrder(error) })),
);
