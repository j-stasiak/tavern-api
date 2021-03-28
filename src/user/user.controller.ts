import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserDocument } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { Roles } from 'src/auth/authz/roles.decorator';
import { Role } from 'src/auth/authz/roles';
import { RolesGuard } from 'src/auth/authz/roles.guard';

@ApiTags('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':nick')
  findOne(@Param('nick') nick: string) {
    return this.userService.findOne(nick);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Roles(Role.ADMIN)
  @Put(':nick')
  update(@Param('nick') nick: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userService.update(nick, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.remove(id);
  }
}
