import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "artists_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"genres_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_artists_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"genres_id" integer
  );
  
  DROP INDEX IF EXISTS "tracks_title_idx";
  ALTER TABLE "genres" ADD COLUMN "image_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "tracks_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "artists_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "genres_id" integer;
  DO $$ BEGIN
   ALTER TABLE "artists_rels" ADD CONSTRAINT "artists_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artists_rels" ADD CONSTRAINT "artists_rels_genres_fk" FOREIGN KEY ("genres_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artists_v_rels" ADD CONSTRAINT "_artists_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_artists_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artists_v_rels" ADD CONSTRAINT "_artists_v_rels_genres_fk" FOREIGN KEY ("genres_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "artists_rels_order_idx" ON "artists_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "artists_rels_parent_idx" ON "artists_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "artists_rels_path_idx" ON "artists_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "artists_rels_genres_id_idx" ON "artists_rels" USING btree ("genres_id");
  CREATE INDEX IF NOT EXISTS "_artists_v_rels_order_idx" ON "_artists_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_artists_v_rels_parent_idx" ON "_artists_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_artists_v_rels_path_idx" ON "_artists_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_artists_v_rels_genres_id_idx" ON "_artists_v_rels" USING btree ("genres_id");
  DO $$ BEGIN
   ALTER TABLE "genres" ADD CONSTRAINT "genres_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_tracks_fk" FOREIGN KEY ("tracks_id") REFERENCES "public"."tracks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_artists_fk" FOREIGN KEY ("artists_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_genres_fk" FOREIGN KEY ("genres_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "genres_image_idx" ON "genres" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "search_rels_tracks_id_idx" ON "search_rels" USING btree ("tracks_id");
  CREATE INDEX IF NOT EXISTS "search_rels_artists_id_idx" ON "search_rels" USING btree ("artists_id");
  CREATE INDEX IF NOT EXISTS "search_rels_genres_id_idx" ON "search_rels" USING btree ("genres_id");
  CREATE INDEX IF NOT EXISTS "tracks_title_idx" ON "tracks" USING btree ("title");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "artists_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_artists_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "artists_rels" CASCADE;
  DROP TABLE "_artists_v_rels" CASCADE;
  ALTER TABLE "genres" DROP CONSTRAINT "genres_image_id_media_id_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_tracks_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_artists_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_genres_fk";
  
  DROP INDEX IF EXISTS "genres_image_idx";
  DROP INDEX IF EXISTS "search_rels_tracks_id_idx";
  DROP INDEX IF EXISTS "search_rels_artists_id_idx";
  DROP INDEX IF EXISTS "search_rels_genres_id_idx";
  DROP INDEX IF EXISTS "tracks_title_idx";
  CREATE UNIQUE INDEX IF NOT EXISTS "tracks_title_idx" ON "tracks" USING btree ("title");
  ALTER TABLE "genres" DROP COLUMN IF EXISTS "image_id";
  ALTER TABLE "search_rels" DROP COLUMN IF EXISTS "tracks_id";
  ALTER TABLE "search_rels" DROP COLUMN IF EXISTS "artists_id";
  ALTER TABLE "search_rels" DROP COLUMN IF EXISTS "genres_id";`)
}
