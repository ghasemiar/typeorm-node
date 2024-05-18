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
export class ProductCreateDTO {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsNumber()
  year: number;
  @IsString()
  description?: string;
  @IsNumber()
  category: number;
}
export class ProductUpdateDTO {
  @IsString()
  @IsOptional()
  name?: string;
  @IsNumber()
  @IsOptional()
  price?: number;
  @IsNumber()
  @IsOptional()
  year?: number;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNumber()
  @IsOptional()
  category: number;
}
