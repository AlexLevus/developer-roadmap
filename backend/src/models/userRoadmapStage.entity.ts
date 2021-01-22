import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { UserRoadmap } from './userRoadmap.entity';

@Entity({
  name: 'user_roadmaps_stages'
})
export class UserRoadmapStage {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column({ name: 'stage_id' })
  stageId: string;

  @Expose()
  @Column({ name: 'is_completed' })
  isCompleted: boolean;

  @ManyToOne(() => UserRoadmap, (userRoadmap) => userRoadmap.userRoadmapStages)
  @JoinColumn({ name: 'user_roadmap_id' })
  userRoadmap!: UserRoadmap;

  constructor(userRoadmapStage: Partial<UserRoadmapStage>) {
    if (UserRoadmapStage) {
      Object.assign(
        this,
        plainToClass(UserRoadmapStage, userRoadmapStage, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
