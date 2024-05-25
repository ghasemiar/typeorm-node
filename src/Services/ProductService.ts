import { Product } from "../Entities/Product";
import { myDataSource } from "../Database/Connection";
import {
  ProductCreateDTO,
  ProductUpdateDTO,
} from "../Validations/ProductValidation";
import { User } from "../Entities/User";
import { plainToClass } from "class-transformer";

import { Brand } from "../Entities/Brand";
import { Category } from "../Entities/Category";
import { typesense } from "../Typesense/Config";

export const createProductService = async (
  data: ProductCreateDTO,
  userId: number
): Promise<{ data: any; code: number }> => {
  const user = await myDataSource.getRepository(User).findOneBy({
    id: userId,
  });
  const category = await myDataSource.getRepository(Category).findOneBy({
    id: data.category,
  });
  const brand = await myDataSource.getRepository(Brand).findOneBy({
    id: data.brand,
  });
  if (!user && !category && !brand) {
    return { data: "something wrong with inputs", code: 404 };
  }

  const product = plainToClass(Product, { ...data });
  product.category = category;
  product.brand = brand;
  product.user = user;
  console.log(product);
  try {
    const result = await myDataSource.getRepository(Product).save(product);
    return { data: result, code: 201 };
  } catch (err) {
    console.log(err);
  }
  //   const saveToTypesense = await typesense
  //     .collections("Product")
  //     .documents()
  //     .create(data);
  //   console.log(saveToTypesense);
};

export const getProductsService = async (): Promise<{
  data: any;
  code: number;
}> => {
  const result = await myDataSource.getRepository(Product).find();
  return { data: result, code: 200 };
};
export const getProductService = async (
  id: number
): Promise<{ data: any; code: number }> => {
  const results = await myDataSource.getRepository(Product).findOneBy({
    id: id,
  });
  if (!results) {
    return { data: "not found", code: 404 };
  }
  return { data: results, code: 200 };
};
export const updateProductService = async (
  id: number,
  data: ProductUpdateDTO
): Promise<{ data: any; code: number }> => {
  const product = await myDataSource.getRepository(Product).findOneBy({
    id: id,
  });
  if (!product) {
    return { data: "not found", code: 404 };
  }
  myDataSource.getRepository(Product).merge(product, data);
  const result = await myDataSource.getRepository(Product).save(product);
  await typesense
    .collections("product")
    .documents(id.toString())
    .update(result);
  return { data: result, code: 200 };
};
export const deleteProductService = async (
  id: number
): Promise<{ data: any; code: number }> => {
  const find = await myDataSource.getRepository(Product).findOneBy({
    id: id,
  });
  if (!find) {
    return { data: "not found", code: 404 };
  }
  await myDataSource.getRepository(Product).delete(find);
  await typesense.collections("product").documents(id.toString()).delete();
  return { data: "deleted", code: 200 };
};
