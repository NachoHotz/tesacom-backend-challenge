import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity('devices')
export default class Devices {
  @PrimaryColumn({ unique: true })
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
