import type { Request, Response } from 'express';
import { getChatHistoryForUser } from '../chat/chat-service';
import { getUserById, getUsers, removeUser, updateUser } from './user-service';

export const patchUser = async (req: Request, res: Response) => {
  const {
    params: { id },
    body
  } = req;

  try {
    const user = await updateUser(id, body);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req;

  try {
    const user = await removeUser(id);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req;

    const user = await getUserById(id);

    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const getUserChatHistory = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req;

    const chatMessages = await getChatHistoryForUser(id);

    res.status(200).send(chatMessages);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};
