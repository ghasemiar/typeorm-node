// import Joi from "joi";
//
// export const userRegisterValidation = Joi.object({
//     name: Joi.string().required(),
//     category: Joi.string().required(),
// });
// export const userLoginValidation = Joi.object({
//     name: Joi.string().optional(),
//     category: Joi.string().optional(),
// })
import { IsString, IsNumber, IsOptional } from "class-validator";
import {Transform} from "class-transformer";
export class ProductCreateDTO {
    @IsString()
    name: string;
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    price: number;
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    year: number;
    @IsString()
    description?: string;
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    category: number;
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    brand: number;
    @IsString()
    @IsOptional()
    image:string
    @IsString()
    content:string
}
export class ProductUpdateDTO {
    @IsString()
    @IsOptional()
    name?: string;
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    price?: number;
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    year?: number;
    @IsOptional()
    @IsString()
    description?: string;
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    category: number;
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    brand: number;
    @IsString()
    @IsOptional()
    image:string
    @IsString()
    @IsOptional()
    content:string
}
