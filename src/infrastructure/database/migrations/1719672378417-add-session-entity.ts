import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSessionEntity1719672378417 implements MigrationInterface {
  name = 'AddSessionEntity1719672378417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "session" DROP COLUMN "device"
        `);
    await queryRunner.query(`
            ALTER TABLE "session"
            ADD "device" json NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "session" DROP COLUMN "device"
        `);
    await queryRunner.query(`
            ALTER TABLE "session"
            ADD "device" character varying NOT NULL
        `);
  }
}
