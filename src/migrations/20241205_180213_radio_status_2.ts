import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "tracks_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tracks_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  ALTER TABLE "tracks" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "tracks_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "_tracks_v" ADD COLUMN "version_published_at" timestamp(3) with time zone;
  ALTER TABLE "_tracks_v_rels" ADD COLUMN "users_id" integer;
  DO $$ BEGIN
   ALTER TABLE "tracks_populated_authors" ADD CONSTRAINT "tracks_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tracks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tracks_v_version_populated_authors" ADD CONSTRAINT "_tracks_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tracks_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tracks_populated_authors_order_idx" ON "tracks_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tracks_populated_authors_parent_id_idx" ON "tracks_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tracks_v_version_populated_authors_order_idx" ON "_tracks_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tracks_v_version_populated_authors_parent_id_idx" ON "_tracks_v_version_populated_authors" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "tracks_rels" ADD CONSTRAINT "tracks_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tracks_v_rels" ADD CONSTRAINT "_tracks_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tracks_rels_users_id_idx" ON "tracks_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_tracks_v_rels_users_id_idx" ON "_tracks_v_rels" USING btree ("users_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "tracks_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tracks_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "tracks_populated_authors" CASCADE;
  DROP TABLE "_tracks_v_version_populated_authors" CASCADE;
  ALTER TABLE "tracks_rels" DROP CONSTRAINT "tracks_rels_users_fk";
  
  ALTER TABLE "_tracks_v_rels" DROP CONSTRAINT "_tracks_v_rels_users_fk";
  
  DROP INDEX IF EXISTS "tracks_rels_users_id_idx";
  DROP INDEX IF EXISTS "_tracks_v_rels_users_id_idx";
  ALTER TABLE "tracks" DROP COLUMN IF EXISTS "published_at";
  ALTER TABLE "tracks_rels" DROP COLUMN IF EXISTS "users_id";
  ALTER TABLE "_tracks_v" DROP COLUMN IF EXISTS "version_published_at";
  ALTER TABLE "_tracks_v_rels" DROP COLUMN IF EXISTS "users_id";`)
}
