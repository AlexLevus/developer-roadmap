import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { AuthGroup } from './auth-group.entity';

@Entity({
  name: 'auth_permission'
})
export class AuthPermission {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column()
  codename: string;

  @ManyToMany(() => AuthGroup)
  @JoinTable({
    name: 'auth_group_permissions',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    }
  })
  authGroups: AuthGroup[];

  constructor(authPermission: Partial<AuthPermission>) {
    if (authPermission) {
      Object.assign(
        this,
        plainToClass(AuthPermission, authPermission, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
