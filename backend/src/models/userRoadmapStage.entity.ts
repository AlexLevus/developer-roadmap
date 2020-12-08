import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
  @Column()
  stageId: string;

  @Expose()
  @Column()
  isCompleted: boolean;

  @ManyToOne(() => UserRoadmap, (userRoadmap) => userRoadmap.userRoadmapStages)
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
