import { User, UserDocument } from './../user/entities/user.entity';
import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authenticationService.register(registerDto);
    const { password, ...u } = user['_doc'];

    return u;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authenticationService.login(loginDto);
  }
}
