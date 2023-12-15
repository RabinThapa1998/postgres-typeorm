import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';

export enum Permission {
    GENERAL = 'GENERAL',
}

@Entity()
export class ApiKey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    version: number;

    @Column({
        type: 'enum',
        enum: Permission,
    })
    permissions: string;

    @Column({ nullable: true })
    comments: string;

    @Column({ nullable: true, default: true })
    status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
