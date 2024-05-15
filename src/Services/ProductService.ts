import {Product} from '../Entities/Product';
import { myDataSource} from "../Database/Connection";
import {ProductCreateDTO, ProductUpdateDTO} from "../Validations/ProductValidation";
export const createProductService = async (data: ProductCreateDTO): Promise<{ data:any,code:number }> => {
    const product = myDataSource.getRepository(Product).create(data)
    const results = await myDataSource.getRepository(Product).save(product)
    return {data:results,code:201}
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
    const results = await myDataSource.getRepository(Product).save(product)
    return {data:results,code:200}
};
export const deleteProductService = async (id:number): Promise<{ data:any,code:number }> => {

    const results = await myDataSource.getRepository(Product).delete(id)
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:"delete successfully",code:200}
};