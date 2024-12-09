import React from 'react'
import PageClient from './page.client'
import type { Metadata } from 'next/types'
import { TracksArchive } from '../../../modules/Radio/templates/TracksArchive'

// `force-static` prevents loading state
// use `force-dynamic` to show loading state
export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  return (
    <div className="container h-full">
      <PageClient />
      <TracksArchive />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Radio`,
  }
}
