import { Id, RelationMappings } from 'objection';
import { Cuboid } from './Cuboid';
import Base from './Base';

export class Bag extends Base {
  id!: Id;
  volume!: number;
  title!: string;
  payloadVolume!: number;
  availableVolume!: number;
  cuboids?: Cuboid[] | undefined;

  static tableName = 'bags';

  $afterInsert() {
    this.payloadVolume =
      !this.cuboids || this.cuboids.length === 0
        ? 0
        : (this.cuboids.reduce(
            (prev, curr) => prev + curr.volume,
            0
          ) as number);
    this.availableVolume = this.volume - this.payloadVolume;
  }

  $afterUpdate() {
    this.payloadVolume =
      !this.cuboids || this.cuboids.length === 0
        ? 0
        : (this.cuboids.reduce(
            (prev, curr) => prev + curr.volume,
            0
          ) as number);
    this.availableVolume = this.volume - this.payloadVolume;
  }

  static get relationMappings(): RelationMappings {
    return {
      cuboids: {
        relation: Base.HasManyRelation,
        modelClass: Cuboid,
        join: {
          from: 'bags.id',
          to: 'cuboids.bagId',
        },
      },
    };
  }
}

export default Bag;
