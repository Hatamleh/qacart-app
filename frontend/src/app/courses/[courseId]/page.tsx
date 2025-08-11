import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CourseHeader } from '@/components/course-detail/CourseHeader'
import { CourseInfo } from '@/components/course-detail/CourseInfo'
import { CourseLessons } from '@/components/course-detail/CourseLessons'

// Dummy course data
const COURSE_DATA = {
    id: 1,
    title: 'أساسيات اختبار البرمجيات',
    shortDescription: 'تعلم المفاهيم الأساسية لاختبار البرمجيات وأفضل الممارسات في الصناعة',
    tags: ['يدوي', 'مبتدئ'],
    promoVideoUrl: 'https://example.com/promo-video.mp4',
    videoThumbnail: 'https://picsum.photos/800/450?random=1',
    instructor: {
        name: 'Hatem Hatamleh',
        image: 'https://picsum.photos/200/200?random=2'
    },
    lastUpdated: '15 نوفمبر 2024',
    learningPoints: [
        'فهم أساسيات اختبار البرمجيات ومفاهيمه الأساسية',
        'تعلم أنواع الاختبارات المختلفة (وحدة، تكامل، نظام)',
        'إتقان كتابة test cases فعالة ومفصلة',
        'تطبيق استراتيجيات اختبار مختلفة حسب نوع المشروع',
        'استخدام أدوات إدارة الاختبارات الشائعة',
        'فهم دورة حياة تطوير البرمجيات وأهمية الاختبار فيها'
    ],
    lessons: [
        { id: 1, lessonOrder: 1, title: 'مقدمة في اختبار البرمجيات', duration: '25 دقيقة', isFree: true },
        { id: 2, lessonOrder: 2, title: 'أنواع الاختبارات الأساسية', duration: '30 دقيقة', isFree: true },
        { id: 3, lessonOrder: 3, title: 'كتابة Test Cases الفعالة', duration: '45 دقيقة', isFree: true },
        { id: 4, lessonOrder: 4, title: 'اختبار الوحدة Unit Testing', duration: '35 دقيقة', isFree: false },
        { id: 5, lessonOrder: 5, title: 'اختبار التكامل Integration Testing', duration: '40 دقيقة', isFree: false },
        { id: 6, lessonOrder: 6, title: 'اختبار النظام System Testing', duration: '50 دقيقة', isFree: false },
        { id: 7, lessonOrder: 7, title: 'إدارة العيوب Bug Management', duration: '30 دقيقة', isFree: false },
        { id: 8, lessonOrder: 8, title: 'أدوات إدارة الاختبارات', duration: '35 دقيقة', isFree: false },
        { id: 9, lessonOrder: 9, title: 'مشروع عملي شامل', duration: '60 دقيقة', isFree: false },
    ]
}

interface CoursePageProps {
  params: Promise<{
    courseId: string
  }>
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params
  
  return {
    title: `${COURSE_DATA.title} - QAcart`,
    description: COURSE_DATA.shortDescription,
    keywords: ['دورة', 'اختبار البرمجيات', COURSE_DATA.title, `courseId-${courseId}`],
    openGraph: {
      title: `${COURSE_DATA.title} - QAcart`,
      description: COURSE_DATA.shortDescription,
      type: 'website',
      locale: 'ar_SA',
      images: [
        {
          url: COURSE_DATA.videoThumbnail,
          width: 800,
          height: 450,
          alt: COURSE_DATA.title,
        },
      ],
    },
  }
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { courseId } = await params
  
  // Log courseId for development purposes
  console.log('Course ID:', courseId)

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Navigation */}
      <Navbar />

      {/* Course Header */}
      <CourseHeader 
        course={COURSE_DATA}
      />

      {/* Course Information */}
      <CourseInfo course={COURSE_DATA} />

      {/* Course Lessons */}
      <CourseLessons 
        lessons={COURSE_DATA.lessons}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}