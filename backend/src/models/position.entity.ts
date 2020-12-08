import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { DepartmentUser } from './departmentUser.entity';

@Entity({
  name: 'positions'
})
export class Position {
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

  @OneToMany(() => DepartmentUser, (departmentUser) => departmentUser.position)
  departmentUsers: DepartmentUser[];

  constructor(position: Partial<Position>) {
    if (position) {
      Object.assign(
        this,
        plainToClass(Position, position, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
