import type { Request, Response } from 'express';
import { createTutorial, getTutorialById, getTutorials } from './tutorial-service';

export const postTutorial = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const insertedId = await createTutorial(body);

    res.status(201).send(insertedId);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getTutorial = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req;

    const tutorial = await getTutorialById(id);

    res.status(200).send(tutorial);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const getAllTutorials = async (req: Request, res: Response) => {
  try {
    const tutorial = await getTutorials();

    res.status(200).send(tutorial);
  } catch (err) {
    res.status(500).send(err);
  }
};
