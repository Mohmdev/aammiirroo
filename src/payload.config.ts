import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './modules/Content/Categories'
import { Media } from './modules/Upload/Media'
import { Pages } from './modules/Content/Pages'
import { Posts } from './modules/Content/Posts'
import { Users } from './modules/Settings/Users'
import { Tracks } from './modules/Radio/Tracks'
import { Artists } from './modules/Radio/Artists'
import { Genres } from './modules/Radio/Genres'
import { Footer } from './modules/Navigation/Footer/config'
import { Header } from './modules/Navigation/Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { Assets } from './modules/Upload/Assets'
import { Audio } from './modules/Upload/Audio'
import { SiteInformation } from './modules/Customize/SiteInformation'
import { ContactInformation } from './modules/Customize/ContactInformation'
import { SiteGraphics } from './modules/Customize/SiteGraphics'
import { HelpSection } from './modules/Settings/Help/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [
    Pages,
    Posts,
    Categories,
    // Radio
    Tracks,
    Artists,
    Genres,
    // Uploads
    Media,
    Assets,
    Audio,
    // Settings
    Users,
    HelpSection,
  ],
  globals: [
    // Navigation
    Header,
    Footer,
    // Customize
    SiteGraphics,
    SiteInformation,
    ContactInformation,
    // Settings
  ],
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI,
    },
    // prodMigrations: migrations,
  }),
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
