import { IsString, IsOptional } from "class-validator";
export class BrandCreateDTO {
    @IsString()
    name: string;
}
export class BrandUpdateDTO {
    @IsString()
    @IsOptional()
    name: string;
}
