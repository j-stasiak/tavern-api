import { IsArray, IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "src/auth/authz/roles";

export class CreateUserDto {
  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  nick: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsArray()
  @IsOptional()
  roles: string[] = [Role.USER];

  @IsNotEmpty()
  @MinLength(8, { message: " The min length of password is 8." })
  @MaxLength(40, { message: " The max length of password is 40." })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,40}$/,
    { message: "Password must contain one digit, one uppercase character and one lowercase character." }
  )
  password: string;
}
