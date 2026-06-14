export {};

/*
阶段 5：常用工具类型

真实场景：
创建、更新、列表展示、详情页常常使用同一个实体的不同字段组合。

题目 1：
基于 Article 定义：
- CreateArticleInput：不包含 id、createdAt、updatedAt
- UpdateArticleInput：id 必填，其他可更新字段可选
- ArticleListItem：只包含 id、title、authorName、published
- ArticleDraft：published 固定为 false

题目 2：
实现 publishArticle(article)，返回 published 为 true 的 Article。

题目 3：
实现 toListItem(article)，返回 ArticleListItem。

要求：
- 使用 Omit、Pick、Partial、交叉类型
- 不要重复手写全部字段
*/

type Article = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type CreateArticleInput = Omit<Article, "id" | "createdAt" | "updatedAt">;

type UpdateArticleInput = {
  id: Article["id"];
} & Partial<Pick<Article, "title" | "content" | "tags" | "published">>;

type ArticleListItem = Pick<Article, "id" | "title" | "authorName" | "published">;

type ArticleDraft = Omit<Article, "published"> & {
  published: false;
};

function publishArticle(article: Article): Article {
  // TODO: 实现题目 2
  return article;
}

function toListItem(article: Article): ArticleListItem {
  // TODO: 实现题目 3
  throw new Error("TODO");
}

const draftInput: CreateArticleInput = {
  title: "TS 工具类型练习",
  content: "TODO",
  authorId: "u1",
  authorName: "作者",
  tags: ["ts"],
  published: false,
};

console.log(draftInput);

