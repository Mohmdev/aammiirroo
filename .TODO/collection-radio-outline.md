Let me outline a strategic approach for developing the `Radio` collection for a music artist platform.

## Strategy for Radio Collection

### 1. Core Structure

```typescript
{
  slug: 'radio',
  fields: [
    // Base metadata
    title: string
    artist: relationship to users/artists
    releaseDate: date
    description: richText

    // Music Source (Union field)
    source: {
      type: 'radio' | 'upload' | 'external'
      // Different fields based on type
    }

    // Categorization
    genre: relationship
    mood: relationship
    tags: array
}
```

### 2. Source Types Implementation

1. **Internal Upload**

- Direct S3 storage through Media collection
- Audio file formats (MP3, WAV, etc.)
- Track metadata (duration, bitrate)

2. **External Platforms**

- Embedded players support:
  - SoundCloud oEmbed
  - YouTube Music/Videos
  - Spotify
  - Beatport
  - Bandcamp
- Link validation & metadata scraping

### 3. Feature Layers

1. **Content Organization**

- Playlists/Albums grouping
- Genre taxonomy
- Mood/vibe tagging
- Release scheduling

2. **Playback Features**

- Unified player interface
- Queue management
- Continuous playback
- Mobile optimization

3. **Social Elements**

- Like/Save tracks
- Share functionality
- Comment system
- Play count tracking

4. **Artist Controls**

- Release management
- Analytics dashboard
- Audience insights
- Geographic distribution

This can be implemented iteratively, starting with core upload functionality and expanding to external sources and advanced features.
