import { Repository, getRepository } from 'typeorm';
import { User, UserRank } from '../user/entities';

import { CompletedTutorial } from './entities/completed-tutorial';
import { CreateTutorialDto } from './dtos/create-tutorial';
import { Tutorial } from './entities/tutorial';
import { TutorialStep } from './entities/tutorial-step';
import { UpdateTutorial } from './dtos/update-tutorial';

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

export const updateTutorial = async (id: string, updateTutorial: UpdateTutorial) => {
  const tutorialRepository: Repository<Tutorial> = getRepository(Tutorial);
  const tutorialStepsRepository: Repository<TutorialStep> = getRepository(TutorialStep);
  const { steps, ...tutorialToUpdate } = updateTutorial;

  const tutorial = await tutorialRepository.update(id, tutorialToUpdate);

  if (steps && steps.length > 0) {
    await Promise.all(
      steps.map((step) => {
        const { id, ...stepToUpdate } = step;
        console.log(stepToUpdate);
        return tutorialStepsRepository.update(id!, stepToUpdate);
      })
    );
  }

  return tutorial;
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

  const completedTutorial =
    (await completedTutorialsRepository.findOne({ tutorial: { id: tutorialId }, user: user })) ??
    completedTutorialsRepository.create({
      finishedSteps: 0,
      isFinished: false,
      tutorial: tutorial,
      user: user
    });

  const tutorialStep = step ?? tutorial.stepsAmount;

  if (completedTutorial.finishedSteps < tutorialStep) {
    if (tutorialStep > tutorial.stepsAmount) {
      throw new Error(`Step ${step} not found in this tutorial.`);
    }
    const expGranted = tutorial.steps
      .map((step) => (step.stepNumber > completedTutorial.finishedSteps ? step.expGrant : 0))
      .reduce((a, b) => a + b, 0);

    user.info = addExp(user, expGranted);
    userRepository.save(user);

    completedTutorial.finishedSteps = tutorialStep;
    completedTutorial.isFinished = tutorialStep === tutorial.stepsAmount;
    completedTutorialsRepository.save(completedTutorial);
  }
};

const addExp = (user: User, amount: number) => {
  const { info } = user;
  const expSum = info.experience + amount;
  const levelsToAdd = Math.floor(expSum / info.experienceToNextLevel);

  info.experience = expSum % info.experienceToNextLevel;
  if (expSum >= info.experienceToNextLevel) {
    info.level += levelsToAdd;
  }

  info.rank = adjustRank(user);

  return info;
};

const adjustRank = (user: User) => {
  return rankLevelRequirements[user.info.level > 5 ? 5 : user.info.level];
};
