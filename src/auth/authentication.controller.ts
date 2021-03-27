import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UserDto } from 'src/user/dto/user.dto';

@ApiTags('authentication')
@Controller('authentication')
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    const user = await this.authenticationService.register(registerDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    return user;
  }

  @Post('registerDefaultAdmin')
  async registerDefaultAdmin(): Promise<UserDto> {
    const user = await this.authenticationService.registerDefaultAdmin();

    return user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authenticationService.login(loginDto);
  }
}
