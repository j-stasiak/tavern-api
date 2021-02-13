import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }


}
