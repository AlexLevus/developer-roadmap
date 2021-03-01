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
  name: 'auth_group'
})
export class AuthGroup {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column()
  name: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_groups',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  users: User[];

  constructor(authGroup: Partial<AuthGroup>) {
    if (authGroup) {
      Object.assign(
        this,
        plainToClass(AuthGroup, authGroup, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
