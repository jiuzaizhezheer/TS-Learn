export {};

/*
阶段 7：迷你项目 3 - 通知中心

真实场景：
站内通知通常有多种类型：系统通知、订单通知、审批通知。每种通知字段不同。

题目 1：
定义 Notification 判别联合：
- system：title, content
- order：orderId, status
- approval：approvalId, applicantName, approved

题目 2：
实现 getNotificationTitle(notification)，返回通知标题。

题目 3：
实现 markAsRead(list, id)，返回新数组。

题目 4：
实现 groupUnreadCountByType(list)，返回每种通知类型的未读数量。

要求：
- 不要把所有字段都塞进一个大 interface 然后全写可选
- 使用联合类型表达不同通知结构
- markAsRead 不要修改原数组和原对象
*/

type BaseNotification = {
  id: string;
  read: boolean;
  createdAt: Date;
};

type AppNotification =
  | (BaseNotification & {
      type: "system";
      title: string;
      content: string;
    })
  | (BaseNotification & {
      type: "order";
      orderId: string;
      status: "paid" | "shipped" | "refunded";
    })
  | (BaseNotification & {
      type: "approval";
      approvalId: string;
      applicantName: string;
      approved: boolean;
    });

type NotificationType = AppNotification["type"];

function getNotificationTitle(notification: AppNotification): string {
  // TODO: 实现题目 2
  return "";
}

function markAsRead(
  list: AppNotification[],
  id: string,
): AppNotification[] {
  // TODO: 实现题目 3
  return list;
}

function groupUnreadCountByType(
  list: AppNotification[],
): Record<NotificationType, number> {
  // TODO: 实现题目 4
  return {
    system: 0,
    order: 0,
    approval: 0,
  };
}

console.log(groupUnreadCountByType([]));

