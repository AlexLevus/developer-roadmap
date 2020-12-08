import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { User } from './user.entity';
import { Department } from './department.entity';
import { Position } from './position.entity';

@Entity({
  name: 'department_users'
})
export class DepartmentUser {
  @PrimaryGeneratedColumn()
  departmentUserId!: number;

  @Column()
  departmentId!: string;

  @Column()
  userId!: string;

  @Expose()
  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => Department, (department) => department)
  department!: Department;

  @ManyToOne(() => User, (user) => user)
  user!: User;

  @ManyToOne(() => Position, (position) => position.departmentUsers)
  position: Position;

  constructor(departmentUser: Partial<DepartmentUser>) {
    if (DepartmentUser) {
      Object.assign(
        this,
        plainToClass(DepartmentUser, departmentUser, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
