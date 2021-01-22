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
  @Column({ name: 'first_name' })
  firstName: string;

  @Expose()
  @Column({ name: 'last_name' })
  lastName: string;

  // TODO: убрать и оставить только isActive
  @Expose()
  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Expose()
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Expose()
  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @Expose()
  @Column({ name: 'created_at', type: 'bigint', default: +new Date() })
  createdAt: number;

  @Expose()
  @Column({ name: 'last_login', type: 'bigint', nullable: true })
  lastLogin: number;

  // TODO: выделить в отдельную таблицу, если это и правда надо
  @Expose()
  @Column({ name: 'reset_password_token', nullable: true })
  resetPasswordToken: string;

  // TODO: выделить в отдельную таблицу, если это и правда надо
  @Expose()
  @Column({ name: 'reset_password_expire', type: 'bigint', nullable: true })
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
