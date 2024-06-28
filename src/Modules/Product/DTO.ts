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
import { IsString, IsNumber, IsOptional, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";
export class ProductCreateDTO {
  @IsString()
  name: string;
  @Transform(({ obj }) => (obj.price = Number(obj.price)))
  @IsNumber()
  price: number;
  @Transform(({ obj }) => (obj.year = Number(obj.year)))
  @IsNumber()
  year: number;
  @IsString()
  description: string;
  @Transform(({ obj }) => (obj.isPublic = obj.isPublic === "true"))
  @IsBoolean()
  isPublic: boolean;
  @Transform(({ obj }) => (obj.category = Number(obj.category)))
  @IsNumber()
  category: number;
  @Transform(({ obj }) => (obj.brand = Number(obj.brand)))
  @IsNumber()
  brand: number;
  @IsString()
  @IsOptional()
  image: string;
}
export class ProductUpdateDTO {
  @IsString()
  name: string;
  @Transform(({ obj }) => (obj.price = Number(obj.price)))
  @IsNumber()
  price: number;
  @Transform(({ obj }) => (obj.year = Number(obj.year)))
  @IsNumber()
  year: number;
  @IsString()
  description?: string;
  @Transform(({ obj }) => (obj.category = Number(obj.category)))
  @IsNumber()
  category: number;
  @Transform(({ obj }) => (obj.brand = Number(obj.brand)))
  @IsNumber()
  brand: number;
  @IsString()
  @IsOptional()
  image: string;
}
