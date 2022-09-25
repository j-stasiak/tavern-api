import type { Request, Response } from 'express';
import { getAllChatMessages, removeChatMessage } from './chat-service';

export const deleteChatMessage = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req;

  try {
    const user = await removeChatMessage(id);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const user = await getAllChatMessages();

    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
};
