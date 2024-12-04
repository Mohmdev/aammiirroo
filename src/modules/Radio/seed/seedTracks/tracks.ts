type CreateTrackInput = {
  id: number
  title: string
  slug: string
  type: 'track' | 'set' | null | undefined
  artist: number[]
  genres: number[]
  properties?: {
    bpm?: number
    key?:
      | 'C#'
      | 'D'
      | 'F'
      | 'G'
      | 'E'
      | 'A#'
      | 'A'
      | 'D#'
      | 'G#'
      | 'B'
      | 'C'
      | 'F#'
      | null
      | undefined
    duration?: number
  }
  generalDetails?: {
    recordLabel?: string
    releaseDate?: string
    description?: string
  }
  sourceType:
    | 'soundcloud'
    | 'bandcamp'
    | 'internal'
    | 'youtube'
    | 'spotify'
    | 'beatport'
    | null
    | undefined
  trackLink: string
  image?: number | string | null | undefined
}

export const tracks: CreateTrackInput[] = [
  {
    id: 1,
    title: 'Aurora',
    slug: 'aurora',
    type: 'track',
    artist: [1], // Assume 1 maps to Alex Stein
    genres: [1],
    properties: {
      bpm: 128,
      key: 'C#',
      duration: 420,
    },
    generalDetails: {
      recordLabel: 'Drumcode',
      releaseDate: '2017-07-15',
      description: 'A melodic techno track with a euphoric energy.',
    },
    sourceType: 'soundcloud',
    trackLink:
      'https://soundcloud.com/alex_stein/aurora?si=8de02f44d27244ffa190f3b831d92e69&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    image:
      'https://res.cloudinary.com/mohmdevcloud/image/upload/v1733303209/aammiiroo/artists/icjcdbarpfp0uwyy5alk.jpg',
  },
  {
    id: 2,
    title: 'Touch The Darkness',
    slug: 'touch-the-darkness',
    type: 'track',
    artist: [2], // Assume 2 maps to Victor Ruiz
    genres: [4, 3],
    properties: {
      bpm: 130,
      key: 'D',
      duration: 390,
    },
    generalDetails: {
      recordLabel: 'Filth on Acid',
      releaseDate: '2022-11-12',
      description: 'A dark, driving techno track with a relentless energy.',
    },
    sourceType: 'soundcloud',
    trackLink:
      'https://soundcloud.com/victorruiz/touch-the-darkness?si=cd2c04050e1841308df37082c7158b5c&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    image:
      'https://res.cloudinary.com/mohmdevcloud/image/upload/v1733344465/touch-the-darkness_edec8v.jpg',
  },
  {
    id: 3,
    title: 'Bondinho Pão de Açúcar in Rio de Janeiro, Brazil',
    slug: 'bondinho-pao-de-acucar-in-rio-de-janeiro-brazil',
    type: 'set',
    artist: [3], // Assume 3 maps to ARTBAT
    genres: [2], // Assume 2 maps to Melodic Techno
    properties: {
      bpm: 126,
      key: 'F',
      duration: 46000,
    },
    generalDetails: {
      recordLabel: 'CERCLE',
      releaseDate: '2021-06-20',
      description: 'A melodic techno track with a haunting atmosphere.',
    },
    sourceType: 'soundcloud',
    trackLink:
      'https://soundcloud.com/artbatmusic/artbat-cercle-2019-bondinho-pao-de-acucar-in-rio-de-janeiro-brazil?si=fce98c2fd13d4c17a8dc7f9bd203d4fb&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    image:
      'https://res.cloudinary.com/mohmdevcloud/image/upload/v1733344969/bondinho-pao-de-acucar-in-rio-de-janeiro-brazil_balh2p.jpg',
  },
  {
    id: 4,
    title: 'Selected By',
    slug: 'selected-by',
    type: 'track',
    artist: [4], // Assume 4 maps to Charlotte de Witte
    genres: [1],
    properties: {
      bpm: 129,
      key: 'G',
      duration: 400,
    },
    generalDetails: {
      recordLabel: 'KNTXT',
      releaseDate: '2023-02-01',
      description: 'A dark, driving techno track with a relentless energy.',
    },
    sourceType: 'soundcloud',
    trackLink:
      'https://soundcloud.com/charlottedewittemusic/sets/selected-by?si=c7759e6ba31f48fa8d253cef443797e8&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    image:
      'https://res.cloudinary.com/mohmdevcloud/image/upload/v1733303206/aammiiroo/artists/ytjk4seprq0kbwf19mvt.jpg',
  },
  {
    id: 5,
    title: 'The Chant - Drumcode - DC303',
    slug: 'the-chant-drumcode-dc303',
    type: 'track',
    artist: [1], // Assume 5 maps to alex stein
    genres: [4],
    properties: {
      bpm: 132,
      key: 'E',
      duration: 450,
    },
    generalDetails: {
      recordLabel: 'DRUMECODE',
      releaseDate: '2024-09-30',
      description: 'A hypnotic track with a raw, driving energy.',
    },
    sourceType: 'soundcloud',
    trackLink:
      'https://soundcloud.com/drumcode/alex-stein-the-chant-drumcode-dc303?si=bdccd8cbaf3c4e49a504727b02e3abc8&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    image:
      'https://res.cloudinary.com/mohmdevcloud/image/upload/v1733344658/the-chant-drumcode-dc303_zlwfjn.jpg',
  },
  {
    id: 6,
    title: 'closing Kappa FuturFestival 2023',
    slug: 'closing-kappa-futurfestival-2023',
    type: 'set',
    artist: [5], // Assume 5 maps to Enrico Sangiuliano
    genres: [1],
    properties: {
      bpm: 128,
      key: 'A#',
      duration: 5400,
    },
    generalDetails: {
      recordLabel: 'Drumcode',
      releaseDate: '2019-03-12',
      description: 'A spacey techno journey with intricate textures.',
    },
    sourceType: 'soundcloud',
    trackLink:
      'https://soundcloud.com/enricosangiuliano/enrico-sangiuliano-closing-kappa-futurfestival-2023?si=2fce9b0993984686932aea589c4b2d9d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    image:
      'https://res.cloudinary.com/mohmdevcloud/image/upload/v1733343594/closing-kappa-futurfestival-2023_ukvfys.jpg',
  },
  {
    id: 7,
    title: 'Alex Stein @ Atmosphere Stage - Tomorrowland 2023',
    slug: 'alex-stein-atmosphere-stage-tomorrowland-2023',
    type: 'set',
    artist: [1],
    genres: [5],
    properties: {
      bpm: 127,
      key: 'A',
      duration: 44440,
    },
    generalDetails: {
      recordLabel: 'Lenske',
      releaseDate: '2023-01-15',
      description: 'A high-energy techno set with a driving bassline.',
    },
    sourceType: 'soundcloud',
    trackLink:
      'https://soundcloud.com/alex_stein/alex-stein-atmosphere-stage-tomorrowland-2023?si=bb17dc6e74cd441aa221f15c805308ec&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    image:
      'https://res.cloudinary.com/mohmdevcloud/image/upload/v1733344157/alex-stein-atmosphere-stage-tomorrowland-2023_t7kxsh.jpg',
  },
  {
    id: 8,
    title: 'Falling For You (Radio Edit)',
    slug: 'falling-for-you-radio-edit',
    type: 'track',
    artist: [6], // Assume 6 maps to Amelie Lens
    genres: [3],
    properties: {
      bpm: 127,
      key: 'D#',
      duration: 430,
    },
    generalDetails: {
      recordLabel: 'Lenske',
      releaseDate: '2022-05-25',
      description: 'A hypnotic track with layered melodies.',
    },
    sourceType: 'soundcloud',
    trackLink:
      'https://soundcloud.com/amelielens/amelie-lens-falling-for-you-radio-edit?si=9be980826fad418e977e43306203a19e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    image:
      'https://res.cloudinary.com/mohmdevcloud/image/upload/v1733343174/falling-for-you-radio-edit_upmqfq.jpg',
  },
  {
    id: 9,
    title: 'Caribou - Cant Do Without You (Tale Of Us & Mano Le Tough Remix)',
    slug: 'caribou',
    type: 'track',
    artist: [7], // Assume 7 maps to Tale of Us
    genres: [2],
    properties: {
      bpm: 125,
      key: 'G#',
      duration: 425,
    },
    generalDetails: {
      recordLabel: 'Afterlife',
      releaseDate: '2021-11-08',
      description: 'A cinematic, emotional journey in techno.',
    },
    sourceType: 'soundcloud',
    trackLink:
      'https://soundcloud.com/taleofus/caribou-cant-do-without-you-tale-of-us-mano-le-tough-remix?si=1274eed224eb4a418b71a5817d090ef3&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    image: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1733342966/caribou_jeoo54.jpg',
  },
  {
    id: 10,
    title: 'Glitch In Time',
    slug: 'glitch-in-time',
    type: 'track',
    artist: [8], // Assume 8 maps to Reinier Zonneveld
    genres: [1],
    properties: {
      bpm: 129,
      key: 'B',
      duration: 410,
    },
    generalDetails: {
      recordLabel: 'Glitch In Time EP',
      releaseDate: '2023-10-27',
      description: 'A hard-hitting techno track with a driving bassline.',
    },
    sourceType: 'bandcamp',
    trackLink: 'https://enricosangiuliano.bandcamp.com/track/glitch-in-time',
    image:
      'https://res.cloudinary.com/mohmdevcloud/image/upload/v1733342657/glitch-in-time_emuzo4.jpg',
  },
]
