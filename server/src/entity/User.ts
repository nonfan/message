import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'messager' })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 1 })
  status: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  wallpaper: string;
}
