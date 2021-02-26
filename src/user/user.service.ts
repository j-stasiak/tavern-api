import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,) { }

  create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(nick: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne((user: UserDocument) => user.nick == nick);
  }

  async findOneById(id: string): Promise<UserDocument | undefined> {
    return this.userModel.findById(id);
  }

  async update(nick: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate((user: UserDocument) => user.nick == nick, updateUserDto);
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id);
  }
}
