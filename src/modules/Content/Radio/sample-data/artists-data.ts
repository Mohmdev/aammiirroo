// Sample data for the Artist collection
const artists = [
  {
    name: 'Alex Stein',
    slug: 'alex-stein',
    photo: null, // Placeholder for artist photo
    Tracks: {
      docs: [1, 5, 7], // IDs for related Radio tracks: "Aurora", "Pulse", "Genesis"
      hasNextPage: false,
    },
    bio: 'A renowned techno DJ and producer known for his melodic yet hard-hitting tracks.',
  },
  {
    name: 'Victor Ruiz',
    slug: 'victor-ruiz',
    photo: null,
    Tracks: {
      docs: [2], // ID for the track: "Neural Collapse"
      hasNextPage: false,
    },
    bio: 'A Brazilian techno artist recognized for his powerful and emotional productions.',
  },
  {
    name: 'ARTBAT',
    slug: 'artbat',
    photo: null,
    Tracks: {
      docs: [3], // ID for the track: "Afterlife"
      hasNextPage: false,
    },
    bio: 'Ukrainian duo creating emotive, melodic techno for the global stage.',
  },
  {
    name: 'Charlotte de Witte',
    slug: 'charlotte-de-witte',
    photo: null,
    Tracks: {
      docs: [4], // ID for the track: "Eclipse"
      hasNextPage: false,
    },
    bio: 'A leading figure in the techno scene, known for her hard-hitting tracks and powerful performances.',
  },
  {
    name: 'Enrico Sangiuliano',
    slug: 'enrico-sangiuliano',
    photo: null,
    Tracks: {
      docs: [6], // ID for the track: "Stratosphere"
      hasNextPage: false,
    },
    bio: 'An Italian producer renowned for his expertly crafted and atmospheric techno tracks.',
  },
  {
    name: 'Amelie Lens',
    slug: 'amelie-lens',
    photo: null,
    Tracks: {
      docs: [8], // ID for the track: "Reverie"
      hasNextPage: false,
    },
    bio: 'A Belgian techno artist celebrated for her hypnotic sounds and energetic DJ sets.',
  },
  {
    name: 'Tale of Us',
    slug: 'tale-of-us',
    photo: null,
    Tracks: {
      docs: [9], // ID for the track: "Dreamstate"
      hasNextPage: false,
    },
    bio: 'An Italian duo known for their cinematic and emotional techno compositions.',
  },
  {
    name: 'Reinier Zonneveld',
    slug: 'reinier-zonneveld',
    photo: null,
    Tracks: {
      docs: [10], // ID for the track: "Momentum"
      hasNextPage: false,
    },
    bio: 'A Dutch techno producer famous for his energetic live performances and powerful beats.',
  },
]

export default artists
