import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1680193785597 implements MigrationInterface {
    name = 'Migration1680193785597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`start_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`start_at\``);
    }

}
