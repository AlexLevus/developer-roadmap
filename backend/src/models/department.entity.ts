import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { DepartmentUser } from './departmentUser.entity';
import { Organization } from './organization.entity';

@Entity({
  name: 'departments'
})
export class Department {
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
  @Column({ default: false })
  isActive: boolean;

  @Expose()
  @Column()
  managerId: string;

  @OneToMany(
    () => DepartmentUser,
    (departmentUser) => departmentUser.department
  )
  public departmentUser!: DepartmentUser[];

  @ManyToOne(() => Organization, (org) => org.departments)
  org: Organization;

  constructor(department: Partial<Department>) {
    if (department) {
      Object.assign(
        this,
        plainToClass(Department, department, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
