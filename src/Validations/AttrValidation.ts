
// import Joi from "joi";
//
// export const userRegisterValidation = Joi.object({
//     name: Joi.string().required(),
// });
// export const userLoginValidation = Joi.object({
//     name: Joi.string().optional(),
// })
import { IsOptional, IsString } from "class-validator";
import {Expose} from "class-transformer";
export class AttrCreateDTO {
  @Expose()
  @IsString()
  name: string;
  @Expose()
  @IsString()
  type: string;
}
export class AttrUpdateDTO {
  @Expose()
  @IsString()
  @IsOptional()
  name: string;
  @Expose()
  @IsString()
  @IsOptional()
  type: string;
}
