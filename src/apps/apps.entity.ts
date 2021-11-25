import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export default class Apps {
  @PrimaryGeneratedColumn()
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
