import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { UserRoadmap } from './userRoadmap.entity';
import { Stage } from './stage.entity';
import { User } from './user.entity';

@Entity({
  name: 'roadmaps'
})
export class Roadmap {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column({ type: 'text' })
  name: string;

  @Expose()
  @Column({ type: 'text' })
  description: string;

  @Expose()
  @Column({ default: 0 })
  rating: number;

  @ManyToOne(() => User, (user) => user.userRoadmaps, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Expose()
  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @OneToMany(() => UserRoadmap, (userRoadmap) => userRoadmap.roadmap)
  userRoadmaps!: UserRoadmap[];

  @OneToMany(() => Stage, (stage) => stage.roadmap, { eager: true })
  stages: Stage[];

  constructor(roadmap: Partial<Roadmap>) {
    if (roadmap) {
      Object.assign(
        this,
        plainToClass(Roadmap, roadmap, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
