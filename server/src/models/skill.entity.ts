import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
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

  @Expose()
  @Column({ name: 'is_default', default: false })
  isDefault: boolean;

  @ManyToMany(() => User, (user) => user.skills)
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
