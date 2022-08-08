import {MigrationInterface, QueryRunner} from "typeorm";

export class upgradeV21659996257770 implements MigrationInterface {
    name = 'upgradeV21659996257770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quote" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "quoteAuthor" character varying NOT NULL, "quoteContent" character varying NOT NULL, "userId" integer, "courseId" integer, CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "content" character varying NOT NULL, "authorId" integer, "courseId" integer, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "timeline_event" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "eventDate" character varying NOT NULL, "eventTitle" character varying NOT NULL, "eventContent" character varying NOT NULL, "timelineId" integer, CONSTRAINT "PK_8f5a66cd7151d78a419da3a3375" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "timeline" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, "courseId" integer, CONSTRAINT "PK_f841188896cefd9277904ec40b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'FREE_USER', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "concept" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "authorId" integer, "courseId" integer, CONSTRAINT "PK_83c1330866b9866ac2d0ed2b36b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "isPremium" boolean NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trivias_answer" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "statement" character varying NOT NULL, "isTrue" boolean NOT NULL, "triviaId" integer, CONSTRAINT "PK_7dc59204ebe49ebecd707f0282f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trivia" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isTrivia" boolean NOT NULL, "isFlashcard" boolean NOT NULL, "statement" character varying NOT NULL, "feedback" character varying, "exam" character varying NOT NULL, "courseId" integer, CONSTRAINT "PK_faf9ea23fdea1723297b3e92c1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_bcbf020650ca118abc4cc1ceead" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_d0a3b338484510d6bd2f4a635ff" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_59d5801d406020527940335d902" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_55886fee46950944a86715d6afb" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "timeline_event" ADD CONSTRAINT "FK_a94d78560467c5edaf3149307af" FOREIGN KEY ("timelineId") REFERENCES "timeline"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "timeline" ADD CONSTRAINT "FK_be6839500952c5779d389aa2e5b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "timeline" ADD CONSTRAINT "FK_835970b759ab3b48a32ba67fdf1" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "concept" ADD CONSTRAINT "FK_cbb7d359b1afd41c203e3a7f356" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "concept" ADD CONSTRAINT "FK_92c9d2f1b31782f0911f12c13a8" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trivias_answer" ADD CONSTRAINT "FK_308920f302eacb0da9bfb94ee18" FOREIGN KEY ("triviaId") REFERENCES "trivia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD CONSTRAINT "FK_42c8806deb33d0b276e02a0cb71" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trivia" DROP CONSTRAINT "FK_42c8806deb33d0b276e02a0cb71"`);
        await queryRunner.query(`ALTER TABLE "trivias_answer" DROP CONSTRAINT "FK_308920f302eacb0da9bfb94ee18"`);
        await queryRunner.query(`ALTER TABLE "concept" DROP CONSTRAINT "FK_92c9d2f1b31782f0911f12c13a8"`);
        await queryRunner.query(`ALTER TABLE "concept" DROP CONSTRAINT "FK_cbb7d359b1afd41c203e3a7f356"`);
        await queryRunner.query(`ALTER TABLE "timeline" DROP CONSTRAINT "FK_835970b759ab3b48a32ba67fdf1"`);
        await queryRunner.query(`ALTER TABLE "timeline" DROP CONSTRAINT "FK_be6839500952c5779d389aa2e5b"`);
        await queryRunner.query(`ALTER TABLE "timeline_event" DROP CONSTRAINT "FK_a94d78560467c5edaf3149307af"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_55886fee46950944a86715d6afb"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_59d5801d406020527940335d902"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_d0a3b338484510d6bd2f4a635ff"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_bcbf020650ca118abc4cc1ceead"`);
        await queryRunner.query(`DROP TABLE "trivia"`);
        await queryRunner.query(`DROP TABLE "trivias_answer"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "concept"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "timeline"`);
        await queryRunner.query(`DROP TABLE "timeline_event"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`DROP TABLE "quote"`);
    }

}
