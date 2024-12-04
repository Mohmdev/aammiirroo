import * as migration_20241204_191400_base from './20241204_191400_base';
import * as migration_20241204_192924_base_2 from './20241204_192924_base_2';

export const migrations = [
  {
    up: migration_20241204_191400_base.up,
    down: migration_20241204_191400_base.down,
    name: '20241204_191400_base',
  },
  {
    up: migration_20241204_192924_base_2.up,
    down: migration_20241204_192924_base_2.down,
    name: '20241204_192924_base_2'
  },
];
