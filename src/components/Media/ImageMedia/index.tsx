'use client'

import type { StaticImageData } from 'next/image'

import { cn } from 'src/utilities/cn'
import NextImage from 'next/image'
import React, { useState } from 'react'

import type { MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getClientSideURL } from '@/utilities/getURL'
import { Skeleton } from '@/components/ui/skeleton'
// import { playButtonBgBlurred } from './base64'

const { breakpoints } = cssVariables

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    objectFit = 'cover',
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      filename: fullFilename,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    src = `${getClientSideURL()}${url}`
  }

  const loading = loadingFromProps || 'lazy'

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  const [isLoading, setIsLoading] = useState(true)

  return (
    <picture>
      <NextImage
        alt={alt || ''}
        fill={fill}
        // placeholder="blur"
        // blurDataURL={placeholderBlur}
        // blurDataURL={playButtonBgBlurred}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          imgClassName,
          'transition-opacity duration-300 ease-in-out',
          isLoading
            ? 'opacity-0' // Start fully transparent
            : 'opacity-100', // Fade to fully visible
        )}
        style={{ objectFit }}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && <Skeleton className="absolute inset-0" />}
    </picture>
  )
}
