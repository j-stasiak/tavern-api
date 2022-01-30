import { getRepository, Repository } from 'typeorm';
import { CreateTutorialDto } from './dtos/create-tutorial';
import { Tutorial } from './entities/tutorial';

export const createTutorial = async (createTutorial: CreateTutorialDto) => {
  const tutorialRepository: Repository<Tutorial> = getRepository(Tutorial);
  const result = await tutorialRepository.save({
    ...createTutorial,
    stepsAmount: createTutorial.steps.length
  });

  return result;
};

export const getTutorialById = async (id: string) => {
  const tutorialRepository: Repository<Tutorial> = getRepository(Tutorial);
  const tutorial = await tutorialRepository.findOne(id, { relations: ['steps'] });

  return tutorial;
};

export const getTutorials = async () => {
  const tutorialRepository: Repository<Tutorial> = getRepository(Tutorial);
  const tutorials = await tutorialRepository.find({ relations: ['steps'] });

  return tutorials;
};
