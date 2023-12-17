import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { Tenant } from './Tenant';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    body: string;

    @OneToOne(() => Tenant)
    @JoinColumn()
    tenant: string;
}
