import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { GlobalConfig } from 'payload'
import { revalidateSiteInfo } from './hooks/revalidateSiteInfo'

export const SiteInformation: GlobalConfig = {
  slug: 'site-information',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Customize',
  },
  hooks: {
    afterChange: [revalidateSiteInfo],
  },
  fields: [
    {
      name: 'basics',
      type: 'group',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
        },
        {
          name: 'siteDescription',
          type: 'textarea',
          required: true,
        },
        {
          name: 'primaryColor',
          type: 'text',
          defaultValue: '#000000',
          admin: {
            description: 'Primary brand color (hex)',
          },
        },
        {
          name: 'secondaryColor',
          type: 'text',
          defaultValue: '#FFFFFF',
          admin: {
            description: 'Secondary brand color (hex)',
          },
        },
      ],
    },
  ],
}
