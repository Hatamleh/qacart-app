'use client'

import { useState } from 'react'
import { Play, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/Button'

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
  thumbnail
}: VimeoPlayerProps) => {
  const [showPlayer, setShowPlayer] = useState(true) // Always show player
  const [isLoading, setIsLoading] = useState(false)

  // Clean Vimeo embed URL with your brand color
  const vimeoEmbedUrl = `https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&title=0&byline=0&portrait=0&color=5D5FA3&responsive=1`

  const handlePlayClick = () => {
    setShowPlayer(true)
    setIsLoading(true)
    // Hide loading after a reasonable time
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Thumbnail/Preview State */}
      {!showPlayer && (
        <div className="relative">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title || 'Video thumbnail'}
              width={800}
              height={600}
              className="w-full h-96 md:h-[500px] lg:h-[600px] object-cover"
            />
          ) : (
            <div className="w-full h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <Play className="w-16 h-16 text-muted-foreground" />
            </div>
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer">
            <Button
              variant="primary"
              onClick={handlePlayClick}
              className="rounded-full p-6 hover:scale-110 shadow-lg"
              icon={Play}
            >
            </Button>
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
