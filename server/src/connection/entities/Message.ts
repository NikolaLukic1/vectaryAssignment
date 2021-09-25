import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';

@Index('Message_pkey', ['messageId'], { unique: true })
@Entity('Message', { schema: 'public' })
export class Message {

  @PrimaryGeneratedColumn({ name: 'MessageID' })
  messageId: number;

  @Column('bigint', { name: 'ForUser' })
  forUserId: number;

  @Column('character varying', {
    name: 'Title',
    nullable: true,
    length: 100,
  })
  title: string | null;

  @Column('character varying', {
    name: 'Message',
    nullable: true,
    length: 1000,
  })
  message: string | null;

  @ManyToOne(
    () => Users,
    (user) => user.userMessages,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([
    { name: 'ForUser', referencedColumnName: 'userId' },
  ])
  forUser: Users;

}
