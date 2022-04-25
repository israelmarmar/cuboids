import { Job } from '../../src/models';
import { Knex } from 'knex';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(Job.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps(false, true);
    table.string('title');
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Job.tableName);
