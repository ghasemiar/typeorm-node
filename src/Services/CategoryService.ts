import {CategoryEntities,ICategoryEntities} from '../Entities/CategoryEntities';
import { myDataSource} from "../Database/Connection";
export const createCategoryService = async (data: ICategoryEntities): Promise<{ data:string|ICategoryEntities,code:number }> => {
    const cat = await myDataSource.getRepository(CategoryEntities).create(data)
    const results = await myDataSource.getRepository(CategoryEntities).save(cat)
    return {data:results,code:201}
};
export const getCategoriesService = async (): Promise<{ data:string|ICategoryEntities[],code:number }> => {
    const result = await myDataSource.getRepository(CategoryEntities).find()
    return {data:result,code:200}
};
export const getCategoryService = async (id:number): Promise<{ data:string|ICategoryEntities,code:number }> => {

    const results = await myDataSource.getRepository(CategoryEntities).findOneBy({
        id:id
    })
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:results,code:200}
};
export const updateCategoryService = async (id:number,data:ICategoryEntities): Promise<{ data:string|ICategoryEntities,code:number }> => {

    const cat = await myDataSource.getRepository(CategoryEntities).findOneBy({
        id: id,
    })
    if (!cat) {
        return {data:"not found",code:404};
    }
    myDataSource.getRepository(CategoryEntities).merge(cat, data)
    const results = await myDataSource.getRepository(CategoryEntities).save(cat)
    return {data:results,code:200}
};
export const deleteCategoryService = async (id:number): Promise<{ data:string|ICategoryEntities,code:number }> => {

    const results = await myDataSource.getRepository(CategoryEntities).delete(id)
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:"delete successfully",code:200}
};