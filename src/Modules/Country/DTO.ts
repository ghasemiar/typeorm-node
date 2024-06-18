import { IsString, IsOptional } from "class-validator";
export class CountryCreateDTO {
  @IsString()
  name: string;
}
export class CountryUpdateDTO {
  @IsString()
  @IsOptional()
  name: string;
}
