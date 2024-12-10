import type { CheckboxField, UploadField } from 'payload'

type ControlledUpload = (fieldToUse?: string, overrides?: Overrides) => [UploadField, CheckboxField]

type Overrides = {
  uploadOverrides?: Partial<UploadField>
  checkboxOverrides?: Partial<CheckboxField>
}

export const controlledUploadField: ControlledUpload = (fieldToUse = 'upload', overrides = {}) => {
  const { uploadOverrides, checkboxOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'uploadLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
    },
    ...checkboxOverrides,
  }

  // @ts-expect-error
  const controlledUploadField: UploadField = {
    name: 'internal',
    type: 'upload',
    relationTo: 'audio',
    label: 'Wanna upload?',
    ...(uploadOverrides || {}),
    hooks: {
      //
    },
    admin: {
      ...(uploadOverrides?.admin || {}),
      components: {
        Field: {
          path: '@/modules/Radio/fields/controlledUploadComponent#ControlledUploadComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  }

  return [controlledUploadField, checkBoxField]
}

// export const trackSourceField: Field = {
//   name: 'source',
//   label: false,
//   type: 'group',
//   admin: {
//     //
//   },
//   fields: [
//     //
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'enableInternalControl', // Control field
//           label: false,
//           type: 'checkbox',
//           defaultValue: false,
//           virtual: true,
//           admin: {
//             hidden: true,
//           },
//         },
//         {
//           name: 'internal',
//           type: 'upload',
//           relationTo: 'audio',
//           admin: {
//             components: {
//               Field: {
//                 path: '@/modules/Radio/fields/TrackSourceComponent#TrackSourceComponent',
//                 clientProps: {
//                   controlFieldPath: 'enableInternalControl',
//                 },
//               },
//             },
//             condition: (data) => Boolean(data?.enableInternalControl),
//           },
//         },
//       ],
//     },
//   ],
// }
