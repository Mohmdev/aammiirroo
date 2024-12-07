import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'secondary';
  ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'destructive';
  ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'ghost';
  ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'secondary';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'destructive';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'ghost';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'secondary';
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'destructive';
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'ghost';
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'secondary';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'destructive';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'ghost';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'link';`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "public"."pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_hero_links_link_appearance" USING "link_appearance"::"public"."enum_pages_hero_links_link_appearance";
  ALTER TABLE "public"."pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "public"."_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_links_link_appearance" USING "link_appearance"::"public"."enum__pages_v_version_hero_links_link_appearance";
  ALTER TABLE "public"."_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_content_columns_link_appearance";`)
}
