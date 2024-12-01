import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_audio_files_key" AS ENUM('C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B');
  CREATE TABLE IF NOT EXISTS "assets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"prefix" varchar DEFAULT 'assets',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "audio_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"artist" varchar NOT NULL,
  	"duration" varchar,
  	"bpm" numeric,
  	"key" "enum_audio_files_key",
  	"description" varchar,
  	"release_date" timestamp(3) with time zone,
  	"prefix" varchar DEFAULT 'audio-files',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "assets_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "audio_files_id" integer;
  CREATE INDEX IF NOT EXISTS "assets_updated_at_idx" ON "assets" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "assets_created_at_idx" ON "assets" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "assets_filename_idx" ON "assets" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "audio_files_updated_at_idx" ON "audio_files" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "audio_files_created_at_idx" ON "audio_files" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "audio_files_filename_idx" ON "audio_files" USING btree ("filename");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_assets_fk" FOREIGN KEY ("assets_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audio_files_fk" FOREIGN KEY ("audio_files_id") REFERENCES "public"."audio_files"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_assets_id_idx" ON "payload_locked_documents_rels" USING btree ("assets_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_audio_files_id_idx" ON "payload_locked_documents_rels" USING btree ("audio_files_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "assets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "audio_files" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "assets" CASCADE;
  DROP TABLE "audio_files" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_assets_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_audio_files_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_assets_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_audio_files_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "assets_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "audio_files_id";
  DROP TYPE "public"."enum_audio_files_key";`)
}
