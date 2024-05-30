import { Product } from "./Entity";
import { myDataSource } from "../../Database/Connection";
import {
    ProductCreateDTO,
    ProductUpdateDTO,
} from "./DTO";
import { User } from "../User/Entity";
import { plainToClass } from "class-transformer";

import { Brand } from "../Brand/Entity";
import { Category } from "../Category/Entity";

import { typesense } from "../../Typesense/Config";

export const createProductService = async (
    data: ProductCreateDTO,
    userId: number,
    imagePath?: string
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
    if (!user || !category || !brand) {
        return { data: "something wrong with inputs", code: 404 };
    }

    const product = plainToClass(Product, { ...data });
    product.category = category;
    product.brand = brand;
    product.user = user;
    if (imagePath) {
        product.image = imagePath;
        data.image = imagePath
    }
    const result = await myDataSource.getRepository(Product).save(product);
    await typesense.collections("Product").documents().create(data);
    return { data: result, code: 201 };
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
    data: ProductUpdateDTO,
    imagePath:any
): Promise<{ data: any; code: number }> => {
    const findProduct = await myDataSource.getRepository(Product).findOneBy({
        id: id,
    });
    if (!findProduct) {
        return { data: "not found", code: 404 };
    }
    const category = await myDataSource.getRepository(Category).findOneBy({
        id: data.category,
    });
    const brand = await myDataSource.getRepository(Brand).findOneBy({
        id: data.brand,
    });
    if (!category || !brand) {
        return { data: "something wrong with inputs", code: 404 };
    }

    const product = plainToClass(Product, { ...data });
    product.category = category;
    product.brand = brand;
    if (imagePath) {
        product.image = imagePath;
    }
    const result = await myDataSource.getRepository(Product).save(product);
    await typesense
        .collections("Product")
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
    await typesense.collections("Product").documents(id.toString()).delete();
    return { data: "deleted", code: 200 };
};
export const allUserProductsService = async (userId:number):Promise<{ data: any; code: number }>=>{
    const user = await myDataSource.getRepository(User).findOneBy({
        id: userId,
    });
    const result = await myDataSource.getRepository(Product).findBy({user})
    return {data: result, code: 200 };
}
