import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { LocalAuthGuard } from './strategies/local-auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('register')
  async register(): Promise<void> {

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
