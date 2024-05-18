import {Product} from '../Entities/Product';
import { myDataSource} from "../Database/Connection";
import {ProductCreateDTO, ProductUpdateDTO} from "../Validations/ProductValidation";
import {User} from "../Entities/User";
import { plainToClass} from "class-transformer";
import {typesense} from "../index";

export const createProductService = async (data: ProductCreateDTO,userId:number): Promise<{ data:any,code:number }> => {
    const user =  await myDataSource.getRepository(User).findOneBy({
        id:userId
    })
    const p  =  plainToClass(Product,{...data,user});
    const product = myDataSource.getRepository(Product).create(p)
    const result = await myDataSource.getRepository(Product).save(product)
    console.log('dd');
    const t = await typesense.collections('testProduct').documents().create(data);
    console.log(t)
    return {data:result,code:201}
};

export const getProductsService = async (): Promise<{ data:any,code:number }> => {
    const result = await myDataSource.getRepository(Product).find()
    return {data:result,code:200}
};
export const getProductService = async (id:number): Promise<{ data:any,code:number }> => {

    const results = await myDataSource.getRepository(Product).findOneBy({
        id:id
    })
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:results,code:200}
};
export const updateProductService = async (id:number,data:ProductUpdateDTO): Promise<{ data:any,code:number }> => {

    const product = await myDataSource.getRepository(Product).findOneBy({
        id: id,
    })
    if (!product) {
        return {data:"not found",code:404};
    }
    myDataSource.getRepository(Product).merge(product, data)
    const result = await myDataSource.getRepository(Product).save(product)
    await typesense.collections('product').documents(id.toString()).update(result);
    return {data:result,code:200}
};
export const deleteProductService = async (id:number): Promise<{ data:any,code:number }> => {
    const find = await myDataSource.getRepository(Product).findOneBy({
        id:id
    })
    if (!find) {
        return {data:"not found",code:404};
    }
    const results = await myDataSource.getRepository(Product).delete(find)
    await typesense.collections('product').documents(id.toString()).delete();
    return {data:"deleted",code:200}
};