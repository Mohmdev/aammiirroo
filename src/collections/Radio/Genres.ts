import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Genres: CollectionConfig = {
  slug: 'genres',
  labels: {
    singular: 'Genre',
    plural: 'Genres',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Radio',
    useAsTitle: 'title',
    defaultColumns: ['title', 'tracks', 'description'],
  },
  defaultPopulate: {
    title: true,
    slug: true,
    description: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'Tracks',
      type: 'join',
      collection: 'radio',
      on: 'genres',
    },
    ...slugField(),
    {
      name: 'description',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Genres
