import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from 'src/auth/authz/roles';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,) { }

  create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(createUserDto);
  }

  createDefaultAdmin(): Promise<UserDocument> {
    return this.userModel.create({
      email: "admin@adm.com",
      nick: "admin",
      password: "admin",
      roles: [Role.ADMIN]
    });
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(nick: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ nick: nick });
  }

  async findOneById(id: string): Promise<UserDocument | undefined> {
    return this.userModel.findById(id);
  }

  async update(nick: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate({ nick: nick }, updateUserDto);
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException(`Bad id format: ${id}`, 400)
    }

    return await this.userModel.findByIdAndRemove(id);
  }
}
