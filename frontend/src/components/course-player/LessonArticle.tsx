'use client'

import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { Copy, Check } from 'lucide-react'
import { Lesson } from '@/types/course'

interface LessonArticleProps {
  lesson: Lesson
}

export const LessonArticle = ({ lesson }: LessonArticleProps) => {
  // Add copy functionality for code blocks
  const addCopyButtons = () => {
    const codeBlocks = document.querySelectorAll('.markdown-content pre')
    codeBlocks.forEach((block) => {
      // Remove existing copy button if any
      const existingButton = block.querySelector('.copy-button')
      if (existingButton) existingButton.remove()
      
      // Create copy button with Lucide icons
      const copyButton = document.createElement('button')
      copyButton.className = 'copy-button'
      copyButton.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      `
      copyButton.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        background: transparent;
        color: #cbd5e1;
        border: none;
        border-radius: 6px;
        padding: 8px;
        cursor: pointer;
        transition: all 0.2s;
        z-index: 10;
        opacity: 0.6;
        display: flex;
        align-items: center;
        justify-content: center;
      `
      
      copyButton.addEventListener('click', () => {
        const code = block.querySelector('code')?.textContent || ''
        navigator.clipboard.writeText(code).then(() => {
          copyButton.innerHTML = `
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          `
          copyButton.style.color = '#10b981'
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            `
            copyButton.style.color = '#cbd5e1'
          }, 2000)
        })
      })
      
      copyButton.addEventListener('mouseenter', () => {
        copyButton.style.opacity = '1'
        copyButton.style.color = '#60a5fa'
        copyButton.style.transform = 'scale(1.05)'
      })
      
      copyButton.addEventListener('mouseleave', () => {
        copyButton.style.opacity = '0.6'
        copyButton.style.color = '#cbd5e1'
        copyButton.style.transform = 'scale(1)'
      })
      
      block.appendChild(copyButton)
    })
  }

  // Add copy buttons after component mounts and when lesson changes
  useEffect(() => {
    const timer = setTimeout(() => {
      addCopyButtons()
    }, 100) // Small delay to ensure DOM is ready
    
    return () => clearTimeout(timer)
  }, [lesson.articleContent])

  return (
    <div className="bg-background">
      {lesson.articleContent ? (
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Beautiful CSS for markdown elements */}
          <style jsx global>{`            
            .markdown-content {
              font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              direction: rtl;
              text-align: right;
              line-height: 1.8;
            }
            
            /* Headers */
            .markdown-content h1 {
              font-size: 2.5rem;
              font-weight: 700;
              margin: 3rem 0 2rem 0;
              color: #111827;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 1rem;
            }
            
            .markdown-content h2 {
              font-size: 1.875rem;
              font-weight: 600;
              margin: 2.5rem 0 1.5rem 0;
              color: #1f2937;
            }
            
            .markdown-content h3 {
              font-size: 1.5rem;
              font-weight: 500;
              margin: 2rem 0 1rem 0;
              color: #e2e8f0; /* Much lighter, closer to white */
            }
            
            /* Paragraphs */
            .markdown-content p {
              font-size: 1.125rem;
              margin-bottom: 1.5rem;
              color: #e2e8f0 !important; /* Much lighter, closer to white */
              line-height: 1.8;
            }
            
            /* Beautiful Lists with custom bullets */
            .markdown-content ul, .markdown-content ol {
              margin: 1.5rem 0;
              padding-right: 1.5rem;
              list-style: none;
            }
            
            .markdown-content ul li {
              position: relative;
              margin-bottom: 0.75rem;
              color: #e2e8f0 !important; /* Much lighter, closer to white */
              line-height: 1.7;
              padding-right: 1.5rem;
            }
            
            /* Custom bullet points */
            .markdown-content ul li::before {
              content: "•";
              position: absolute;
              right: 0;
              top: 0;
              color: #3b82f6;
              font-weight: bold;
              font-size: 1.2em;
              line-height: 1.4;
            }
            
            /* Ordered list styling */
            .markdown-content ol {
              counter-reset: list-counter;
            }
            
            .markdown-content ol li {
              position: relative;
              margin-bottom: 0.75rem;
              color: #e2e8f0 !important; /* Much lighter, closer to white */
              line-height: 1.7;
              padding-right: 2rem;
              counter-increment: list-counter;
            }
            
            /* Custom numbers */
            .markdown-content ol li::before {
              content: counter(list-counter) ".";
              position: absolute;
              right: 0;
              top: 0;
              color: #3b82f6;
              font-weight: bold;
              font-size: 1em;
              line-height: 1.7;
              min-width: 1.5rem;
            }
            
                        /* Custom QAcart Code Blocks - Clean & Modern */
            .markdown-content pre {
              direction: ltr !important;
              text-align: left !important;
              background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
              border-radius: 12px;
              padding: 1.5rem 1.5rem 1.5rem 1.5rem;
              margin: 2rem 0;
              overflow-x: auto;
              font-size: 0.9rem;
              line-height: 1.6;
              position: relative;
              box-shadow: 
                0 10px 30px rgba(0, 0, 0, 0.3),
                0 4px 15px rgba(59, 130, 246, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
            
            /* Code blocks now use JavaScript copy buttons */
            
            /* Code text styling */
            .markdown-content pre code {
              color: #f8fafc !important;
              background: none !important;
              font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace !important;
              font-weight: 500;
            }
            
            /* Custom Syntax Highlighting Colors */
            .markdown-content pre .hljs-comment {
              color: #94a3b8 !important;
              font-style: italic !important;
            }
            
            .markdown-content pre .hljs-keyword {
              color: #60a5fa !important;
              font-weight: 600 !important;
            }
            
            .markdown-content pre .hljs-string {
              color: #34d399 !important;
            }
            
            .markdown-content pre .hljs-number {
              color: #fbbf24 !important;
            }
            
            .markdown-content pre .hljs-function {
              color: #a78bfa !important;
              font-weight: 600 !important;
            }
            
            .markdown-content pre .hljs-variable {
              color: #fb7185 !important;
            }
            
            .markdown-content pre .hljs-operator {
              color: #fde047 !important;
            }
            
            .markdown-content pre .hljs-built_in {
              color: #06b6d4 !important;
            }
            
            /* Language-Specific Optimizations */
            
            /* Java Specific */
            .markdown-content pre .hljs-meta {
              color: #f59e0b !important; /* Orange for @annotations */
            }
            
            .markdown-content pre .hljs-type {
              color: #60a5fa !important; /* Blue for class names */
              font-weight: 600 !important;
            }
            
            /* Python Specific */
            .markdown-content pre .hljs-decorator {
              color: #f59e0b !important; /* Orange for @decorators */
            }
            
            .markdown-content pre .hljs-params {
              color: #fb7185 !important; /* Rose for parameters */
            }
            
            /* JavaScript/TypeScript Specific */
            .markdown-content pre .hljs-attr {
              color: #34d399 !important; /* Green for object attributes */
            }
            
            .markdown-content pre .hljs-property {
              color: #06b6d4 !important; /* Cyan for properties */
            }
            
            .markdown-content pre .hljs-title {
              color: #a78bfa !important; /* Purple for function/method names */
              font-weight: 600 !important;
            }
            
            /* Shell/Bash Specific */
            .markdown-content pre .hljs-literal {
              color: #fbbf24 !important; /* Amber for true/false/null */
            }
            
            .markdown-content pre .hljs-symbol {
              color: #10b981 !important; /* Emerald for symbols */
            }
            
            /* Enhanced readability for all languages */
            .markdown-content pre .hljs-punctuation {
              color: #cbd5e1 !important; /* Light gray for brackets, semicolons */
            }
            
            .markdown-content pre .hljs-tag {
              color: #60a5fa !important; /* Blue for HTML tags if needed */
            }
            
            /* QAcart Brand Color Palette for Syntax - Suppress unused selector warnings */
            /* noinspection CssUnusedSymbol */
            .markdown-content pre,
            .markdown-content pre {
              color: #64748b !important; /* Muted gray for comments */
              font-style: italic !important;
            }
            
            .markdown-content pre,
            .markdown-content pre,
            .markdown-content pre {
              color: #60a5fa !important; /* Primary blue - your brand color */
              font-weight: 600 !important;
            }
            
            .markdown-content pre,
            .markdown-content pre {
              color: #34d399 !important; /* Emerald green - fresh and modern */
            }
            
            .markdown-content pre,
            .markdown-content pre {
              color: #fbbf24 !important; /* Warm amber - easy on eyes */
            }
            
            .markdown-content pre,
            .markdown-content pre {
              color: #a78bfa !important; /* Soft purple - elegant */
            }
            
            .markdown-content pre,
            .markdown-content pre {
              color: #fb7185 !important; /* Rose pink - distinctive */
            }
            
            .markdown-content pre,
            .markdown-content pre {
              color: #38bdf8 !important; /* Sky blue - tech feel */
            }
            
            .markdown-content pre,
            .markdown-content pre {
              color: #cbd5e1 !important; /* Light gray for operators */
            }
            
            .markdown-content pre,
            .markdown-content pre {
              color: #f472b6 !important; /* Hot pink for meta */
            }
            
            /* Special styling for bash/shell commands */
            .markdown-content pre[class*="language-bash"],
            .markdown-content pre[class*="language-shell"] {
              color: #10b981 !important; /* Green for bash comments */
            }
            
            .markdown-content pre[class*="language-bash"],
            .markdown-content pre[class*="language-shell"] {
              color: #06b6d4 !important; /* Cyan for bash commands */
            }
            
            /* JavaScript specific styling */
            .markdown-content pre[class*="language-javascript"]{
              color: #8b5cf6 !important; /* Purple for JS keywords */
            }
            
            .markdown-content pre[class*="language-javascript"] {
              color: #f59e0b !important; /* Orange for JS functions */
            }
            
            /* Inline code */
            .markdown-content code {
              background: #f1f5f9;
              color: #1e293b;
              padding: 0.25rem 0.5rem;
              border-radius: 0.375rem;
              font-size: 0.875rem;
              font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
              border: 1px solid #e2e8f0;
            }
            
            .markdown-content pre code {
              background: none;
              border: none;
              padding: 0;
              color: inherit;
            }
            
            /* Tables */
            .markdown-content table {
              width: 100%;
              border-collapse: collapse;
              border-radius: 0.75rem;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
              direction: rtl;
            }
            
            .markdown-content th {
              background: #f8fafc;
              padding: 1rem 1.5rem;
              text-align: right;
              font-weight: 600;
              color: #374151;
              
            }
            
            .markdown-content td {
              padding: 1rem 1.5rem;
              text-align: right;
              color: #6b7280;
              border-bottom: 1px solid #f3f4f6;
            }
            
            .markdown-content tr:hover {
              background: #f9fafb;
            }
            
            /* Links - Softer blue color */
            .markdown-content a {
              color: #64748b;
              text-decoration: underline;
              text-decoration-thickness: 1px;
              text-underline-offset: 2px;
              transition: all 0.2s;
            }
            
            .markdown-content a:hover {
              color: #3b82f6;
              text-decoration-thickness: 2px;
            }
            
            /* Beautiful Blockquotes matching code blocks */
            .markdown-content blockquote {
              margin: 1.5rem 0;
              padding: 1.5rem;
              border-radius: 1rem;
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%) !important;
              border: 1px solid rgba(59, 130, 246, 0.3);
              position: relative;
              overflow: hidden;
              box-shadow: 
                0 20px 25px -5px rgba(0, 0, 0, 0.3), 
                0 10px 10px -5px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(59, 130, 246, 0.1);
              color: #f1f5f9 !important;
            }
            
            /* Add subtle glow effect like code blocks */
            .markdown-content blockquote::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
              border-radius: 1rem;
              pointer-events: none;
            }
            
            /* Left accent border for different types */
            .markdown-content blockquote::after {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              width: 4px;
              height: 100%;
              background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
              border-radius: 0 1rem 1rem 0;
            }
            
            /* Style the emoji and bold text */
            .markdown-content blockquote strong {
              color: #60a5fa !important;
              font-weight: 600;
            }
            
            /* Style regular blockquote text */
            .markdown-content blockquote p {
              color: #cbd5e1 !important;
              margin: 0;
              line-height: 1.6;
            }
            
            /* Horizontal rule */
            .markdown-content hr {
              border: none;
              height: 1px;
              background: linear-gradient(to left, transparent, #d1d5db, transparent);
              margin: 3rem 0;
            }
            
            /* Strong and emphasis */
            .markdown-content strong {
              font-weight: 600;
              color: #3b82f6; /* Brand blue color for better visibility */
            }
            
            .markdown-content em {
              font-style: italic;
              color: #6366f1; /* Slightly different blue for emphasis */
            }
            
            /* Dark mode support */
            @media (prefers-color-scheme: dark) {
              .markdown-content h1, .markdown-content h2, .markdown-content h3 {
                color: #f9fafb;
              }
              
              .markdown-content p, .markdown-content li {
                color: #d1d5db;
              }
              
              .markdown-content strong {
                color: #60a5fa; /* Lighter brand blue for dark mode */
              }
              
              .markdown-content em {
                color: #818cf8; /* Lighter indigo for dark mode */
              }
              
              .markdown-content pre {
                background: #1f2937;
                border-color: #374151;
              }
              
              .markdown-content code {
                background: #374151;
                color: #e5e7eb;
                border-color: #4b5563;
              }
              
              .markdown-content th {
                background: #374151;
                color: #d1d5db;
                border-color: #4b5563;
              }
              
              .markdown-content td {
                color: #9ca3af;
                border-color: #374151;
              }
              
              .markdown-content tr:hover {
                background: #1f2937;
              }
              
              /* Dark mode blockquotes - keep the same beautiful dark styling */
              .markdown-content blockquote {
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%) !important;
                color: #f1f5f9 !important;
                border-color: rgba(59, 130, 246, 0.4);
              }
              
              .markdown-content blockquote strong {
                color: #93c5fd !important;
              }
              
              .markdown-content blockquote p {
                color: #e2e8f0 !important;
              }
            }
          `}</style>

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
                  <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
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
