import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';

@Index('Users_pkey', ['userId'], { unique: true })
@Entity('Users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ name: 'UserID' })
  userId: number;

  @Column('character varying', {
    name: 'Username',
    length: 100,
  })
  username: string;

  @OneToMany(
    () => Message,
    (messages) => messages.forUser
  )
  userMessages: Message[];
}
