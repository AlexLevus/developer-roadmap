import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';

@Entity({
  name: 'user_role'
})
export class UserRole {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column({ name: 'user_id' })
  userId: string;

  @Expose()
  @Column({ name: 'role_id' })
  roleId: string;

  constructor(userRole: Partial<UserRole>) {
    if (userRole) {
      Object.assign(
        this,
        plainToClass(UserRole, userRole, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
