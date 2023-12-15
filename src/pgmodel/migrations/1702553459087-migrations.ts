import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1702553459087 implements MigrationInterface {
    name = 'Migrations1702553459087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
