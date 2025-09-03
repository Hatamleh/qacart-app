'use client'

import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { Lesson } from '@/types'
import './LessonArticle.css'

interface LessonArticleProps {
  lesson: Lesson
  noTopPadding?: boolean
}

export const LessonArticle = ({ lesson, noTopPadding = false }: LessonArticleProps) => {
  // Add copy functionality for code blocks
  const addCopyButtons = () => {
    const codeBlocks = document.querySelectorAll('.markdown-content pre')
    codeBlocks.forEach((block) => {
      // Remove the existing copy button if any
      const existingButton = block.querySelector('.copy-button')
      if (existingButton) existingButton.remove()

      // Create a copy button
      const copyButton = document.createElement('button')
      copyButton.className = 'copy-button'
      copyButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      `

      // Add click handler
      copyButton.addEventListener('click', async () => {
        const code = block.querySelector('code')
        if (code) {
          try {
            await navigator.clipboard.writeText(code.textContent || '')
            copyButton.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            `
            copyButton.style.color = '#10b981'
            setTimeout(() => {
              copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                </svg>
              `
              copyButton.style.color = '#cbd5e1'
            }, 2000)
          } catch (err) {
            console.error('Failed to copy code: ', err)
          }
        }
      })

      block.appendChild(copyButton)
    })
  }

  useEffect(() => {
    // Add copy buttons after markdown is rendered
    const timer = setTimeout(() => {
      addCopyButtons()
    }, 100)

    return () => clearTimeout(timer)
  }, [lesson.articleContent])

  return (
    <div className={`w-full ${noTopPadding ? '' : 'pt-8'}`}>
      {lesson.articleContent ? (
        <div className="prose prose-lg max-w-none">
          {/* ReactMarkdown with plugins */}
          <div className="markdown-content" dir="rtl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                // Custom components for special elements
                pre: ({ children, ...props }) => (
                  <pre {...props} dir="ltr" style={{ textAlign: 'left' }}>
                    {children}
                  </pre>
                ),
                code: ({ children, className, ...props }) => {
                  const isInline = !className
                  return (
                    <code
                      {...props}
                      className={className}
                      dir={isInline ? 'ltr' : undefined}
                      style={isInline ? { direction: 'ltr' } : undefined}
                    >
                      {children}
                    </code>
                  )
                },
                table: ({ children, ...props }) => (
                  <div className="overflow-hidden rounded-xl border border-border shadow-sm mb-8">
                    <table {...props} dir="rtl">
                      {children}
                    </table>
                  </div>
                )
              }}
            >
              {lesson.articleContent}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center text-muted-foreground">
            <div className="text-lg mb-2">لا يوجد محتوى مكتوب لهذا الدرس</div>
            <div className="text-sm">سيتم إضافة المحتوى قريباً</div>
          </div>
        </div>
      )}
    </div>
  )
}
