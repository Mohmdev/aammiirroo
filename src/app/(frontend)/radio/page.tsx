import React, { Suspense } from 'react'
import PageClient from './page.client'
import type { Metadata } from 'next/types'
import { fetchTracks } from '@/utilities/api/tracks/fetchTracks'
import { TrackArchive } from './components/TrackArchive'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const tracksPromise = await fetchTracks()

  return (
    <div className="container h-full">
      <PageClient />
      <TrackArchive tracksPromise={tracksPromise} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Radio`,
  }
}
