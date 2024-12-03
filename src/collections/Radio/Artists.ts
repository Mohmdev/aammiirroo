import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Artists: CollectionConfig = {
  slug: 'artists',
  labels: {
    singular: 'Artist',
    plural: 'Artists',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Radio',
    useAsTitle: 'name',
    defaultColumns: ['photo', 'name', 'tracks', 'website'],
  },
  defaultPopulate: {
    name: true,
    slug: true,
    photo: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: {
            width: '70%',
          },
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '30%',
          },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        // Tracks
        {
          label: 'Tracks',
          fields: [
            {
              name: 'Tracks',
              type: 'join',
              collection: 'radio',
              on: 'artist',
            },
          ],
        },
        // Details
        {
          label: 'Meta',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'bio',
                  type: 'textarea',
                  admin: {
                    width: '60%',
                  },
                },
                {
                  name: 'platforms',
                  label: '',
                  type: 'group',
                  admin: {
                    width: '40%',
                  },
                  fields: [
                    {
                      name: 'SoundCloud',
                      type: 'text',
                    },
                    {
                      name: 'Beatport',
                      type: 'text',
                    },
                    {
                      name: 'Spotify',
                      type: 'text',
                    },
                    {
                      name: 'Bandcamp',
                      type: 'text',
                    },
                    {
                      name: 'YouTube',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              type: 'row',
              admin: {
                width: '50%',
              },
              fields: [
                {
                  name: 'website',
                  type: 'text',
                },
                {
                  name: 'instagram',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              admin: {
                width: '50%',
              },
              fields: [
                {
                  name: 'twitter',
                  type: 'text',
                },
                {
                  name: 'facebook',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    ...slugField(),
  ],
}
