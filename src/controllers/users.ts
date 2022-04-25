import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Id } from 'objection';
import { User } from '../models';

export const list = async (req: Request, res: Response): Promise<Response> => {
  const users = await User.query().withGraphFetched('under');

  return res.status(200).json(users);
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  const id: Id = req.params.id;
  const user = await User.query().findById(id).withGraphFetched('under');

  if (!user) {
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }

  return res.status(200).json(user);
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { jobId, name, email, reports_to, manager } = req.body;

  if (jobId && name && email && reports_to) {
    const user = await User.query().insert({
      jobId,
      name,
      email,
      reports_to,
      manager,
    });

    return res.status(HttpStatus.CREATED).json(user);
  } else {
    return res.sendStatus(HttpStatus.FORBIDDEN);
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, jobId, name, email, reports_to, manager } = req.body;

  await User.query()
    .update({ jobId, name, email, reports_to, manager })
    .where({ id });
  return res.sendStatus(HttpStatus.OK);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;
  const user = await User.query().findById(id).withGraphFetched('under');

  if (user && (!user.under || user.under.length === 0)) {
    await User.query().deleteById(id);
    return res.sendStatus(HttpStatus.OK);
  } else {
    return res.sendStatus(HttpStatus.UNAUTHORIZED);
  }
};
