import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { User } from './user.entity';
import { Roadmap } from './roadmap.entity';
import { UserRoadmapStage } from './userRoadmapStage.entity';

@Entity({
  name: 'user_roadmaps'
})
export class UserRoadmap {
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column({ name: 'start_date', type: 'bigint', default: +new Date() })
  startDate: number;

  @Expose()
  @Column({ name: 'is_completed', default: false })
  isCompleted: boolean;

  @Expose()
  @Column({ default: 0 })
  rating: number;

  @Expose()
  @Column({ name: 'user_id' })
  userId!: string;

  @Expose()
  @Column({ name: 'roadmap_id' })
  roadmapId!: string;

  @ManyToOne(() => User, (user) => user.userRoadmaps)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.userRoadmaps)
  @JoinColumn({ name: 'roadmap_id' })
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
