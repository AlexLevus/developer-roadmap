import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from './user.entity';
import { Department } from './department.entity';

@Entity({
  name: 'department_users'
})
export class DepartmentUser {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Department, (department) => department)
  @JoinColumn({ name: 'department_id' })
  department!: Department;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

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
