import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1632564627465 implements MigrationInterface {
    name = 'FirstMigration1632564627465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."Users" ("UserID" SERIAL NOT NULL, "Username" character varying(100) NOT NULL, CONSTRAINT "PK_fe45fe4ee5317851eb4746a23d8" PRIMARY KEY ("UserID"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Users_pkey" ON "public"."Users" ("UserID") `);
        await queryRunner.query(`CREATE TABLE "public"."Message" ("MessageID" SERIAL NOT NULL, "ForUser" integer NOT NULL, "Title" character varying(100), "Message" character varying(1000), CONSTRAINT "PK_27caa80c09ef732a6579987aa60" PRIMARY KEY ("MessageID"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Message_pkey" ON "public"."Message" ("MessageID") `);
        await queryRunner.query(`ALTER TABLE "public"."Message" ADD CONSTRAINT "FK_1ea209c2981893a02b64e86748e" FOREIGN KEY ("ForUser") REFERENCES "public"."Users"("UserID") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Message" DROP CONSTRAINT "FK_1ea209c2981893a02b64e86748e"`);
        await queryRunner.query(`DROP INDEX "public"."Message_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."Message"`);
        await queryRunner.query(`DROP INDEX "public"."Users_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."Users"`);
    }

}
