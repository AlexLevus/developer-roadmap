import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { User } from './user.entity';

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
  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.position)
  users: User[];

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
