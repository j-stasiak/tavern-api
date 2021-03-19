import { Injectable } from '@nestjs/common';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';

@Injectable()
export class TutorialService {
  create(createTutorialDto: CreateTutorialDto) {
    return 'This action adds a new tutorial';
  }

  findAll() {
    return `This action returns all tutorial`;
  }

  findOne(id: string) {
    return `This action returns a #${id} tutorial`;
  }

  update(id: string, updateTutorialDto: UpdateTutorialDto) {
    return `This action updates a #${id} tutorial`;
  }

  remove(id: string) {
    return `This action removes a #${id} tutorial`;
  }
}
