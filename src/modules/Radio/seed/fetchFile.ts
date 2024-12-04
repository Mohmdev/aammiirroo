import type { File } from 'payload'
import path from 'path'
import fs from 'fs'

// Helper to fetch files from URLs
export async function fetchImageByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}

// Helper to read local images
export const fetchLocalImage = async (filepath: string): Promise<File> => {
  // Resolve path relative to the artists.ts file location
  const basePath = path.join(__dirname, 'img')
  const fullPath = path.join(basePath, path.basename(filepath))
  const buffer = await fs.promises.readFile(fullPath)
  const filename = path.basename(filepath)
  const ext = path.extname(filepath).substring(1)
  const stats = await fs.promises.stat(fullPath)

  return {
    name: filename, // Added name property
    data: buffer,
    mimetype: `image/${ext}`, // Changed mimeType to mimetype
    size: stats.size, // Added size property
  }
}
