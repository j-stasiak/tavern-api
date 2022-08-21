import { CreateTutorialDto, TutorialStepDto } from './create-tutorial';

export type UpdateTutorial = Omit<Partial<CreateTutorialDto>, 'steps'> & {
  steps: Partial<TutorialStepDto & { id: string }>[];
};
