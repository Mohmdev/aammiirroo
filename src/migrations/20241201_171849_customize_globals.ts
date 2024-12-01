import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "site_information" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"basics_site_name" varchar NOT NULL,
  	"basics_site_description" varchar NOT NULL,
  	"basics_primary_color" varchar DEFAULT '#000000',
  	"basics_secondary_color" varchar DEFAULT '#FFFFFF',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "contact_information" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_details_contact_name" varchar,
  	"contact_details_contact_email" varchar,
  	"contact_details_contact_phone" varchar,
  	"contact_details_contact_address" varchar,
  	"soundcloud" varchar,
  	"beatport" varchar,
  	"spotify" varchar,
  	"bandcamp" varchar,
  	"facebook" varchar,
  	"twitter" varchar,
  	"instagram" varchar,
  	"linkedin" varchar,
  	"youtube" varchar,
  	"whatsapp" varchar,
  	"telegram" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "graphics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_light_id" integer,
  	"logo_dark_id" integer,
  	"favicon_id" integer,
  	"brand_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "graphics" ADD CONSTRAINT "graphics_logo_light_id_assets_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "graphics" ADD CONSTRAINT "graphics_logo_dark_id_assets_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "graphics" ADD CONSTRAINT "graphics_favicon_id_assets_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "graphics" ADD CONSTRAINT "graphics_brand_image_id_assets_id_fk" FOREIGN KEY ("brand_image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "graphics_logo_light_idx" ON "graphics" USING btree ("logo_light_id");
  CREATE INDEX IF NOT EXISTS "graphics_logo_dark_idx" ON "graphics" USING btree ("logo_dark_id");
  CREATE INDEX IF NOT EXISTS "graphics_favicon_idx" ON "graphics" USING btree ("favicon_id");
  CREATE INDEX IF NOT EXISTS "graphics_brand_image_idx" ON "graphics" USING btree ("brand_image_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "site_information" CASCADE;
  DROP TABLE "contact_information" CASCADE;
  DROP TABLE "graphics" CASCADE;`)
}
