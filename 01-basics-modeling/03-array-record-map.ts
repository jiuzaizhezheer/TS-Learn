export {};

/*
阶段 1：数组、Record、Map 思维

真实场景：
前端拿到商品列表后，需要按照分类聚合、计算库存、找出低库存商品。

题目 1：
定义 Product 类型：
- id: string
- name: string
- category: "book" | "food" | "digital"
- price: number
- stock: number

题目 2：
实现 groupProductsByCategory(products)，返回 Record<Product["category"], Product[]>。

题目 3：
实现 getLowStockProducts(products, threshold)，返回库存小于等于 threshold 的商品。

题目 4：
实现 getInventoryValue(products)，返回所有商品库存总价值：price * stock。

要求：
- 返回值类型明确写出来
- 不要使用 any
- 思考空数组时返回什么
*/

type ProductCategory = "book" | "food" | "digital";

type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
};

function groupProductsByCategory(
  products: Product[],
): Record<ProductCategory, Product[]> {
  // TODO: 实现题目 2
  return {
    book: [],
    food: [],
    digital: [],
  };
}

function getLowStockProducts(products: Product[], threshold: number): Product[] {
  // TODO: 实现题目 3
  return [];
}

function getInventoryValue(products: Product[]): number {
  // TODO: 实现题目 4
  return 0;
}

const products: Product[] = [
  { id: "p1", name: "TypeScript 入门", category: "book", price: 68, stock: 10 },
  { id: "p2", name: "键盘", category: "digital", price: 399, stock: 2 },
];

console.log(groupProductsByCategory(products));
console.log(getLowStockProducts(products, 3));
console.log(getInventoryValue(products));

