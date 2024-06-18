import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
} from "class-validator";
import { GenderEnum } from "./Entity";
import { Transform } from "class-transformer";
export class ProfileCreateDTO {
  @IsEnum(GenderEnum)
  sex: GenderEnum;
  @Transform(({ obj }) => (obj.birthday = Number(obj.price)))
  @IsDate()
  birthday: Date;
  @IsString()
  @IsOptional()
  image: string;
  @Transform(({ obj }) => (obj.province = Number(obj.province)))
  @IsNumber()
  province: number;
  @Transform(({ obj }) => (obj.city = Number(obj.city)))
  @IsNumber()
  city: number;
  @Transform(({ obj }) => (obj.job = Number(obj.job)))
  @IsNumber()
  job: number;
  @Transform(({ obj }) => (obj.lat = Number(obj.lat)))
  @IsNumber()
  lat: number;
  @Transform(({ obj }) => (obj.lng = Number(obj.lng)))
  @IsNumber()
  lng: number;
}
export class ProfileUpdateDTO {
  @IsEnum(GenderEnum)
  sex: GenderEnum;
  @IsDate()
  birthday: Date;
  @IsString()
  @IsOptional()
  image: string;
  @Transform(({ obj }) => (obj.province = Number(obj.province)))
  @IsNumber()
  province: number;
  @Transform(({ obj }) => (obj.city = Number(obj.city)))
  @IsNumber()
  city: number;
  @Transform(({ obj }) => (obj.job = Number(obj.job)))
  @IsNumber()
  job: number;
  @Transform(({ obj }) => (obj.lat = Number(obj.lat)))
  @IsNumber()
  lat: number;
  @Transform(({ obj }) => (obj.lng = Number(obj.lng)))
  @IsNumber()
  lng: number;
}
