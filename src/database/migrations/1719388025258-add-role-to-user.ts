import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUser1719388025258 implements MigrationInterface {
  name = 'AddRoleToUser1719388025258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'USER')
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "role"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
  }
}
