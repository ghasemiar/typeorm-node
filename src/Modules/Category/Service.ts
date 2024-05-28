import {Category} from './Entity';
import { myDataSource} from "../../Database/Connection";
import {CategoryCreateDTO, CategoryUpdateDTO} from "./DTO";
export const createCategoryService = async (data: CategoryCreateDTO): Promise<{ data:any,code:number }> => {
    if(data.parentId){
        const {name,parentId} = data
        const getParent = await myDataSource.getRepository(Category).findOneBy({id:parentId})
        if(!getParent){
            return {data:"parent id not found",code:404}
        }
        const cat = new Category()
        cat.parent=getParent
        cat.name=name
        const category = myDataSource.getRepository(Category).create(cat)
        const results = await myDataSource.getRepository(Category).save(category)
        return {data:results,code:201}
    }
    const category = myDataSource.getRepository(Category).create(data)
    const results = await myDataSource.getRepository(Category).save(category)
    return {data:results,code:201}
};
export const getCategoriesService = async (): Promise<{ data:any,code:number }> => {
    const result = await myDataSource.getRepository(Category).find()
    console.log(result)
    return {data:result,code:200}
};
export const getCategoryService = async (id:number): Promise<{ data:any,code:number }> => {

    const results = await myDataSource.getRepository(Category).findOneBy({
        id:id
    })
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:results,code:200}
};
export const updateCategoryService = async (id:number,data:CategoryUpdateDTO): Promise<{ data:any,code:number }> => {

    const cat = await myDataSource.getRepository(Category).findOneBy({
        id: id,
    })
    if (!cat) {
        return {data:"not found",code:404};
    }
    myDataSource.getRepository(Category).merge(cat, data)
    const results = await myDataSource.getRepository(Category).save(cat)
    return {data:results,code:200}
};
export const deleteCategoryService = async (id:number): Promise<{ data:any,code:number }> => {

    const results = await myDataSource.getRepository(Category).delete(id)
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:"delete successfully",code:200}
};