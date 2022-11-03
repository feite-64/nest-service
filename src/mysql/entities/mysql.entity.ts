import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Mysql {
  @PrimaryGeneratedColumn('uuid')
  id: number
  @Column()
  username: string
  @Column()
  password: string
  @Column()
  age: number
  @Column()
  emaill: string
}
