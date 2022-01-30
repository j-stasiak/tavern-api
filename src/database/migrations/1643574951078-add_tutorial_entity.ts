import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTutorialEntity1643574951078 implements MigrationInterface {
  name = 'addTutorialEntity1643574951078';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tutorial" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "stepsAmount" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4d07a72cfa203b3b21bde6da1b3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tutorial_step" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "description" text NOT NULL, "stepNumber" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "parentId" uuid, CONSTRAINT "PK_7c09cc94344ed216fd56acb5f4b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "tutorial_step" ADD CONSTRAINT "FK_b695570ee0c7947fb7afc2048f4" FOREIGN KEY ("parentId") REFERENCES "tutorial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tutorial_step" DROP CONSTRAINT "FK_b695570ee0c7947fb7afc2048f4"`);
    await queryRunner.query(`DROP TABLE "tutorial_step"`);
    await queryRunner.query(`DROP TABLE "tutorial"`);
  }
}
