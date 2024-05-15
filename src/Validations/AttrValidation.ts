
// import Joi from "joi";
//
// export const userRegisterValidation = Joi.object({
//     name: Joi.string().required(),
// });
// export const userLoginValidation = Joi.object({
//     name: Joi.string().optional(),
// })
import { IsOptional, IsString } from "class-validator";
export class AttrCreateDTO {
  @IsString()
  name: string;
  @IsString()
  type: string;
}
export class AttrUpdateDTO {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  type: string;
}
