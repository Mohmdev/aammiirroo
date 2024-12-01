# PayloadCMS Content Management Guide

## Core Content Structure

The CMS is built around two main content types:

### 1. Collections (Dynamic Content)

```typescript
// payload.config.ts
export default buildConfig({
  collections: [Pages, Posts, Categories, Users, Media, Assets],
  globals: [
    /*...*/
  ],
})
```

#### Key Collections:

- **Pages**: Layout-builder enabled pages
- **Posts**: Blog/article content with drafts
- **Media**: Asset management for images/files
- **Categories**: Content taxonomy/organization
- **Users**: Authentication and access control

### 2. Globals (Site-wide Settings)

```typescript
// Example Global Config
export const SiteInfo: GlobalConfig = {
  slug: 'site-info',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
    },
  ],
}
```

## Content Creation Features

### 1. Layout Builder

Uses block-based content creation:

```typescript
// pages/index.ts
fields: [
  {
    name: 'layout',
    type: 'blocks',
    blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
  },
]
```

### 2. Draft System

Implemented using Payload Versions:

```typescript
// collections/Posts.ts
versions: {
  drafts: {
    autosave: {
      interval: 100
    }
  },
  maxPerDoc: 50
}
```

### 3. Field Types

Common field configurations:

```typescript
fields: [
  // Rich Text Editor
  {
    name: 'content',
    type: 'richText',
    editor: lexicalEditor({
      features: [
        /*...*/
      ],
    }),
  },

  // Media/Asset Relations
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },

  // References
  {
    name: 'categories',
    type: 'relationship',
    relationTo: 'categories',
    hasMany: true,
  },
]
```

## Development Workflow

1. **Define Collection**:

```typescript
// collections/CustomContent.ts
import { CollectionConfig } from 'payload'

export const CustomContent: CollectionConfig = {
  slug: 'custom-content',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
```

2. **Add to Payload Config**:

```typescript
// payload.config.ts
import { CustomContent } from './collections/CustomContent'

export default buildConfig({
  collections: [
    CustomContent,
    // ... other collections
  ],
})
```

3. **Access Content in Frontend**:

```typescript
// app/page.tsx
async function getContent() {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'custom-content',
    depth: 2,
    where: {
      status: {
        equals: 'published',
      },
    },
  })
  return result.docs
}
```

## Key Concepts to Remember

1. **Access Control**
   - Define per-collection and per-field
   - Use

authenticated

for admin-only

- Use

authenticatedOrPublished

for public content

2. **Relations**
   - Use `relationship` fields for references
   - Set

hasMany: true

for arrays

- Control depth with `depth` parameter in queries

3. **Media Handling**
   - Configured in

Media

collection

- Automatic image resizing
- S3 storage in production

4. **Hooks**

```typescript
hooks: {
  beforeChange: [
    async ({ data }) => {
      // Modify data before save
      return data
    }
  ],
  afterChange: [
    async ({ doc }) => {
      // Perform actions after save
      revalidatePath('/some-path')
    }
  ]
}
```

This setup provides a fully-featured CMS with drafts, media management, and structured content modeling while maintaining type safety and developer experience.
