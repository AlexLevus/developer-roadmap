import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';

enum Type {
  VERIFY_EMAIL,
  FORGOT_PASSWORD
}

@Entity({
  name: 'emails',
  orderBy: {
    createdAt: 'ASC'
  }
})
export class Email {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column()
  userId: string;

  @Expose()
  @Column({ type: 'text', nullable: true })
  type: Type;

  @Expose()
  @Column({ default: false })
  isOpened: boolean;

  @Expose()
  @Column({ type: 'date', default: new Date() })
  createdAt: Date;

  @Expose()
  @Column({ type: 'date', default: new Date() })
  updatedAt: Date;

  constructor(email: Partial<Email>) {
    if (email) {
      Object.assign(
        this,
        plainToClass(Email, email, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
