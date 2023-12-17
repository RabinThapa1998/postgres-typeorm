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

export enum RoleCode {
    TENANT = 'TENANT',
    SUB_TENANT = 'SUB_TENANT',
    SUPER_ADMIN = 'SUPER_ADMIN',
}

@Entity()
export class RoleType {
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
}

//initalize Table
