import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    Relation,
} from 'typeorm';

import { Role } from './Role';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    profilePicUrl: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true, default: true })
    verified: boolean;

    @Column({ nullable: true, default: true })
    status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Role, (role) => role.user)
    roleData: Role;
}
