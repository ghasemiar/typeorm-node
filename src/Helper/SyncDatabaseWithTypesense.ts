import { myDataSource } from "../Database/Connection";
import { Product } from "../Modules/Product/Entity";
import { Category } from "../Modules/Category/Entity";
import { typesense } from "../Typesense/Config";

export default async function syncDatabaseWithTypesense() {
  try {
    const products = await myDataSource.getRepository(Product).find({
      relations: ["category", "brand", "user"],
    });
    products.map(async (item) => {
      console.log(item);
      const path: string[] = [];
      const categoryParents = await myDataSource
        .getTreeRepository(Category)
        .findAncestors(item.category);
      categoryParents.map((item) => {
        path.push(item.name);
      });
      const typesenseDocument: any = {
        id: item.id.toString(),
        name: item.name,
        image: item.image,
        description: item.description,
        year: item.year,
        price: item.price,
        status: item.status,
        isPublic: item.isPublic,
        category: path,
        brand: item.brand.name,
        user: item.user.name,
      };
      path.map((item, index) => {
        typesenseDocument[`categories.lvl${index}`] = [
          path.slice(0, index + 1).join(" > "),
        ];
      });
      await typesense
        .collections("Product")
        .documents()
        .create(typesenseDocument);
    });
  } catch (err) {
    console.log(err);
  }
}
