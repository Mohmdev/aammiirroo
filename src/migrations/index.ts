import * as migration_20241205_140600_payload_v3_4_0 from './20241205_140600_payload_v3_4_0';
import * as migration_20241205_154008_radio_status from './20241205_154008_radio_status';

export const migrations = [
  {
    up: migration_20241205_140600_payload_v3_4_0.up,
    down: migration_20241205_140600_payload_v3_4_0.down,
    name: '20241205_140600_payload_v3_4_0',
  },
  {
    up: migration_20241205_154008_radio_status.up,
    down: migration_20241205_154008_radio_status.down,
    name: '20241205_154008_radio_status'
  },
];
