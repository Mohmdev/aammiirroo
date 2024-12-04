import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "artists" RENAME COLUMN "photo_id" TO "image_id";
  ALTER TABLE "_artists_v" RENAME COLUMN "version_photo_id" TO "version_image_id";
  ALTER TABLE "artists" DROP CONSTRAINT "artists_photo_id_media_id_fk";
  
  ALTER TABLE "_artists_v" DROP CONSTRAINT "_artists_v_version_photo_id_media_id_fk";
  
  DROP INDEX IF EXISTS "artists_photo_idx";
  DROP INDEX IF EXISTS "_artists_v_version_version_photo_idx";
  DO $$ BEGIN
   ALTER TABLE "artists" ADD CONSTRAINT "artists_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artists_v" ADD CONSTRAINT "_artists_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "artists_image_idx" ON "artists" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_artists_v_version_version_image_idx" ON "_artists_v" USING btree ("version_image_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "artists" RENAME COLUMN "image_id" TO "photo_id";
  ALTER TABLE "_artists_v" RENAME COLUMN "version_image_id" TO "version_photo_id";
  ALTER TABLE "artists" DROP CONSTRAINT "artists_image_id_media_id_fk";
  
  ALTER TABLE "_artists_v" DROP CONSTRAINT "_artists_v_version_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "artists_image_idx";
  DROP INDEX IF EXISTS "_artists_v_version_version_image_idx";
  DO $$ BEGIN
   ALTER TABLE "artists" ADD CONSTRAINT "artists_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artists_v" ADD CONSTRAINT "_artists_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "artists_photo_idx" ON "artists" USING btree ("photo_id");
  CREATE INDEX IF NOT EXISTS "_artists_v_version_version_photo_idx" ON "_artists_v" USING btree ("version_photo_id");`)
}
