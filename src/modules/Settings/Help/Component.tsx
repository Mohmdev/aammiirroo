import React from 'react'
import { HelpComponent } from './components'
import type { ServerSideEditViewProps } from 'payload'

export const HelpSection: React.FC<ServerSideEditViewProps> = () => {
  return (
    <>
      <HelpComponent />
    </>
  )
}
