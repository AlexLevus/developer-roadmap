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
  @PrimaryGeneratedColumn()
  userRoadmapId!: number;

  @Column()
  userId!: string;

  @Column()
  roadmapId!: string;

  @Expose()
  @Column({ type: 'bigint', default: +new Date() })
  startDate: number;

  @Expose()
  @Column({ default: false })
  isCompleted: boolean;

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
