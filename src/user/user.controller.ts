import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserDocument } from './entities/user.entity';

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

  @Put(':nick')
  update(@Param('nick') nick: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userService.update(nick, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.remove(id);
  }
}
