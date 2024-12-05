import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_tracks_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tracks_v_version_type" AS ENUM('track', 'set');
  CREATE TYPE "public"."enum__tracks_v_version_properties_key" AS ENUM('C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B');
  CREATE TYPE "public"."enum__tracks_v_version_source_type" AS ENUM('internal', 'soundcloud', 'youtube', 'spotify', 'beatport', 'bandcamp');
  CREATE TYPE "public"."enum__tracks_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "_tracks_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_image_id" integer,
  	"version_type" "enum__tracks_v_version_type" DEFAULT 'track',
  	"version_general_details_record_label" varchar,
  	"version_general_details_release_date" timestamp(3) with time zone,
  	"version_general_details_description" varchar,
  	"version_properties_bpm" numeric,
  	"version_properties_key" "enum__tracks_v_version_properties_key",
  	"version_properties_duration" numeric,
  	"version_source_type" "enum__tracks_v_version_source_type",
  	"version_internal_upload_id" integer,
  	"version_track_link" varchar,
  	"version_embed_track" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__tracks_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_tracks_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"artists_id" integer,
  	"genres_id" integer
  );
  
  ALTER TABLE "tracks" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tracks" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "tracks" ADD COLUMN "_status" "enum_tracks_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_tracks_v" ADD CONSTRAINT "_tracks_v_parent_id_tracks_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tracks"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tracks_v" ADD CONSTRAINT "_tracks_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tracks_v" ADD CONSTRAINT "_tracks_v_version_internal_upload_id_audio_id_fk" FOREIGN KEY ("version_internal_upload_id") REFERENCES "public"."audio"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tracks_v_rels" ADD CONSTRAINT "_tracks_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_tracks_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tracks_v_rels" ADD CONSTRAINT "_tracks_v_rels_artists_fk" FOREIGN KEY ("artists_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tracks_v_rels" ADD CONSTRAINT "_tracks_v_rels_genres_fk" FOREIGN KEY ("genres_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_tracks_v_parent_idx" ON "_tracks_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_tracks_v_version_version_title_idx" ON "_tracks_v" USING btree ("version_title");
  CREATE INDEX IF NOT EXISTS "_tracks_v_version_version_image_idx" ON "_tracks_v" USING btree ("version_image_id");
  CREATE INDEX IF NOT EXISTS "_tracks_v_version_version_internal_upload_idx" ON "_tracks_v" USING btree ("version_internal_upload_id");
  CREATE INDEX IF NOT EXISTS "_tracks_v_version_version_slug_idx" ON "_tracks_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_tracks_v_version_version_updated_at_idx" ON "_tracks_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_tracks_v_version_version_created_at_idx" ON "_tracks_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_tracks_v_version_version__status_idx" ON "_tracks_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_tracks_v_created_at_idx" ON "_tracks_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_tracks_v_updated_at_idx" ON "_tracks_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_tracks_v_latest_idx" ON "_tracks_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_tracks_v_autosave_idx" ON "_tracks_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_tracks_v_rels_order_idx" ON "_tracks_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_tracks_v_rels_parent_idx" ON "_tracks_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_tracks_v_rels_path_idx" ON "_tracks_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_tracks_v_rels_artists_id_idx" ON "_tracks_v_rels" USING btree ("artists_id");
  CREATE INDEX IF NOT EXISTS "_tracks_v_rels_genres_id_idx" ON "_tracks_v_rels" USING btree ("genres_id");
  CREATE INDEX IF NOT EXISTS "tracks__status_idx" ON "tracks" USING btree ("_status");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "_tracks_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tracks_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_tracks_v" CASCADE;
  DROP TABLE "_tracks_v_rels" CASCADE;
  DROP INDEX IF EXISTS "tracks__status_idx";
  ALTER TABLE "tracks" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tracks" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "tracks" DROP COLUMN IF EXISTS "_status";
  DROP TYPE "public"."enum_tracks_status";
  DROP TYPE "public"."enum__tracks_v_version_type";
  DROP TYPE "public"."enum__tracks_v_version_properties_key";
  DROP TYPE "public"."enum__tracks_v_version_source_type";
  DROP TYPE "public"."enum__tracks_v_version_status";`)
}
