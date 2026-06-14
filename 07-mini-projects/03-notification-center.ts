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
  switch (notification.type) {
    case "system":
      return notification.title;
    case "order":
      return `订单 ${notification.orderId} 状态更新：${notification.status}`;
    case "approval":
      return `${notification.applicantName} 的审批${notification.approved ? "已通过" : "待处理"}`;
  }
}

function markAsRead(
  list: AppNotification[],
  id: string,
): AppNotification[] {
  return list.map((notification) =>
    notification.id === id
      ? {
          ...notification,
          read: true,
        }
      : notification,
  );
}

function groupUnreadCountByType(
  list: AppNotification[],
): Record<NotificationType, number> {
  const counts: Record<NotificationType, number> = {
    system: 0,
    order: 0,
    approval: 0,
  };

  for (const notification of list) {
    if (!notification.read) {
      counts[notification.type] += 1;
    }
  }

  return counts;
}

const notifications: AppNotification[] = [
  {
    id: "n1",
    type: "system",
    title: "系统维护",
    content: "今晚 23:00 维护",
    read: false,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "n2",
    type: "order",
    orderId: "o1",
    status: "paid",
    read: false,
    createdAt: new Date("2026-01-02"),
  },
  {
    id: "n3",
    type: "approval",
    approvalId: "ap1",
    applicantName: "张三",
    approved: true,
    read: true,
    createdAt: new Date("2026-01-03"),
  },
];

const readNotifications = markAsRead(notifications, "n1");

console.log("[03-notification-center] titles:", notifications.map((item) => getNotificationTitle(item)));
console.log("[03-notification-center] unread counts:", groupUnreadCountByType(notifications));
console.log("[03-notification-center] after read:", groupUnreadCountByType(readNotifications));
console.log("[03-notification-center] immutable check:", notifications[0]?.read, readNotifications[0]?.read);
