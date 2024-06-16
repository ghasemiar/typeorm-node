import { IsString, IsOptional, IsNumber } from "class-validator";
export class JobCreateDTO {
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  parent: number;
}
export class JobUpdateDTO {
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  parent: number;
}
