import type { Artist, Media } from '@/payload-types'

export const isMediaObject = (img: Media | number | null | undefined): img is Media => {
  return img !== null && typeof img === 'object'
}
// export const isMediaObject = (img: Media | number | null | undefined): img is Media => {
//   return img !== null && img !== undefined && typeof img !== 'number'
// }

export const isArtistObject = (artist: number | Artist): artist is Artist => {
  return artist !== null && typeof artist === 'object'
}
// export const isArtistObject = (artist: number | Artist): artist is Artist => {
//   return typeof artist !== 'number' && artist !== null
// }
