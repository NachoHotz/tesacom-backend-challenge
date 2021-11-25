import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('apps')
export default class Apps {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 255 })
  url: string

  @Column({ type: 'varchar', length: 255 })
  icon: string

  @CreateDateColumn({ type: 'timestamp' })
  created: Date
}
