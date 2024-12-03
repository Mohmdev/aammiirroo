## Join field

The Join Field is used to make Relationship and Upload fields available in the opposite direction. With a Join you can edit and view collections having reference to a specific collection document. The field itself acts as a virtual field, in that no new data is stored on the collection with a Join field. Instead, the Admin UI surfaces the related documents for a better editing experience and is surfaced by Payload's APIs.

The Join field is useful in scenarios including:

- To surface Orders for a given Product
- To view and edit Posts belonging to a Category
- To work with any bi-directional relationship data
- Displaying where a document or upload is used in other documents

For the Join field to work, you must have an existing relationship or upload field in the collection you are joining. This will reference the collection and path of the field of the related documents. To add a Relationship Field, set the type to join in your Field Config:

```ts
import type { Field } from 'payload'

export const MyJoinField: Field = {
  name: 'relatedPosts',
  type: 'join',
  collection: 'posts',
  on: 'category',
}

// relationship field in another collection:
export const MyRelationshipField: Field = {
  name: 'category',
  type: 'relationship',
  relationTo: 'categories',
}
```

In this example, the field is defined to show the related posts when added to a category collection. The on property is used to specify the relationship field name of the field that relates to the collection document.

With this example, if you navigate to a Category in the Admin UI or an API response, you'll now see that the Posts which are related to the Category are populated for you. This is extremely powerful and can be used to define a wide variety of relationship types in an easy manner.
