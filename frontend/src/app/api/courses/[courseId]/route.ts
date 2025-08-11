import { NextResponse } from 'next/server'
import { Course } from '@/types/course'

// Single dummy course for frontend development (courseId parameter is ignored)
const COURSE: Course = {
  id: 1,
  title: 'أساسيات الاختبار اليدوي',
  shortDescription: 'تعلم أساسيات اختبار البرمجيات اليدوي وأفضل الممارسات في الصناعة',
  promoVideoUrl: 'https://example.com/promo-manual-testing.mp4',
  videoThumbnail: 'https://picsum.photos/800/450?random=1',
  instructor: {
    name: 'حاتم حتامله',
    image: 'https://picsum.photos/200/200?random=instructor'
  },
  lastUpdated: '15 نوفمبر 2024',
  type: 'manual',
  durationInMinutes: 350,
  studentsCount: 250,
  tags: ['يدوي', 'مبتدئ'],
  learningGoals: [
    'فهم أساسيات اختبار البرمجيات ومفاهيمه الأساسية',
    'تعلم أنواع الاختبارات المختلفة (وحدة، تكامل، نظام)',
    'إتقان كتابة Test Cases فعالة ومفصلة',
    'تطبيق استراتيجيات اختبار مختلفة حسب نوع المشروع',
    'فهم وإدارة دورة حياة العيوب والأخطاء',
    'استخدام أدوات إدارة الاختبارات الشائعة'
  ],
  lessons: [
    {
      id: 1,
      lessonOrder: 1,
      title: 'مقدمة في اختبار البرمجيات',
      durationInMinutes: 25,
      isFree: true,
      videoUrl: 'https://example.com/lesson-1.mp4',
      articleContent: '# مقدمة في اختبار البرمجيات\n\nفي هذا الدرس سنتعلم أساسيات اختبار البرمجيات ومفاهيمه الأساسية...'
    },
    {
      id: 2,
      lessonOrder: 2,
      title: 'أنواع الاختبارات الأساسية',
      durationInMinutes: 30,
      isFree: true,
      videoUrl: 'https://example.com/lesson-2.mp4',
      articleContent: '# أنواع الاختبارات\n\nتعرف على الأنواع المختلفة من الاختبارات وكيفية تطبيقها...'
    },
    {
      id: 3,
      lessonOrder: 3,
      title: 'كتابة Test Cases الفعالة',
      durationInMinutes: 45,
      isFree: true,
      videoUrl: 'https://example.com/lesson-3.mp4',
      articleContent: '# كتابة Test Cases\n\nتعلم كيفية كتابة حالات اختبار فعالة ومفصلة...'
    },
    {
      id: 4,
      lessonOrder: 4,
      title: 'اختبار الوحدة Unit Testing',
      durationInMinutes: 35,
      isFree: false,
      videoUrl: 'https://example.com/lesson-4.mp4',
      articleContent: '# اختبار الوحدة\n\nفهم مبادئ اختبار الوحدة وكيفية تطبيقها...'
    },
    {
      id: 5,
      lessonOrder: 5,
      title: 'اختبار التكامل Integration Testing',
      durationInMinutes: 40,
      isFree: false,
      videoUrl: 'https://example.com/lesson-5.mp4',
      articleContent: '# اختبار التكامل\n\nتعلم كيفية اختبار التكامل بين مكونات النظام...'
    },
    {
      id: 6,
      lessonOrder: 6,
      title: 'اختبار النظام System Testing',
      durationInMinutes: 50,
      isFree: false,
      videoUrl: 'https://example.com/lesson-6.mp4',
      articleContent: '# اختبار النظام\n\nفهم اختبار النظام الشامل والتحقق من المتطلبات...'
    },
    {
      id: 7,
      lessonOrder: 7,
      title: 'إدارة العيوب Bug Management',
      durationInMinutes: 30,
      isFree: false,
      videoUrl: 'https://example.com/lesson-7.mp4',
      articleContent: '# إدارة العيوب\n\nكيفية اكتشاف وتوثيق وتتبع العيوب في البرمجيات...'
    },
    {
      id: 8,
      lessonOrder: 8,
      title: 'أدوات إدارة الاختبارات',
      durationInMinutes: 35,
      isFree: false,
      videoUrl: 'https://example.com/lesson-8.mp4',
      articleContent: '# أدوات إدارة الاختبارات\n\nتعرف على أشهر أدوات إدارة الاختبارات...'
    },
    {
      id: 9,
      lessonOrder: 9,
      title: 'مشروع عملي شامل',
      durationInMinutes: 60,
      isFree: false,
      videoUrl: 'https://example.com/lesson-9.mp4',
      articleContent: '# المشروع العملي\n\nطبق كل ما تعلمته في مشروع عملي حقيقي...'
    }
  ]
}

// GET /api/courses/[courseId] - Returns the single dummy course (courseId is ignored)
export async function GET() {
  try {
    return NextResponse.json(COURSE)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}