import React from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/new-york/context-menu'
import { PlusCircle } from 'lucide-react'
import { cn } from '@/utilities/cn'

export const ContextMenuRadio = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className={cn('w-40', className)}>
        <RadioContextContent />
      </ContextMenuContent>
    </ContextMenu>
  )
}

const RadioContextContent = () => {
  return (
    <>
      <ContextMenuItem>Add to Library</ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          <ContextMenuItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Playlist
          </ContextMenuItem>
          <ContextMenuSeparator />
          {playlists.map((playlist) => (
            <ContextMenuItem key={playlist}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
              </svg>
              {playlist}
            </ContextMenuItem>
          ))}
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuItem>Play Next</ContextMenuItem>
      <ContextMenuItem>Play Later</ContextMenuItem>
      <ContextMenuItem>Create Station</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>Like</ContextMenuItem>
      <ContextMenuItem>Share</ContextMenuItem>
    </>
  )
}

const playlists = [
  'Recently Added',
  'Recently Played',
  'Top Songs',
  'Top Albums',
  'Top Artists',
  'Logic Discography',
  'Bedtime Beats',
  'Feeling Happy',
  'I miss Y2K Pop',
  'Runtober',
  'Mellow Days',
  'Eminem Essentials',
]
