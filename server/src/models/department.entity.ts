import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne
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
  @Column({ name: 'org_id' })
  orgId: string;

  @OneToMany(() => User, (user) => user.department)
  users: User[];

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'manager_id' })
  manager: User;

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
