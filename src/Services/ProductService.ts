import {IAttr,Attr} from '..//Attr';
import { myDataSource} from "../Database/Connection";
export const createAttrService = async (data: IAttr): Promise<{ data:string|IAttr,code:number }> => {
    const attr = await myDataSource.getRepository(Attr).create(data)
    const results = await myDataSource.getRepository(Attr).save(attr)
    return {data:results,code:201}
};
export const getAttrsService = async (): Promise<{ data:string|IAttr[],code:number }> => {
    const result = await myDataSource.getRepository(Attr).find()
    return {data:result,code:200}
};
export const getAttrService = async (id:number): Promise<{ data:string|IAttr,code:number }> => {

    const results = await myDataSource.getRepository(Attr).findOneBy({
        id:id
    })
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:results,code:200}
};
export const updateAttrService = async (id:number,data:IAttr): Promise<{ data:string|IAttr,code:number }> => {

    const attr = await myDataSource.getRepository(Attr).findOneBy({
        id: id,
    })
    if (!attr) {
        return {data:"not found",code:404};
    }
    myDataSource.getRepository(Attr).merge(attr, data)
    const results = await myDataSource.getRepository(Attr).save(attr)
    return {data:results,code:200}
};
export const deleteAttrService = async (id:number): Promise<{ data:string|IAttr,code:number }> => {

    const results = await myDataSource.getRepository(Attr).delete(id)
    if (!results) {
        return {data:"not found",code:404};
    }
    return {data:"delete successfully",code:200}
};