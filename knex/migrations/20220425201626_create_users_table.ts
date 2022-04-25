import { Job, User } from '../../src/models';
import { Knex } from 'knex';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(User.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps(false, true);
    table.string('name');
    table.string('email');
    table.integer('reports_to');
    table.integer('jobId');
    table.integer('manager');
    table.foreign('jobId').references('id').inTable(Job.tableName);
    table.foreign('manager').references('id').inTable(User.tableName);
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(User.tableName);
