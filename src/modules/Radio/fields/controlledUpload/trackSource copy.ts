// import type { Field } from 'payload'

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
