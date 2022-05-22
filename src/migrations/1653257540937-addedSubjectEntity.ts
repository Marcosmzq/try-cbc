import {MigrationInterface, QueryRunner} from "typeorm";

export class addedSubjectEntity1653257540937 implements MigrationInterface {
    name = 'addedSubjectEntity1653257540937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subject" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "isPremium" boolean NOT NULL, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trivia" DROP COLUMN "subject"`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD "source" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD "subject_id" integer`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD CONSTRAINT "FK_99758a4bbda0c8c35780bde5357" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trivia" DROP CONSTRAINT "FK_99758a4bbda0c8c35780bde5357"`);
        await queryRunner.query(`ALTER TABLE "trivia" DROP COLUMN "subject_id"`);
        await queryRunner.query(`ALTER TABLE "trivia" DROP COLUMN "source"`);
        await queryRunner.query(`ALTER TABLE "trivia" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD "subject" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "subject"`);
    }

}
