import { Id, RelationMappings } from 'objection';
import Base from './Base';

export class User extends Base {
  id!: Id;
  name!: string;
  email!: string;
  reports_to!: number;
  jobId!: Id;
  manager?: Id;
  under: User[] | undefined;

  static tableName = 'users';

  static get relationMappings(): RelationMappings {
    return {
      job: {
        relation: Base.HasOneRelation,
        modelClass: 'Job',
        join: {
          from: 'users.jobId',
          to: 'jobs.id',
        },
      },
      my_manager: {
        relation: Base.HasOneRelation,
        modelClass: User,
        join: {
          from: 'users.manager',
          to: 'users.id',
        },
      },
      under: {
        relation: Base.HasManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'users.manager',
        },
      },
    };
  }
}

export default User;
