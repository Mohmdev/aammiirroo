import type { CollectionConfig } from 'payload'

export const HelpSection: CollectionConfig = {
  slug: 'help',
  labels: {
    singular: 'Help',
    plural: 'Help',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
    components: {
      views: {
        list: {
          Component: '@/modules/Settings/Help/Component#HelpSection',
          actions: undefined,
        },
      },
    },
  },
  // Dummy field (will be hidden in the admin UI)
  fields: [
    {
      name: 'needHelp',
      label: 'Need help?',
      type: 'richText',
      admin: {
        description: 'Got any question or need help? Write it here.',
        hidden: true,
      },
    },
  ],
}
