import * as migration_20241201_145519_initial_migration from './20241201_145519_initial_migration';
import * as migration_20241201_153925_upload_collections from './20241201_153925_upload_collections';
import * as migration_20241201_171849_customize_globals from './20241201_171849_customize_globals';

export const migrations = [
  {
    up: migration_20241201_145519_initial_migration.up,
    down: migration_20241201_145519_initial_migration.down,
    name: '20241201_145519_initial_migration',
  },
  {
    up: migration_20241201_153925_upload_collections.up,
    down: migration_20241201_153925_upload_collections.down,
    name: '20241201_153925_upload_collections',
  },
  {
    up: migration_20241201_171849_customize_globals.up,
    down: migration_20241201_171849_customize_globals.down,
    name: '20241201_171849_customize_globals'
  },
];
