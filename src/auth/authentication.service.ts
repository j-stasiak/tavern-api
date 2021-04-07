import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { User, UserDocument } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcryptjs';
import { Role } from './authz/roles';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) {}

  async validateUser(username: string, pass: string): Promise<UserDocument> {
    const user = await this.userService.findOne(username);

    if (user && (await compare(pass, user.password))) {
      return user;
    }

    return undefined;
  }

  async login(user: LoginDto) {
    const validUser = await this.validateUser(user.nick, user.password);

    if (!validUser) {
      throw new HttpException('Bad login or password!', HttpStatus.BAD_REQUEST);
    }

    const payload = { user: validUser.nick, sub: validUser.id, roles: validUser.roles };
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
      user: validUser,
    };
  }

  async registerDefaultAdmin(): Promise<User> {
    const user = {
      avatar: 'none',
      email: this.configService.get<string>('DEFAULT_ADMIN_EMAIL'),
      nick: this.configService.get<string>('DEFAULT_ADMIN_LOGIN'),
      password: this.configService.get<string>('DEFAULT_ADMIN_PASSWORD'),
      roles: [Role.ADMIN],
    };

    return await this.register(user);
  }

  async register(registerDto: RegisterDto): Promise<User> {
    if (await this.userService.findOne(registerDto.nick)) {
      throw new HttpException(`User [${registerDto.nick}] already exists!`, 400);
    }

    const createUserDto = Object.assign(new CreateUserDto(), registerDto);

    if (!createUserDto.roles) {
      createUserDto.roles = [Role.USER];
    }

    createUserDto.password = await hash(createUserDto.password, 10);

    return await this.userService.create(createUserDto);
  }
}
