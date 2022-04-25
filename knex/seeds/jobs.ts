import { Knex } from 'knex';
import { Job } from '../../src/models';

const now = new Date();

const jobs = [
  {
    id: 1,
    title: 'a',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    title: 'b',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    title: 'c',
    createdAt: now,
    updatedAt: now,
  },
];

export const seed = async (knex: Knex): Promise<void> => {
  await knex(Job.tableName).del();
  await knex(Job.tableName).insert(jobs);
};
