import { IsEmail, IsString, Matches } from "class-validator";
import { Expose } from "class-transformer";

export class UserRegisterDTO {
  @Expose()
  @IsString()
  name: string;
  @Expose()
  @IsString()
  username: string;
  @Expose()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit",
  })
  password!: string;
  @Expose()
  @IsString()
  @IsEmail({}, { message: "too long" })
  email: string;
}

export class UserLoginDto {
  @Expose()
  @IsString()
  username: string;
  @Expose()
  @IsString()
  password!: string;
}
