import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Id } from 'objection';
import { Bag, Cuboid } from '../models';

export const all = async (req: Request, res: Response): Promise<Response> => {
  const cuboids = await Cuboid.query().withGraphFetched('bag');

  return res.status(200).json(cuboids);
};

export const list = async (req: Request, res: Response): Promise<Response> => {
  const ids = JSON.parse(
    req.query.ids ? (req.query.ids as string) : ''
  ) as Id[];
  const cuboids = await Cuboid.query().findByIds(ids).withGraphFetched('bag');

  return res.status(200).json(cuboids);
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id as Id;
  const cuboid = await Cuboid.query().findById(id).withGraphFetched('bag');

  return res.status(200).json(cuboid);
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { width, height, depth, bagId } = req.body;

  const bag = await Bag.query().findById(bagId);

  const cuboid = await Cuboid.query().insert({
    width,
    height,
    depth,
    bagId,
  });

  if (
    bag &&
    bag.availableVolume &&
    width * height * depth >= bag.availableVolume
  ) {
    return res.status(HttpStatus.CREATED).json(cuboid);
  } else {
    return res
      .sendStatus(HttpStatus.UNAUTHORIZED)
      .json({ body: { message: 'Insufficient capacity in bag' } });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, width, height, depth, bagId, volume } = req.body;

  await Cuboid.query()
    .update({ width, height, depth, bagId, volume })
    .where({ id });
  return res.sendStatus(HttpStatus.OK);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;
  const cuboid = await Cuboid.query().findById(id).withGraphFetched('bag');

  if (cuboid) {
    await Cuboid.query().deleteById(id);
    return res.sendStatus(HttpStatus.OK);
  } else {
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }
};
