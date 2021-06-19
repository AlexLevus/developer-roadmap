import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { Roadmap } from './roadmap.entity';
import { UserProgressInfo } from '../generator/graphql.models';

@Entity({
  name: 'stages'
})
export class Stage {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column({ type: 'ltree' })
  path: string;

  @Expose()
  @Column({ name: 'roadmap_id' })
  roadmapId: string;

  @Expose()
  userProgressInfo?: UserProgressInfo;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.stages, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'roadmap_id' })
  roadmap?: Roadmap;

  constructor(stage: Partial<Stage>) {
    if (stage) {
      Object.assign(
        this,
        plainToClass(Stage, stage, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
