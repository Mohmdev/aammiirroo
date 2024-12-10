import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "tracks" ADD COLUMN "internal_id" integer;
  ALTER TABLE "tracks" ADD COLUMN "upload_lock" boolean DEFAULT true;
  ALTER TABLE "_tracks_v" ADD COLUMN "version_internal_id" integer;
  ALTER TABLE "_tracks_v" ADD COLUMN "version_upload_lock" boolean DEFAULT true;
  DO $$ BEGIN
   ALTER TABLE "tracks" ADD CONSTRAINT "tracks_internal_id_audio_id_fk" FOREIGN KEY ("internal_id") REFERENCES "public"."audio"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tracks_v" ADD CONSTRAINT "_tracks_v_version_internal_id_audio_id_fk" FOREIGN KEY ("version_internal_id") REFERENCES "public"."audio"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tracks_internal_idx" ON "tracks" USING btree ("internal_id");
  CREATE INDEX IF NOT EXISTS "_tracks_v_version_version_internal_idx" ON "_tracks_v" USING btree ("version_internal_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "tracks" DROP CONSTRAINT "tracks_internal_id_audio_id_fk";
  
  ALTER TABLE "_tracks_v" DROP CONSTRAINT "_tracks_v_version_internal_id_audio_id_fk";
  
  DROP INDEX IF EXISTS "tracks_internal_idx";
  DROP INDEX IF EXISTS "_tracks_v_version_version_internal_idx";
  ALTER TABLE "tracks" DROP COLUMN IF EXISTS "internal_id";
  ALTER TABLE "tracks" DROP COLUMN IF EXISTS "upload_lock";
  ALTER TABLE "_tracks_v" DROP COLUMN IF EXISTS "version_internal_id";
  ALTER TABLE "_tracks_v" DROP COLUMN IF EXISTS "version_upload_lock";`)
}
