import type { Track } from '@/payload-types'

export const tracks: Partial<Track>[] = [
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
      releaseDate: '2023-07-15',
      description: 'A melodic techno track with a euphoric energy.',
    },
    sourceType: 'spotify',
    trackLink: 'https://open.spotify.com/track/123abc',
    image: null,
  },
  {
    id: 2,
    title: 'Neural Collapse',
    slug: 'neural-collapse',
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
    trackLink: 'https://soundcloud.com/track/456def',
    image: null,
  },
  {
    id: 3,
    title: 'Afterlife',
    slug: 'afterlife',
    type: 'track',
    artist: [3], // Assume 3 maps to ARTBAT
    genres: [2], // Assume 2 maps to Melodic Techno
    properties: {
      bpm: 126,
      key: 'F',
      duration: 460,
    },
    generalDetails: {
      recordLabel: 'Afterlife',
      releaseDate: '2021-06-20',
      description: 'A melodic techno track with a haunting atmosphere.',
    },
    sourceType: 'youtube',
    trackLink: 'https://youtube.com/watch?v=789ghi',
    image: null,
  },
  {
    id: 4,
    title: 'Eclipse',
    slug: 'eclipse',
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
    sourceType: 'spotify',
    trackLink: 'https://open.spotify.com/track/987jkl',
    image: null,
  },
  {
    id: 5,
    title: 'Pulse',
    slug: 'pulse',
    type: 'track',
    artist: [1], // Assume 5 maps to Enrico Sangiuliano
    genres: [4],
    properties: {
      bpm: 132,
      key: 'E',
      duration: 450,
    },
    generalDetails: {
      recordLabel: 'Terminal M',
      releaseDate: '2020-09-30',
      description: 'A hypnotic track with a raw, driving energy.',
    },
    sourceType: 'soundcloud',
    trackLink: 'https://soundcloud.com/track/654mno',
    image: null,
  },
  {
    id: 6,
    title: 'Stratosphere',
    slug: 'stratosphere',
    type: 'track',
    artist: [5], // Assume 5 maps to Enrico Sangiuliano
    genres: [1],
    properties: {
      bpm: 128,
      key: 'A#',
      duration: 415,
    },
    generalDetails: {
      recordLabel: 'Drumcode',
      releaseDate: '2019-03-12',
      description: 'A spacey techno journey with intricate textures.',
    },
    sourceType: 'beatport',
    trackLink: 'https://www.beatport.com/track/654mno',
    image: null,
  },
  {
    id: 7,
    title: 'Genesis',
    slug: 'genesis',
    type: 'set',
    artist: [1], // Assume 6 maps to Amelie Lens
    genres: [5],
    properties: {
      bpm: 127,
      key: 'A',
      duration: 44440,
    },
    generalDetails: {
      recordLabel: 'Lenske',
      releaseDate: '2022-01-15',
      description: 'A high-energy techno set with a driving bassline.',
    },
    sourceType: 'soundcloud',
    trackLink: 'https://soundcloud.com/track/321abc',
    image: null,
  },
  {
    id: 8,
    title: 'Reverie',
    slug: 'reverie',
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
    trackLink: 'https://soundcloud.com/track/987stu',
    image: null,
  },
  {
    id: 9,
    title: 'Dreamstate',
    slug: 'dreamstate',
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
    trackLink: 'https://soundcloud.com/track/987stu',
    image: null,
  },
  {
    id: 10,
    title: 'Momentum',
    slug: 'momentum',
    type: 'track',
    artist: [8], // Assume 8 maps to Reinier Zonneveld
    genres: [1],
    properties: {
      bpm: 129,
      key: 'B',
      duration: 410,
    },
    generalDetails: {
      recordLabel: 'Filth on Acid',
      releaseDate: '2020-12-10',
      description: 'A hard-hitting techno track with a driving bassline.',
    },
    sourceType: 'soundcloud',
    trackLink: 'https://soundcloud.com/track/987stu',
    image: null,
  },
]
