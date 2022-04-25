import { Knex } from 'knex';
import { User } from '../../src/models';

const now = new Date();

const users = [
  {
    id: 1,
    name: 'Adam Smith',
    email: 'asmith@llc.com',
    jobId: 1,
    reports_to: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: 'Fiodor Dostoivisk',
    email: 'fdost@llc.com',
    jobId: 1,
    reports_to: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    name: 'Sebastian Bach',
    email: 'sbach@llc.com',
    jobId: 2,
    reports_to: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 4,
    name: 'Winston Churchill',
    email: 'wchurch@llc.com',
    jobId: 3,
    createdAt: now,
    updatedAt: now,
  },
];

export const seed = async (knex: Knex): Promise<void> => {
  await knex(User.tableName).del();
  await knex(User.tableName).insert(users);
};
