import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1680431471243 implements MigrationInterface {
    name = 'Migration1680431471243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ffb0414171d826ee21f993f17f\` ON \`reservation\``);
        await queryRunner.query(`DROP INDEX \`IDX_b0219e47f8923637ca02768509\` ON \`reservation\``);
        await queryRunner.query(`DROP INDEX \`REL_ffb0414171d826ee21f993f17f\` ON \`reservation\``);
        await queryRunner.query(`DROP INDEX \`REL_b0219e47f8923637ca02768509\` ON \`reservation\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b0219e47f8923637ca02768509\` ON \`reservation\` (\`driver_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ffb0414171d826ee21f993f17f\` ON \`reservation\` (\`customer_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b0219e47f8923637ca02768509\` ON \`reservation\` (\`driver_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ffb0414171d826ee21f993f17f\` ON \`reservation\` (\`customer_id\`)`);
    }

}
