import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationshipToSessionAndUser1719672459617
  implements MigrationInterface
{
  name = 'AddRelationshipToSessionAndUser1719672459617';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "session"
            ADD "ownerId" uuid NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "session"
            ADD CONSTRAINT "FK_e1dde0bd0402cc9b1967c40a1b3" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "session" DROP CONSTRAINT "FK_e1dde0bd0402cc9b1967c40a1b3"
        `);
    await queryRunner.query(`
            ALTER TABLE "session" DROP COLUMN "ownerId"
        `);
  }
}
