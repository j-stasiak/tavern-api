import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserDocument } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService,
    private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<UserDocument> {
    const createUserDto: CreateUserDto = registerDto;
    return this.userService.create(createUserDto);
  }
}
