export { };

/*
阶段 5：泛型仓储 Repository

真实场景：
很多业务都有类似的 CRUD 逻辑：用户、文章、商品、订单都需要按 id 查询和保存。

题目 1：
定义 Entity 基础类型，要求有 id: string。

题目 2：
实现 createMemoryRepository<T extends Entity>()，返回：
- findById(id): T | undefined
- findAll(): T[]
- save(entity): T
- remove(id): boolean

题目 3：
用 User 和 Product 两种类型分别创建 repository。

要求：
- T 必须约束为有 id 的对象
- 内部可以使用 Map
- findAll 返回数组时不要暴露内部可变结构
*/

type Entity = {
  id: string;
};

type Repository<T extends Entity> = {
  findById(id: string): T | undefined;
  findAll(): T[];
  save(entity: T): T;
  remove(id: string): boolean;
};

function createMemoryRepository<T extends Entity>(): Repository<T> {
  // TODO: 实现题目 2
  const map = new Map<string, T>();
  return {
    findById: (id: string) => map.get(id),
    findAll: () => Array.from(map.values()),
    save: (entity) => {
      map.set(entity.id, entity);
      return entity;
    },
    remove: (id: string) => {
      return map.delete(id);
    }
  }
}
type User = Entity & {
  name: string;
};

type Product = Entity & {
  title: string;
  price: number;
};

const userRepo = createMemoryRepository<User>();
const productRepo = createMemoryRepository<Product>();

userRepo.save({ id: "u1", name: "小明" });
productRepo.save({ id: "p1", title: "鼠标", price: 99 });

console.log("[01-repository] user:", userRepo.findById("u1"));
console.log("[01-repository] all products:", productRepo.findAll());
console.log("[01-repository] remove missing:", productRepo.remove("missing"));
console.log("[01-repository] remove existing:", productRepo.remove("p1"));
console.log("[01-repository] products after remove:", productRepo.findAll());
