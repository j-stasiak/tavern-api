export interface CreateTutorialDto {
  title: string;
  description: string;
  steps: TutorialStepDto[];
  isActive?: boolean;
}

export interface TutorialStepDto {
  title?: string;
  description: string;
  stepNumber: number;
  isActive?: boolean;
}
