// import Joi from "joi";
//
// export const userRegisterValidation = Joi.object({
//     name: Joi.string().required(),
//     parent: Joi.string().optional(),
//     attributes: Joi.string().required(),
//
// });
// export const userLoginValidation = Joi.object({
//     name: Joi.string().optional(),
//     parent: Joi.string().optional(),
//     attributes: Joi.string().optional(),
// })
import {IsString, IsOptional, IsNumber} from "class-validator";
export class CategoryCreateDTO {
    @IsString()
    name: string;
    @IsOptional()
    @IsNumber()
    parentId: number;
}
export class CategoryUpdateDTO {
    @IsString()
    name: string;
    @IsOptional()
    @IsNumber()
    parentId: number;
}
