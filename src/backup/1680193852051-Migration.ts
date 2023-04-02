import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1680193852051 implements MigrationInterface {
    name = 'Migration1680193852051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`start_at\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`start_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`start_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`start_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
