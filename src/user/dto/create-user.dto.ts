import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: " The min length of password is 8." })
  @MaxLength(40, { message: " The max length of password is 40." })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,40}$/,
    { message: " A password at least contains one digit, one uppercase character and one lowercase character." }
  )
  password: string;
}
