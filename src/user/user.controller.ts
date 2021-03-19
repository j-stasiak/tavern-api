import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserDocument } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { Roles } from 'src/auth/authz/roles.decorator';
import { Role } from 'src/auth/authz/roles';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':nick')
  findOne(@Param('nick') nick: string) {
    return this.userService.findOne(nick);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Post('/createAdmin')
  async createAdmin(): Promise<UserDocument> {
    return await this.userService.createDefaultAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Put(':nick')
  update(@Param('nick') nick: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userService.update(nick, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.remove(id);
  }
}
