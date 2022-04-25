import { Id, RelationMappings } from 'objection';
import Base from './Base';

export class Job extends Base {
  id!: Id;
  title!: string;

  static tableName = 'jobs';

  static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Base.HasManyRelation,
        modelClass: 'User',
        join: {
          from: 'jobs.id',
          to: 'users.jobId',
        },
      },
    };
  }
}

export default Job;
