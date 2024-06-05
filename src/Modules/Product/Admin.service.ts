import {myDataSource} from "../../Database/Connection";
import {Product, ProductStatus} from "./Entity";

export const changeStatusService = async (productId:number,status:ProductStatus): Promise<{ msg: string; code: number }> =>{
    try {
        const product = await myDataSource.getRepository(Product).findOneBy({id:productId})
        if (!product){
            return {msg:"not found",code:404}
        }
        product.status = status
        return {msg:'status changed',code:200}
    }catch (err){
        return {msg:'something went wrong',code:500}
    }
}