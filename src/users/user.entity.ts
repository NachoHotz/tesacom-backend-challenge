import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('user')
export default class User {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created: string;
}
