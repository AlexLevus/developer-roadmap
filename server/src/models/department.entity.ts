import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
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
  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Expose()
  @Column({ name: 'manager_id', nullable: true })
  managerId: string;

  @Expose()
  @Column({ name: 'org_id' })
  orgId: string;

  @OneToMany(
    () => DepartmentUser,
    (departmentUser) => departmentUser.department
  )
  departmentUser!: DepartmentUser[];

  @ManyToOne(() => Organization, (org) => org.departments, { cascade: true })
  @JoinColumn({ name: 'org_id' })
  organization: Organization;

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
