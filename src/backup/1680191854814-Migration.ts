import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1680191854814 implements MigrationInterface {
    name = 'Migration1680191854814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`is_driver\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`start_location\` varchar(255) NOT NULL, \`departure_location\` varchar(255) NOT NULL, \`distance\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`reservation_status\` enum ('yet', 'selected', 'confirm', 'done') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`driverId\` int NULL, UNIQUE INDEX \`REL_529dceb01ef681127fef04d755\` (\`userId\`), UNIQUE INDEX \`REL_b586c45ed33a9175b15c2aec89\` (\`driverId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_529dceb01ef681127fef04d755d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_b586c45ed33a9175b15c2aec89e\` FOREIGN KEY (\`driverId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_b586c45ed33a9175b15c2aec89e\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_529dceb01ef681127fef04d755d\``);
        await queryRunner.query(`DROP INDEX \`REL_b586c45ed33a9175b15c2aec89\` ON \`reservation\``);
        await queryRunner.query(`DROP INDEX \`REL_529dceb01ef681127fef04d755\` ON \`reservation\``);
        await queryRunner.query(`DROP TABLE \`reservation\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
