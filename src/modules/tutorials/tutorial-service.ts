import { Repository, getRepository } from 'typeorm';
import { User, UserRank } from '../user/entities';

import { CompletedTutorial } from './entities/completed-tutorial';
import { CreateTutorialDto } from './dtos/create-tutorial';
import { Tutorial } from './entities/tutorial';

const rankLevelRequirements: { [k: number]: UserRank } = {
  1: UserRank.NOVICE,
  2: UserRank.AMATEUR,
  3: UserRank.ADEPT,
  4: UserRank.MASTER,
  5: UserRank.GRANDMASTER
};

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

export const completeTutorial = async (userId: string, tutorialId: string, step?: number) => {
  const tutorialRepository: Repository<Tutorial> = getRepository(Tutorial);
  const completedTutorialsRepository: Repository<CompletedTutorial> = getRepository(CompletedTutorial);
  const userRepository: Repository<User> = getRepository(User);

  const tutorial = await tutorialRepository.findOneOrFail(tutorialId, { relations: ['steps'] });
  const user = await userRepository.findOneOrFail(userId, { relations: ['info'] });
  const completedTutorial = await completedTutorialsRepository.findOne({ tutorial: { id: tutorialId }, user: user });

  if (completedTutorial) {
    if (!completedTutorial.isFinished && step && completedTutorial.finishedSteps < step) {
      if (step > tutorial.stepsAmount) {
        throw new Error(`Step ${step} not found in this tutorial.`);
      }
      const expGranted = tutorial.steps.find((ts) => ts.stepNumber === step)!.expGrant;
      user.info = addExp(user, expGranted);
      userRepository.save(user);
      completedTutorial.finishedSteps = step;
      completedTutorialsRepository.save(completedTutorial);
    }

    if (!step) {
      completedTutorial.finishedSteps = tutorial.stepsAmount;
      completedTutorial.isFinished = true;
      completedTutorialsRepository.save(completedTutorial);
    }
  } else {
    const isFinished = !!step || tutorial.stepsAmount === step;
    const completedTutorialToSave = completedTutorialsRepository.create({
      finishedSteps: step,
      isFinished,
      tutorial: tutorial,
      user: user
    });

    completedTutorialsRepository.save(completedTutorialToSave);
  }
};

const addExp = (user: User, amount: number) => {
  const { info } = user;
  const expSum = info.experience + amount;

  info.experience = expSum % info.experienceToNextLevel;
  if (expSum >= info.experienceToNextLevel) {
    info.level += 1;
  }

  info.rank = adjustRank(user);

  return info;
};

const adjustRank = (user: User) => {
  return rankLevelRequirements[user.info.level > 5 ? 5 : user.info.level];
};
