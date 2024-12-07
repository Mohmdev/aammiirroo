import React from 'react'
import { draftMode } from 'next/headers'

import { AdminBar } from '@/components/AdminBar'
import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'

import type { Header } from '@/payload-types'

export async function Header() {
  const { isEnabled } = await draftMode()

  const header: Header = await getCachedGlobal('header', 1)()

  return (
    <header className="h-max">
      <AdminBar adminBarProps={{ preview: isEnabled }} />
      <HeaderClient
        header={header}
        //  logoUrl={logoUrl}
        //  className={className}
      />
    </header>
  )
}
