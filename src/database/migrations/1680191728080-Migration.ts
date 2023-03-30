import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1680191728080 implements MigrationInterface {
    name = 'Migration1680191728080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`is_driver\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`start_location\` varchar(255) NOT NULL, \`departure_location\` varchar(255) NOT NULL, \`distance\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`reservation_status\` enum ('yet', 'selected', 'confirm', 'done') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userIdId\` int NULL, \`driverIdId\` int NULL, UNIQUE INDEX \`REL_7894e4e1b96647176dbfd1a979\` (\`userIdId\`), UNIQUE INDEX \`REL_fb0d2e26501aaf11a0cfc4f64c\` (\`driverIdId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_7894e4e1b96647176dbfd1a9790\` FOREIGN KEY (\`userIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_fb0d2e26501aaf11a0cfc4f64c8\` FOREIGN KEY (\`driverIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_fb0d2e26501aaf11a0cfc4f64c8\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_7894e4e1b96647176dbfd1a9790\``);
        await queryRunner.query(`DROP INDEX \`REL_fb0d2e26501aaf11a0cfc4f64c\` ON \`reservation\``);
        await queryRunner.query(`DROP INDEX \`REL_7894e4e1b96647176dbfd1a979\` ON \`reservation\``);
        await queryRunner.query(`DROP TABLE \`reservation\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
