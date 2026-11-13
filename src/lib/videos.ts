// Video Hosting Abstraction
// Supports YouTube, Vimeo, and custom video URLs
// For demo mode, uses YouTube embeds (free, no API key needed)

export interface VideoProvider {
  name: string;
  getEmbedUrl(url: string): string;
  getThumbnail(url: string): string;
}

export const youtubeProvider: VideoProvider = {
  name: 'youtube',
  getEmbedUrl(url: string) {
    // Convert various YouTube URL formats to embed
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
      /youtube\.com\/shorts\/([^&\s?]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  },
  getThumbnail(url: string) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
      /youtube\.com\/shorts\/([^&\s?]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return '/thumbnails/video-placeholder.jpg';
  },
};

export const vimeoProvider: VideoProvider = {
  name: 'vimeo',
  getEmbedUrl(url: string) {
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match) return `https://player.vimeo.com/video/${match[1]}`;
    return url;
  },
  getThumbnail(url: string) {
    return '/thumbnails/video-placeholder.jpg';
  },
};

// Free video hosting options (no API key required):
// 1. YouTube - Use embed URLs directly (what we use in demo)
// 2. Vimeo - Free tier available with embed URLs
// 3. Cloudflare Stream - Free tier: 10GB storage, 1000 minutes viewing/month
// 4. Bunny Stream - Pay-as-you-go: $0.005/GB storage, $0.005/GB bandwidth
// 5. Mux - Free tier: limited testing
//
// For production, you can:
// 1. Store video URLs in the database
// 2. Use the provider abstraction to render embeds
// 3. Swap providers by changing the configuration
// 4. Add authentication/authorization for premium content

export const videoProviders = {
  youtube: youtubeProvider,
  vimeo: vimeoProvider,
};

export function getVideoProvider(url: string): VideoProvider {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return youtubeProvider;
  if (url.includes('vimeo.com')) return vimeoProvider;
  return youtubeProvider; // Default to YouTube provider
}

export function getEmbedUrl(url: string): string {
  return getVideoProvider(url).getEmbedUrl(url);
}

export function getVideoThumbnail(url: string): string {
  return getVideoProvider(url).getThumbnail(url);
}
