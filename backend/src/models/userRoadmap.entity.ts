import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { User } from './user.entity';
import { Roadmap } from './roadmap.entity';
import { UserRoadmapStage } from './userRoadmapStage.entity';

@Entity({
  name: 'user_roadmaps'
})
export class UserRoadmap {
  @PrimaryGeneratedColumn({ name: 'user_roadmap_id' })
  userRoadmapId!: number;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'roadmap_id' })
  roadmapId!: string;

  @Expose()
  @Column({ name: 'start_date', type: 'bigint', default: +new Date() })
  startDate: number;

  @Expose()
  @Column({ name: 'is_completed', default: false })
  isCompleted: boolean;

  @Expose()
  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.userRoadmaps)
  user!: User;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.userRoadmaps)
  roadmap!: Roadmap;

  @OneToMany(
    () => UserRoadmapStage,
    (userRoadmapStage) => userRoadmapStage.userRoadmap
  )
  userRoadmapStages!: UserRoadmapStage[];

  constructor(userRoadmap: Partial<UserRoadmap>) {
    if (UserRoadmap) {
      Object.assign(
        this,
        plainToClass(UserRoadmap, userRoadmap, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
