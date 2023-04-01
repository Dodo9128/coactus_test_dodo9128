import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1680370527919 implements MigrationInterface {
    name = 'Migration1680370527919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_ffb0414171d826ee21f993f17fe\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_b0219e47f8923637ca027685094\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD UNIQUE INDEX \`IDX_ffb0414171d826ee21f993f17f\` (\`customer_id\`)`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD UNIQUE INDEX \`IDX_b0219e47f8923637ca02768509\` (\`driver_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ffb0414171d826ee21f993f17f\` ON \`reservation\` (\`customer_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b0219e47f8923637ca02768509\` ON \`reservation\` (\`driver_id\`)`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_ffb0414171d826ee21f993f17fe\` FOREIGN KEY (\`customer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_b0219e47f8923637ca027685094\` FOREIGN KEY (\`driver_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_b0219e47f8923637ca027685094\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_ffb0414171d826ee21f993f17fe\``);
        await queryRunner.query(`DROP INDEX \`REL_b0219e47f8923637ca02768509\` ON \`reservation\``);
        await queryRunner.query(`DROP INDEX \`REL_ffb0414171d826ee21f993f17f\` ON \`reservation\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP INDEX \`IDX_b0219e47f8923637ca02768509\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP INDEX \`IDX_ffb0414171d826ee21f993f17f\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_b0219e47f8923637ca027685094\` FOREIGN KEY (\`driver_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_ffb0414171d826ee21f993f17fe\` FOREIGN KEY (\`customer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
