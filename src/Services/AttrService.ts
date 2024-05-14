import {IAttrEntities,AttrEntities} from '../Entities/AttrEntities';
import { myDataSource} from "../Database/Connection";
export const createAttrService = async (data: IAttrEntities): Promise<{ data:string|IAttrEntities,code:number }> => {
    const attr = await myDataSource.getRepository(AttrEntities).create(data)
    const results = await myDataSource.getRepository(AttrEntities).save(attr)
    return {data:results,code:201}
};
export const getAttrsService = async (): Promise<{ data:string|IAttrEntities[],code:number }> => {
    const result = await myDataSource.getRepository(AttrEntities).find()
    return {data:result,code:200}
};
export const getAttrService = async (id:number): Promise<{ data:string|IAttrEntities,code:number }> => {

    const results = await myDataSource.getRepository(AttrEntities).findOneBy({
        id:id
    })
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:results,code:200}
};
export const updateAttrService = async (id:number,data:IAttrEntities): Promise<{ data:string|IAttrEntities,code:number }> => {

    const attr = await myDataSource.getRepository(AttrEntities).findOneBy({
        id: id,
    })
    if (!attr) {
        return {data:"not found",code:404};
    }
    myDataSource.getRepository(AttrEntities).merge(attr, data)
    const results = await myDataSource.getRepository(AttrEntities).save(attr)
    return {data:results,code:200}
};
export const deleteAttrService = async (id:number): Promise<{ data:string|IAttrEntities,code:number }> => {

    const results = await myDataSource.getRepository(AttrEntities).delete(id)
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:"delete successfully",code:200}
};