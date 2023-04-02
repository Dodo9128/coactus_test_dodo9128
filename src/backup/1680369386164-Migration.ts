import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1680369386164 implements MigrationInterface {
    name = 'Migration1680369386164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_529dceb01ef681127fef04d755d\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_b586c45ed33a9175b15c2aec89e\``);
        await queryRunner.query(`DROP INDEX \`REL_529dceb01ef681127fef04d755\` ON \`reservation\``);
        await queryRunner.query(`DROP INDEX \`REL_b586c45ed33a9175b15c2aec89\` ON \`reservation\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`driverId\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`customer_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`driver_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_ffb0414171d826ee21f993f17fe\` FOREIGN KEY (\`customer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_b0219e47f8923637ca027685094\` FOREIGN KEY (\`driver_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_b0219e47f8923637ca027685094\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_ffb0414171d826ee21f993f17fe\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`driver_id\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`customer_id\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`driverId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`userId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b586c45ed33a9175b15c2aec89\` ON \`reservation\` (\`driverId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_529dceb01ef681127fef04d755\` ON \`reservation\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_b586c45ed33a9175b15c2aec89e\` FOREIGN KEY (\`driverId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_529dceb01ef681127fef04d755d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
