import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { UserRoadmap } from './userRoadmap.entity';
import { DepartmentUser } from './departmentUser.entity';

@Entity({
  name: 'users'
})
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column()
  email: string;

  @Expose()
  @Column()
  password: string;

  @Expose()
  @Column()
  firstName: string;

  @Expose()
  @Column()
  lastName: string;

  // TODO: убрать и оставить только isActive
  @Expose()
  @Column({ default: false })
  isVerified: boolean;

  @Expose()
  @Column({ default: true })
  isActive: boolean;

  @Expose()
  @Column({ default: false })
  isAdmin: boolean;

  @Expose()
  @Column({ type: 'bigint', default: +new Date() })
  createdAt: number;

  @Expose()
  @Column({ type: 'bigint', nullable: true })
  lastLogin: number;

  // TODO: выделить в отдельную таблицу, если это и правда надо
  @Expose()
  @Column({ nullable: true })
  resetPasswordToken: string;

  // TODO: выделить в отдельную таблицу, если это и правда надо
  @Expose()
  @Column({ type: 'bigint', nullable: true })
  resetPasswordExpires: number;

  @OneToMany(() => UserRoadmap, (userRoadmap) => userRoadmap.user)
  public userRoadmaps!: UserRoadmap[];

  @OneToMany(() => DepartmentUser, (departmentUser) => departmentUser.user)
  public departmentUser!: DepartmentUser[];

  constructor(user: Partial<User>) {
    if (user) {
      Object.assign(
        this,
        plainToClass(User, user, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
