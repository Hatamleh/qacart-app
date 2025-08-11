import { NextResponse } from 'next/server'
import { Course } from '@/types/course'

// Single dummy course for frontend development (courseId parameter is ignored)
const COURSE: Course = {
  id: 1,
  title: 'أساسيات الاختبار اليدوي',
  shortDescription: 'تعلم أساسيات اختبار البرمجيات اليدوي وأفضل الممارسات في الصناعة',
  promoVideoUrl: '1085509305',
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
      articleContent: `# مقدمة في اختبار البرمجيات

في هذا الدرس سنتعلم **أساسيات اختبار البرمجيات** ومفاهيمه الأساسية. سنتناول أهمية الاختبار في دورة تطوير البرمجيات وأنواع الاختبارات المختلفة.

## لماذا اختبار البرمجيات مهم؟

اختبار البرمجيات يساعد في:

- **ضمان الجودة** والتأكد من عمل البرنامج بشكل صحيح
- **اكتشاف الأخطاء** قبل وصول البرنامج للمستخدمين
- **توفير الوقت والمال** بتجنب إصلاح الأخطاء في مراحل متأخرة
- **بناء الثقة** في المنتج النهائي

## مبادئ الاختبار الأساسية

### 1. الاختبار يظهر وجود العيوب

الاختبار يمكنه أن يثبت **وجود** العيوب، لكن لا يمكنه إثبات **عدم وجودها**.

> **💡 نصيحة مهمة**: الهدف من الاختبار هو العثور على أكبر عدد من العيوب وليس إثبات خلو البرنامج منها

### 2. الاختبار الشامل مستحيل

من المستحيل اختبار جميع المدخلات والحالات المحتملة.

> **⚠️ تحذير**: ركز على **المناطق عالية المخاطر** بدلاً من محاولة اختبار كل شيء

## أنواع الاختبارات

### اختبارات وظيفية (Functional Testing)

| نوع الاختبار | الوصف | متى نستخدمه |
|-------------|-------|-------------|
| **Unit Testing** | اختبار الوحدات الفردية | أثناء التطوير |
| **Integration Testing** | اختبار التكامل بين الوحدات | بعد دمج الوحدات |
| **System Testing** | اختبار النظام كاملاً | قبل التسليم |
| **Acceptance Testing** | اختبار قبول المستخدم | قبل الإطلاق |

### اختبارات غير وظيفية (Non-Functional Testing)

- **Performance Testing** - اختبار الأداء
- **Security Testing** - اختبار الأمان  
- **Usability Testing** - اختبار سهولة الاستخدام
- **Compatibility Testing** - اختبار التوافق

## دورة حياة الاختبار

\`\`\`mermaid
graph TD
    A[التخطيط] --> B[التصميم]
    B --> C[التنفيذ]
    C --> D[التشغيل]
    D --> E[التقرير]
    E --> F[الإغلاق]
\`\`\`

### 1. مرحلة التخطيط

\`\`\`bash
# Important questions in planning phase
# What are the testing objectives?
# What resources are required?
# What is the timeline?
# What are the quality criteria?
\`\`\`

### 2. مرحلة التصميم

في هذه المرحلة نقوم بـ:

1. **كتابة حالات الاختبار** (Test Cases)
2. **إعداد بيانات الاختبار** (Test Data)
3. **تحضير بيئة الاختبار** (Test Environment)

> **✅ أفضل الممارسات**: اكتب حالات اختبار واضحة ومحددة مع خطوات مفصلة

### 3. مرحلة التنفيذ

\`\`\`javascript
// Example of a simple test case
describe('User Login', () => {
  test('should allow login with valid credentials', () => {
    // Test Steps
    // 1. Open login page
    // 2. Enter username
    // 3. Enter password
    // 4. Click login button
    
    // Expected Result
    expect(user.isLoggedIn).toBe(true);
  });
});
\`\`\`

## أدوات الاختبار الشائعة

### أدوات اختبار يدوي

- **Jira** - إدارة المشاريع وتتبع العيوب
- **TestRail** - إدارة حالات الاختبار
- **Zephyr** - إدارة دورة حياة الاختبار

### أدوات الاختبار الآلي

\`\`\`bash
# Examples of automation testing tools

# For frontend testing
npm install selenium-webdriver
npm install playwright
npm install cypress

# For API testing
npm install supertest
npm install newman
\`\`\`

> **ℹ️ معلومة**: اختر الأداة المناسبة حسب نوع التطبيق ومتطلبات المشروع

## تحديات الاختبار الشائعة

### التحديات التقنية

- **بيئات اختبار غير مستقرة**
- **بيانات اختبار غير كافية**  
- **تغييرات متكررة في المتطلبات**

### التحديات الإدارية

- **ضغط الوقت**
- **نقص الموارد**
- **التواصل بين الفرق**

> **❌ خطأ شائع**: البدء في الاختبار متأخراً في دورة التطوير

## الخطوات التالية

الآن وبعد فهم أساسيات اختبار البرمجيات، يمكنك:

1. **دراسة أنواع الاختبارات بالتفصيل** - [الدرس التالي](https://example.com/lesson-2)
2. **تعلم كتابة حالات اختبار فعالة** - [دليل شامل](https://example.com/test-cases)
3. **التدرب على أدوات الاختبار** - ابدأ بأداة بسيطة
4. **انضم لمجتمعات الاختبار** - تواصل مع خبراء المجال

---

**المراجع المفيدة:**
- [ISTQB Foundation Level](https://www.istqb.org/)
- [دليل اختبار البرمجيات الشامل](https://example.com/testing-guide)
- [أفضل ممارسات الاختبار](https://example.com/best-practices)`
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