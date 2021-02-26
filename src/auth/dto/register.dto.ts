import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, { message: " The min length of password is 8." })
  @MaxLength(40, { message: " The max length of password is 40." })
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,40}$/,
  //   { message: "Password must contain one digit, one uppercase character and one lowercase character." }
  // )
  password: string;
}
