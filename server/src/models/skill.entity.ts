import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { Roadmap } from './roadmap.entity';
import { User } from './user.entity';

@Entity({
  name: 'skills'
})
export class Skill {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column()
  name: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_skills',
    joinColumn: {
      name: 'skill_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  users: User[];

  constructor(skill: Partial<Skill>) {
    if (skill) {
      Object.assign(
        this,
        plainToClass(Skill, skill, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
