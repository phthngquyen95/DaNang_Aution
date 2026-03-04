import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('image_relation')
export class ImageRelation {
  @PrimaryColumn({ name: 'image_id' })
  imageId!: number;

  @PrimaryColumn({ name: 'image_fk_id' })
  imageFkId!: number;

  @Column()
  type!: string;
}
