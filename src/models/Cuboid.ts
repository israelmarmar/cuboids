import { Id, RelationMappings } from 'objection';
import { Bag } from './Bag';
import Base from './Base';

export class Cuboid extends Base {
  id!: Id;
  width!: number;
  height!: number;
  depth!: number;
  bagId?: Id;
  bag!: Bag;
  volume!: number;

  static tableName = 'cuboids';

  $afterInsert() {
    this.volume = this.width * this.height * this.depth;
  }

  $afterUpdate() {
    this.volume = this.width * this.height * this.depth;
  }

  static get relationMappings(): RelationMappings {
    return {
      bag: {
        relation: Base.BelongsToOneRelation,
        modelClass: Bag,
        join: {
          from: 'cuboids.bagId',
          to: 'bags.id',
        },
      },
    };
  }
}

export default Cuboid;
