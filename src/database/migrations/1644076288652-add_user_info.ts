import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserInfo1644076288652 implements MigrationInterface {
  name = 'addUserInfo1644076288652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_info_rank_enum" AS ENUM('novice', 'amateur', 'adept', 'master', 'grandmaster')`
    );
    await queryRunner.query(
      `CREATE TABLE "user_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "level" integer NOT NULL DEFAULT '0', "experience" integer NOT NULL DEFAULT '0', "rank" "public"."user_info_rank_enum" NOT NULL DEFAULT 'novice', "reputation" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "infoId" uuid`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e076c5c3e4ded53e0552bbb9e00" UNIQUE ("infoId")`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e076c5c3e4ded53e0552bbb9e00" FOREIGN KEY ("infoId") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e076c5c3e4ded53e0552bbb9e00"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e076c5c3e4ded53e0552bbb9e00"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "infoId"`);
    await queryRunner.query(`DROP TABLE "user_info"`);
    await queryRunner.query(`DROP TYPE "public"."user_info_rank_enum"`);
  }
}
