import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateContactInfo } from './hooks/revalidateContactInfo'

export const ContactInformation: GlobalConfig = {
  slug: 'contact-information',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Customize',
    description: 'Contact details and social media links',
  },
  hooks: {
    afterChange: [revalidateContactInfo],
  },
  fields: [
    {
      name: 'contactDetails',
      type: 'group',
      fields: [
        {
          name: 'contactName',
          label: 'Contact Name',
          type: 'text',
        },
        {
          name: 'contactEmail',
          label: 'Email Address',
          type: 'email',
        },
        {
          name: 'contactPhone',
          label: 'Phone Number',
          type: 'text',
          validate: (val) => {
            if (val && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(val)) {
              return 'Please enter a valid phone number'
            }
            return true
          },
        },
        {
          name: 'contactAddress',
          label: 'Address',
          type: 'textarea',
        },
      ],
    },
    {
      // name: 'musicPlatforms',
      type: 'tabs',
      tabs: [
        {
          label: 'Music Platforms',
          fields: [
            {
              name: 'soundcloud',
              label: 'SoundCloud',
              type: 'text',
              admin: {
                placeholder: 'https://soundcloud.com/...',
              },
            },
            {
              name: 'beatport',
              label: 'Beatport',
              type: 'text',
              admin: {
                placeholder: 'https://www.beatport.com/artist/...',
              },
            },
            {
              name: 'spotify',
              label: 'Spotify',
              type: 'text',
              admin: {
                placeholder: 'https://open.spotify.com/artist/...',
              },
            },
            {
              name: 'bandcamp',
              label: 'Bandcamp',
              type: 'text',
              admin: {
                placeholder: 'https://[artist].bandcamp.com',
              },
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'facebook',
              label: 'Facebook',
              type: 'text',
              admin: {
                placeholder: 'https://facebook.com/...',
              },
            },
            {
              name: 'twitter',
              label: 'Twitter',
              type: 'text',
              admin: {
                placeholder: 'https://twitter.com/...',
              },
            },
            {
              name: 'instagram',
              label: 'Instagram',
              type: 'text',
              admin: {
                placeholder: 'https://instagram.com/...',
              },
            },
            {
              name: 'linkedin',
              label: 'LinkedIn',
              type: 'text',
              admin: {
                placeholder: 'https://linkedin.com/in/...',
              },
            },
            {
              name: 'youtube',
              label: 'YouTube',
              type: 'text',
              admin: {
                placeholder: 'https://youtube.com/c/...',
              },
            },
            {
              name: 'whatsapp',
              label: 'WhatsApp',
              type: 'text',
              admin: {
                placeholder: 'WhatsApp number with country code',
              },
            },
            {
              name: 'telegram',
              label: 'Telegram',
              type: 'text',
              admin: {
                placeholder: 'https://t.me/...',
              },
            },
          ],
        },
      ],
    },
  ],
}
