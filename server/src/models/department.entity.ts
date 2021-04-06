import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { Organization } from './organization.entity';
import { User } from './user.entity';

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

  @ManyToMany(() => User, (user) => user.departments)
  @JoinTable({
    name: 'department_users',
    joinColumn: {
      name: 'department_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  users!: User[];

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
