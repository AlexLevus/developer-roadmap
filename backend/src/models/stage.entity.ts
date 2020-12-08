import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import { Roadmap } from './roadmap.entity';

@Entity({
  name: 'stages'
})
export class Stage {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string;

  @Expose()
  @Column()
  text: string;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.stages)
  roadmap: Roadmap;

  constructor(stage: Partial<Stage>) {
    if (stage) {
      Object.assign(
        this,
        plainToClass(Stage, stage, {
          excludeExtraneousValues: true
        })
      );
    }
  }
}
