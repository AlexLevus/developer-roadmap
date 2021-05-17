import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { UserRoadmap } from './user-roadmap.entity';

@Entity({
  name: 'user_roadmaps_stages'
})
export class UserRoadmapStage {
  @Expose()
  @PrimaryColumn({ name: 'stage_id', type: 'integer' })
  stageId!: string;

  @Expose()
  @PrimaryColumn({ name: 'user_id', type: 'integer' })
  userId!: string;

  @Expose()
  @PrimaryColumn({ name: 'roadmap_id', type: 'integer' })
  roadmapId!: string;

  @Expose()
  @Column({ name: 'is_completed', default: false })
  isCompleted!: boolean;

  @Expose()
  @Column({ name: 'user_roadmap_id' })
  userRoadmapId!: string;

  @ManyToOne(
    () => UserRoadmap,
    (userRoadmap) => userRoadmap.userRoadmapStages,
    { onDelete: 'CASCADE' }
  )
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
