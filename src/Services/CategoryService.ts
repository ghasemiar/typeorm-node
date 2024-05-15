import {IProduct,Product} from '..//Product';
import { myDataSource} from "../Database/Connection";
export const createProductService = async (data: IProduct): Promise<{ data:IProduct,code:number }> => {

    const product = await myDataSource.getRepository(Product).create(data)
    const results = await myDataSource.getRepository(Product).save(product)
    return {data:results,code:201}
};
export const getProductsService = async (): Promise<{ data:string|IProduct[],code:number }> => {
    const product = new Product()
    const result = await myDataSource.getRepository(Product).find()
    return {data:result,code:200}
};
export const getProductService = async (id:number): Promise<{ data:string|IProduct,code:number }> => {

    const results = await myDataSource.getRepository(Product).findOneBy({
        id:id
    })
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:results,code:200}
};
export const updateProductService = async (id:number,data:IProduct): Promise<{ data:string|IProduct,code:number }> => {

    const cat = await myDataSource.getRepository(Product).findOneBy({
        id: id,
    })
    if (!cat) {
        return {data:"not found",code:404};
    }
    myDataSource.getRepository(Product).merge(cat, data)
    const results = await myDataSource.getRepository(Product).save(cat)
    return {data:results,code:200}
};
export const deleteProductService = async (id:number): Promise<{ data:string|IProduct,code:number }> => {

    const results = await myDataSource.getRepository(Product).delete(id)
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:"delete successfully",code:200}
};