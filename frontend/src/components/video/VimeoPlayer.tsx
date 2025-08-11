'use client'

import { useState } from 'react'
import { Play, Loader2 } from 'lucide-react'

interface VimeoPlayerProps {
  vimeoId: string
  title?: string
  className?: string
  autoplay?: boolean
  thumbnail?: string
}

export const VimeoPlayer = ({ 
  vimeoId, 
  title = 'Video', 
  className = '', 
  autoplay = false,
  thumbnail 
}: VimeoPlayerProps) => {
  const [showPlayer, setShowPlayer] = useState(autoplay)
  const [isLoading, setIsLoading] = useState(false)

  // Extract Vimeo ID from URL if full URL is provided
  const extractVimeoId = (url: string): string => {
    if (url.includes('vimeo.com/')) {
      return url.split('/').pop() || url
    }
    return url
  }

  const videoId = extractVimeoId(vimeoId)

  // Clean Vimeo embed URL with your brand color
  const vimeoEmbedUrl = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&title=0&byline=0&portrait=0&color=5D5FA3&responsive=1`

  const handlePlayClick = () => {
    setShowPlayer(true)
    setIsLoading(true)
    // Hide loading after a reasonable time
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-2xl ${className}`}>
      {/* Thumbnail/Preview State */}
      {!showPlayer && (
        <div className="relative">
          {thumbnail ? (
            <img 
              src={thumbnail}
              alt={title}
              className="w-full h-96 md:h-[500px] lg:h-[600px] object-cover"
            />
          ) : (
            <div className="w-full h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <Play className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer">
            <button
              onClick={handlePlayClick}
              className="bg-primary rounded-full p-6 hover:scale-110 transition-all duration-300 hover:bg-primary/90 shadow-lg"
              aria-label={`تشغيل ${title}`}
            >
              <Play className="w-12 h-12 text-white fill-current" />
            </button>
          </div>
        </div>
      )}

      {/* Vimeo Player */}
      {showPlayer && (
        <div className="relative">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/90 z-10 rounded-xl">
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="text-primary font-medium">جاري التحميل...</span>
              </div>
            </div>
          )}

          {/* Clean Vimeo Iframe */}
          <iframe
            src={vimeoEmbedUrl}
            className="w-full h-96 md:h-[500px] lg:h-[600px]"
            style={{ minHeight: '400px' }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            title={title}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      )}
    </div>
  )
}