import { UserDocument } from './../user/entities/user.entity';
import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDocument> {
    return await this.authenticationService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
