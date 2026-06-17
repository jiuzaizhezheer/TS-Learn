export { };

/*
阶段 1：联合类型和类型收窄

真实场景：
订单支付可能有多种支付方式，不同支付方式需要不同字段。

题目 1：
定义 Payment 类型，支持三种支付方式：
- 微信：kind 为 "wechat"，字段 openId: string
- 支付宝：kind 为 "alipay"，字段 account: string
- 银行卡：kind 为 "bank-card"，字段 cardNo: string，bankName: string

题目 2：
实现 getPaymentSummary(payment)，返回：
- 微信：微信支付：openId 后 4 位
- 支付宝：支付宝支付：account
- 银行卡：银行卡支付：bankName + cardNo 后 4 位

题目 3：
故意新增一种支付方式 "paypal"，观察 TypeScript 是否能提示你没有处理完整。

要求：
- 使用判别联合类型：Discriminated Union
- switch 里加 exhaustive check
- 不要把所有字段都写成可选字段
*/

type WechatPayment = {
  kind: "wechat";
  openId: string;
};

type AlipayPayment = {
  kind: "alipay";
  account: string;
};

type BankCardPayment = {
  kind: "bank-card";
  cardNo: string;
  bankName: string;
};

type PayPalPayment = {
  kind: "paypal";
};

type Payment = WechatPayment | AlipayPayment | BankCardPayment | PayPalPayment;

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
}

function getPaymentSummary(payment: Payment): string {
  // TODO: 使用 switch payment.kind 实现题目 2
  switch (payment.kind) {
    case "wechat":
      return `微信支付：${payment.openId.slice(-4)}`;
    case "alipay":
      return `支付宝支付：${payment.account}`;
    case "bank-card":
      return `银行卡支付：${payment.bankName}${payment.cardNo.slice(-4)}`;
    case "paypal":
      return "paypal";
    default:
      return assertNever(payment);
  }
}

console.log("[02-union-narrowing] wechat:", getPaymentSummary({ kind: "wechat", openId: "wx_open_1234" }));
console.log("[02-union-narrowing] alipay:", getPaymentSummary({ kind: "alipay", account: "user@example.com" }));
console.log(
  "[02-union-narrowing] bank-card:",
  getPaymentSummary({
    kind: "bank-card",
    cardNo: "6222020202028888",
    bankName: "招商银行",
  }),
);
