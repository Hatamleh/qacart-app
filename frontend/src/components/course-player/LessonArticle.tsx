'use client'

import { Lesson } from '@/types/course'

interface LessonArticleProps {
  lesson: Lesson
}

export const LessonArticle = ({ lesson }: LessonArticleProps) => {
  // Beautiful markdown rendering with consistent typography
  const renderContent = (content: string) => {
    return content
      // Headers with consistent font family and spacing
      .replace(/^# (.+$)/gm, '<h1 class="text-4xl font-bold mb-8 mt-12 text-gray-900 dark:text-gray-100 leading-tight border-b-2 border-gray-200 dark:border-gray-700 pb-4">$1</h1>')
      .replace(/^## (.+$)/gm, '<h2 class="text-2xl font-semibold mb-6 mt-10 text-gray-800 dark:text-gray-200 leading-tight">$2</h2>')
      .replace(/^### (.+$)/gm, '<h3 class="text-xl font-medium mb-4 mt-8 text-gray-700 dark:text-gray-300 leading-tight">$3</h3>')
      
      // Code blocks with beautiful syntax highlighting
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
        // Apply syntax highlighting based on language
        let highlightedCode = code
          // Comments (green)
          .replace(/(\/\/.*$|#.*$)/gm, '<span style="color: #10b981;">$1</span>')
          // Strings (yellow/amber)
          .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span style="color: #f59e0b;">$1$2$3</span>')
          // Keywords (blue)
          .replace(/\b(describe|test|it|expect|function|const|let|var|if|else|for|while|return|import|export|from|class|extends|async|await|npm|install)\b/g, '<span style="color: #3b82f6; font-weight: 600;">$1</span>')
          // Methods and functions (purple)
          .replace(/\b(\w+)(\()/g, '<span style="color: #8b5cf6;">$1</span>$2')
          // Numbers (orange)
          .replace(/\b(\d+)\b/g, '<span style="color: #f97316;">$1</span>')
          // Boolean values (red)
          .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #ef4444;">$1</span>')
        
        return `<div class="code-block-wrapper mb-6" dir="ltr">
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
            <div class="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400">
              ${language || 'code'}
            </div>
            <pre class="p-6 overflow-x-auto font-mono text-sm leading-relaxed bg-white dark:bg-gray-900">
              <code class="text-gray-800 dark:text-gray-200" dir="ltr">${highlightedCode}</code>
            </pre>
          </div>
        </div>`
      })
      
      // Beautiful RTL tables
      .replace(/\|(.+)\|\n\|(-+\|?)+\|\n((\|.+\|\n?)*)/g, (match, header, separator, rows) => {
        const headerCells = header.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell).map((cell: string) => `<th class="px-6 py-4 text-right font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" dir="rtl">${cell}</th>`).join('')
        const rowCells = rows.trim().split('\n').map((row: string) => {
          const cells = row.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell).map((cell: string) => `<td class="px-6 py-4 text-right text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800" dir="rtl">${cell}</td>`).join('')
          return `<tr class="hover:bg-gray-25 dark:hover:bg-gray-900/50 transition-colors">${cells}</tr>`
        }).join('')
        return `<div class="table-wrapper mb-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm" dir="rtl"><table class="w-full" dir="rtl"><thead>${headerCells}</thead><tbody>${rowCells}</tbody></table></div>`
      })
      
      // Enhanced callouts with better design
      .replace(/^> \*\*(💡|⚠️|ℹ️|❌|✅) (.+?)\*\*: (.+$)/gm, (match, icon, type, content) => {
        const styles = {
          '💡': 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
          '⚠️': 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100',
          'ℹ️': 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-100',
          '❌': 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
          '✅': 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
        }
        const styleClass = styles[icon as keyof typeof styles] || styles['ℹ️']
        return `<div class="callout ${styleClass} border-r-4 rounded-r-xl p-6 mb-6 shadow-sm"><div class="flex items-center gap-3 font-semibold mb-2 text-lg">${icon} ${type}</div><div class="leading-relaxed">${content}</div></div>`
      })
      
      // Beautiful links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors font-medium" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Enhanced lists
      .replace(/^- (.+$)/gm, '<li class="mb-2 text-gray-700 dark:text-gray-300 leading-relaxed">$1</li>')
      .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-none mb-6 space-y-2 mr-6">$&</ul>')
      .replace(/^(\d+)\. (.+$)/gm, '<li class="mb-2 text-gray-700 dark:text-gray-300 leading-relaxed">$2</li>')
      .replace(/(<li.*<\/li>\n?)+/g, '<ol class="list-none counter-reset-item mb-6 space-y-2 mr-6">$&</ol>')
      
      // Text formatting with consistent colors
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-sm font-mono border border-gray-200 dark:border-gray-700">$1</code>')
      
      // Elegant horizontal rule
      .replace(/^---$/gm, '<hr class="border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-12">')
      
      // Paragraphs with proper spacing and readability
      .replace(/\n\n/g, '</p><p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">')
      .replace(/^(?!<[h123olul]|<\/p>|<pre|<table|<div|<hr)(.+$)/gm, '<p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">$1</p>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="bg-background">
      {lesson.articleContent ? (
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Custom CSS for beautiful RTL lists */}
          <style jsx>{`
            .article-content ul li {
              position: relative;
              padding-right: 1.5rem;
              text-align: right;
              direction: rtl;
            }
            .article-content ul li::before {
              content: "•";
              color: #3b82f6;
              font-weight: bold;
              position: absolute;
              right: 0;
              top: 0;
            }
            .article-content ol {
              counter-reset: item;
              direction: rtl;
              text-align: right;
            }
            .article-content ol li {
              position: relative;
              padding-right: 2rem;
              counter-increment: item;
              text-align: right;
              direction: rtl;
            }
            .article-content ol li::before {
              content: counter(item) ".";
              color: #3b82f6;
              font-weight: bold;
              position: absolute;
              right: 0;
              top: 0;
            }
            .article-content {
              font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              direction: rtl;
              text-align: right;
            }
            .article-content code {
              direction: ltr;
              text-align: left;
              font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Consolas', monospace;
            }
            .article-content pre {
              direction: ltr;
              text-align: left;
            }
            .article-content table {
              direction: rtl;
              text-align: right;
            }
          `}</style>
          
          {/* Article Content with Beautiful RTL Typography */}
          <article 
            className="article-content prose prose-lg max-w-none"
            dir="rtl"
            style={{
              lineHeight: '1.8',
              fontFamily: 'Cairo, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              textAlign: 'right'
            }}
            dangerouslySetInnerHTML={{ 
              __html: renderContent(lesson.articleContent)
            }}
          />
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
