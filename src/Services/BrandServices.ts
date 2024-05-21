import {Brand} from '../Entities/Brand';
import { myDataSource} from "../Database/Connection";
import {BrandCreateDTO, BrandUpdateDTO} from "../Validations/BrandValidation";
export const createBrandService = async (data: BrandCreateDTO): Promise<{ data:any,code:number }> => {
    const brand = myDataSource.getRepository(Brand).create(data)
    const results = await myDataSource.getRepository(Brand).save(brand)
    return {data:results,code:201}
};
export const getBrandsService = async (): Promise<{ data:any,code:number }> => {
    const result = await myDataSource.getRepository(Brand).find()
    return {data:result,code:200}
};
export const getBrandService = async (id:number): Promise<{ data:any,code:number }> => {
    const results = await myDataSource.getRepository(Brand).findOneBy({
        id:id
    })
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:results,code:200}
};
export const updateBrandService = async (id:number,data:BrandUpdateDTO): Promise<{ data:any,code:number }> => {
    const cat = await myDataSource.getRepository(Brand).findOneBy({
        id: id,
    })
    if (!cat) {
        return {data:"not found",code:404};
    }
    myDataSource.getRepository(Brand).merge(cat, data)
    const results = await myDataSource.getRepository(Brand).save(cat)
    return {data:results,code:200}
};
export const deleteBrandService = async (id:number): Promise<{ data:any,code:number }> => {

    const results = await myDataSource.getRepository(Brand).delete(id)
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:"delete successfully",code:200}
};