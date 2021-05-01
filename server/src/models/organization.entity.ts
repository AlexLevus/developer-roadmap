import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { Department } from './department.entity';
import { User } from './user.entity';

@Entity({
  name: 'organizations'
})
export class Organization {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column({ type: 'text' })
  name: string;

  @Expose()
  @Column({ name: 'director_id', type: 'text' })
  directorId: string;

  @Expose()
  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @OneToMany(() => Department, (department) => department.organization)
  departments: Department[];

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  constructor(organization: Partial<Organization>) {
    if (organization) {
      Object.assign(
        this,
        plainToClass(Organization, organization, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
