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
import { User } from './User';

export enum RoleCode {
    TENANT = 'TENANT',
    SUB_TENANT = 'SUB_TENANT',
    SUPER_ADMIN = 'SUPER_ADMIN',
}

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: RoleCode;

    @Column({ nullable: true, default: true })
    status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => User, (user) => user.roleData)
    @JoinColumn()
    user: Relation<User>;
}
