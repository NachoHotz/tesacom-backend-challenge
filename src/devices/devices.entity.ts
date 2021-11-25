import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export default class Devices {
  @PrimaryGeneratedColumn()
  serial: string

  @Column({ type: 'varchar', length: 255 })
  alias: string

  @Column({ type: 'varchar', length: 255 })
  model: string

  @Column({ type: 'integer' })
  code: number

  @CreateDateColumn({ type: 'timestamp' })
  created: string
}
