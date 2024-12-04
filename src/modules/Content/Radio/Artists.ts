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
    defaultColumns: ['photo', 'name', 'Tracks', 'SoundCloud', 'Beatport'],
  },
  defaultPopulate: {
    name: true,
    slug: true,
    photo: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
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
              name: 'bio',
              type: 'textarea',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'SoundCloud',
                  label: 'SoundCloud',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'Beatport',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'Spotify',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'Bandcamp',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'YouTube',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'facebook',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'twitter',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'instagram',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'website',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
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
