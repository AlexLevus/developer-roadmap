import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';
import { Expose, plainToClass } from 'class-transformer';

@Entity({
  name: 'users',
  orderBy: {
    createdAt: 'ASC'
  }
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

  @Expose()
  @Column({ nullable: true })
  resetPasswordToken: string;

  @Expose()
  @Column({ type: 'bigint', nullable: true })
  resetPasswordExpires: number;

  @Expose()
  @Column({ type: 'bigint', default: +new Date() })
  createdAt: number;

  @Expose()
  @Column({ type: 'bigint', nullable: true })
  lastLogin: number;

  @Expose()
  @Column({ default: false })
  isVerified: boolean;

  @Expose()
  @Column({ default: true })
  isActive: boolean;

  @Expose()
  @Column({ default: false })
  isSuperuser: boolean;

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
