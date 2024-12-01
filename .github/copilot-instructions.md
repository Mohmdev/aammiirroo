# PayloadCMS Developer Instructions

This guide is for developers focusing on content management development with PayloadCMS in this project. Before proceeding, review:

1. [Technical Analysis](./technical-analysis.md) - Project overview and architecture
2. [CMS Guide](./cms-guide.md) - Core CMS concepts and implementation with detailed examples and field configurations.

## Development Workflow

### 1. Collection Development

Create new collections in

collections

:

```typescript
// collections/CustomCollection.ts
import { CollectionConfig } from 'payload'

export const CustomCollection: CollectionConfig = {
  slug: 'custom-collection',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status'],
  },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  versions: {
    drafts: true,
  },
  fields: [
    // Fields configuration
  ],
}
```

### 2. Field Configuration Priority

When developing fields, implement in this order:

1. Core content fields (required data)
2. SEO metadata fields
3. Media/relationship fields
4. Layout builder blocks
5. Custom admin UI components

### 3. Layout Builder Development

Add new blocks in

blocks

:

```typescript
// blocks/NewBlock/config.ts
export const NewBlock: Block = {
  slug: 'new-block',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
  // React component for admin preview
  admin: {
    components: {
      Field: CustomFieldComponent,
    },
  },
}
```

### 4. Admin UI Customization

1. Custom field components in

fields

2. Admin components in `src/admin/components/`
3. Dashboard modifications via `admin` config in `payload.config.ts`

### 5. Access Control Implementation

Follow the pattern:

```typescript
{
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: isAdmin
  }
}
```

## Best Practices

1. **Version Control**

   - Keep collections in separate files
   - Group related fields in field configs
   - Document complex access patterns

2. **Performance**

   - Use `depth` parameter judiciously in relationships
   - Implement proper indexing on searchable fields
   - Configure appropriate image sizes in Media collection

3. **Testing**

   - Test access control thoroughly
   - Verify hooks with different user roles
   - Check relationship field constraints

4. **Documentation**
   - Document custom field types
   - Maintain type definitions
   - Comment complex access patterns

## Development Commands

```bash
pnpm generate:types    # Update TypeScript types
pnpm migrate:create    # Create new migration
pnpm payload          # Access Payload CLI
```

## Key Files to Know

```
src/
├── collections/       # Collection definitions
├── blocks/           # Layout builder blocks
├── fields/           # Reusable field configs
├── access/           # Access control functions
├── hooks/            # Collection hooks
└── payload.config.ts # Main configuration
```
