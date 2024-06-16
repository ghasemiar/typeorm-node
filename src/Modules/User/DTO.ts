import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
} from "class-validator";
import { Expose, Transform } from "class-transformer";
import { User } from "./Entity";
import { emailReg, phoneReg } from "../../Helper/Regex";
import { p2e } from "../../Helper/ChangePhone";

export class UserRegisterDTO {
  @Expose()
  @IsString()
  name: string;
  @Expose()
  @IsString()
  username: string;
  @Expose()
  @Matches(emailReg, {
    message:
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit",
  })
  password!: string;
  @Expose()
  @IsString()
  @IsEmail({}, { message: "too long" })
  email: string;
  @Expose()
  @Transform(({ obj }) => (obj.phone = p2e(obj.phone)))
  @Matches(phoneReg)
  phone: string;
}

export class UserLoginDto {
  @Expose()
  @IsString()
  username: string;
  @Expose()
  @IsString()
  password!: string;
}
