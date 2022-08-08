import type { Request, Response } from 'express';
import { getUserById, getUsers, removeUser, updateUser } from './user-service';

export const patchUser = async (req: Request, res: Response) => {
  const {
    params: { id },
    body
  } = req;

  try {
    const tutorial = await updateUser(id, body);

    res.status(200).send(tutorial);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req;

  try {
    const tutorial = await removeUser(id);

    res.status(200).send(tutorial);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req;

    const tutorial = await getUserById(id);

    res.status(200).send(tutorial);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const tutorial = await getUsers();

    res.status(200).send(tutorial);
  } catch (err) {
    res.status(500).send(err);
  }
};
