import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthUserTbl1748329169981 implements MigrationInterface {
  name = 'CreateAuthUserTbl1748329169981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, "email" character varying(255) NOT NULL, "hashed_password" character varying(255) NOT NULL, "refresh_token" character varying(255), CONSTRAINT "UQ_a83a2c4135cbbed32dd980fad90" UNIQUE ("user_id"), CONSTRAINT "PK_c88cc8077366b470dafc2917366" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth_users"`);
  }
}
