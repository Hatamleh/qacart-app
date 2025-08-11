import { NextResponse } from 'next/server'
import { Course } from '@/types/course'

// Dummy courses data - will be replaced with real backend calls in the future
const COURSES: Course[] = [
  {
    id: 1,
    title: 'إعداد الجهاز للتطوير',
    shortDescription: 'تعلم كيفية إعداد جهازك للبرمجة والتطوير من الصفر حتى الاحتراف',
    promoVideoUrl: '1085509305',
    videoThumbnail: 'https://picsum.photos/800/450?random=1',
    instructor: {
      name: 'حاتم حتامله',
      image: 'https://picsum.photos/200/200?random=instructor'
    },
    lastUpdated: '15 ديسمبر 2024',
    type: 'manual',
    durationInMinutes: 240,
    studentsCount: 320,
    tags: ['إعداد', 'مبتدئ', 'أدوات التطوير'],
    learningGoals: [
      'فهم متطلبات بيئة التطوير الحديثة',
      'إعداد وتكوين نظام التشغيل للبرمجة',
      'تثبيت وإعداد Git لإدارة المشاريع',
      'اختيار وإعداد IDE المناسب',
      'إدارة البيئات الافتراضية والتبعية',
      'إتقان استخدام Terminal وسطر الأوامر'
    ],
    lessons: [
      {
        id: 101,
        lessonOrder: 1,
        title: 'مقدمة في إعداد بيئة التطوير',
        durationInMinutes: 15,
        isFree: true,
        videoUrl: 'https://example.com/lesson-101.mp4',
        articleContent: `# مقدمة في إعداد بيئة التطوير

في هذا الدرس سنتعلم **أساسيات إعداد بيئة التطوير** الحديثة للبرمجة والاختبار. سنتناول جميع الأدوات والتقنيات المطلوبة لبناء بيئة عمل فعالة ومنتجة.

## لماذا إعداد بيئة التطوير مهم؟

إعداد بيئة التطوير بشكل صحيح يوفر لك:

- **كفاءة أعلى** في العمل
- **أدوات قوية** للتطوير والاختبار  
- **تجربة تطوير سلسة** ومريحة
- **إدارة أفضل** للمشاريع والكود

## متطلبات النظام

قبل أن نبدأ، تأكد من أن جهازك يلبي المتطلبات التالية:

### الحد الأدنى من المتطلبات:
- **المعالج**: Intel i5 أو AMD Ryzen 5
- **الذاكرة**: 8 جيجابايت RAM
- **التخزين**: 256 جيجابايت SSD
- **نظام التشغيل**: Windows 10/11, macOS 10.15+, أو Ubuntu 20.04+

### المتطلبات المُوصى بها:
- **المعالج**: Intel i7 أو AMD Ryzen 7
- **الذاكرة**: 16 جيجابايت RAM أو أكثر
- **التخزين**: 512 جيجابايت SSD أو أكثر

## الأدوات الأساسية

### 1. محرر النصوص / IDE

اختر واحد من هذه المحررات المشهورة:

\`\`\`bash
# تثبيت Visual Studio Code
# Windows
winget install Microsoft.VisualStudioCode

# macOS  
brew install --cask visual-studio-code

# Ubuntu
sudo snap install code --classic
\`\`\`

### 2. نظام إدارة الإصدارات Git

\`\`\`bash
# تثبيت Git
# Windows
winget install Git.Git

# macOS
brew install git

# Ubuntu
sudo apt update && sudo apt install git
\`\`\`

**إعداد Git للمرة الأولى:**

\`\`\`bash
git config --global user.name "اسمك هنا"
git config --global user.email "بريدك@example.com"
\`\`\`

## إعداد بيئة Node.js

لتطوير تطبيقات الويب الحديثة، ستحتاج إلى Node.js:

\`\`\`bash
# تثبيت Node.js باستخدام nvm (مُوصى به)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# إعادة تشغيل Terminal ثم تثبيت أحدث إصدار LTS
nvm install --lts
nvm use --lts
\`\`\`

**التحقق من التثبيت:**

\`\`\`bash
node --version
npm --version
\`\`\`

> **💡 نصيحة مهمة**: استخدم دائماً إصدارات LTS من Node.js للمشاريع الإنتاجية

## إضافات VS Code المُوصى بها

إليك قائمة بأهم الإضافات التي ستحتاجها:

| الإضافة | الوصف | رابط التثبيت |
|---------|--------|-------------|
| **Auto Rename Tag** | تغيير تلقائي لوسوم HTML | [تثبيت](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) |
| **Prettier** | تنسيق الكود تلقائياً | [تثبيت](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |
| **ESLint** | فحص أخطاء JavaScript | [تثبيت](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) |
| **GitLens** | أدوات Git متقدمة | [تثبيت](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) |

## إعداد Terminal

### Windows - PowerShell

\`\`\`powershell
# تثبيت Windows Terminal (مُوصى به)
winget install Microsoft.WindowsTerminal

# تثبيت PowerShell 7
winget install Microsoft.PowerShell
\`\`\`

### macOS - iTerm2 + Oh My Zsh

\`\`\`bash
# تثبيت iTerm2
brew install --cask iterm2

# تثبيت Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
\`\`\`

> **⚠️ تحذير**: لا تثبت أدوات من مصادر غير موثوقة. استخدم دائماً المواقع الرسمية للأدوات.

## اختبار البيئة

بعد إتمام الإعداد، دعنا نختبر البيئة بإنشاء مشروع بسيط:

\`\`\`bash
# إنشاء مجلد جديد للمشروع
mkdir test-environment
cd test-environment

# إنشاء ملف package.json
npm init -y

# إنشاء ملف index.js بسيط
echo "console.log('مرحباً! بيئة التطوير جاهزة 🎉');" > index.js

# تشغيل الملف
node index.js
\`\`\`

إذا رأيت الرسالة "مرحباً! بيئة التطوير جاهزة 🎉" فهذا يعني أن إعداد البيئة تم بنجاح!

## الخطوات التالية

الآن وبعد أن أصبحت بيئة التطوير جاهزة، يمكنك:

1. **تعلم Git بشكل أعمق** - [مراجعة دليل Git](https://git-scm.com/doc)
2. **إتقان محرر النصوص** - استكشف اختصارات VS Code
3. **إعداد مشروعك الأول** - ابدأ ببناء تطبيق بسيط
4. **تعلم أدوات الـ DevOps** - Docker, CI/CD

---

**المراجع المفيدة:**
- [وثائق Node.js الرسمية](https://nodejs.org/docs/)
- [دليل Git الشامل](https://git-scm.com/book/en/v2)
- [مرجع VS Code](https://code.visualstudio.com/docs)`
      },
      {
        id: 102,
        lessonOrder: 2,
        title: 'تثبيت نظام التشغيل المناسب',
        durationInMinutes: 25,
        isFree: true,
        videoUrl: 'https://example.com/lesson-102.mp4',
        articleContent: '# تثبيت نظام التشغيل\n\nسنتعلم كيفية اختيار وتثبيت نظام التشغيل المناسب للتطوير...'
      },
      {
        id: 103,
        lessonOrder: 3,
        title: 'تثبيت وإعداد Git',
        durationInMinutes: 30,
        isFree: false,
        videoUrl: 'https://example.com/lesson-103.mp4',
        articleContent: '# تثبيت وإعداد Git\n\nGit هو نظام إدارة الإصدارات الأكثر استخداماً...'
      },
      {
        id: 104,
        lessonOrder: 4,
        title: 'إعداد IDE وأدوات التطوير',
        durationInMinutes: 40,
        isFree: false,
        videoUrl: 'https://example.com/lesson-104.mp4',
        articleContent: '# إعداد IDE\n\nسنتعلم كيفية اختيار وإعداد بيئة التطوير المتكاملة...'
      },
      {
        id: 105,
        lessonOrder: 5,
        title: 'إدارة البيئات الافتراضية',
        durationInMinutes: 35,
        isFree: false,
        videoUrl: 'https://example.com/lesson-105.mp4',
        articleContent: '# إدارة البيئات الافتراضية\n\nتعلم كيفية إنشاء وإدارة البيئات المعزولة للمشاريع...'
      },
      {
        id: 106,
        lessonOrder: 6,
        title: 'أساسيات استخدام Terminal',
        durationInMinutes: 45,
        isFree: false,
        videoUrl: 'https://example.com/lesson-106.mp4',
        articleContent: '# أساسيات Terminal\n\nإتقان استخدام سطر الأوامر ضروري لكل مطور...'
      }
    ]
  },
  {
    id: 2,
    title: 'أساسيات الاختبار اليدوي',
    shortDescription: 'تعلم أساسيات اختبار البرمجيات اليدوي وأفضل الممارسات في الصناعة',
    promoVideoUrl: '1085509305',
    videoThumbnail: 'https://picsum.photos/800/450?random=2',
    instructor: {
      name: 'حاتم حتامله',
      image: 'https://picsum.photos/200/200?random=instructor'
    },
    lastUpdated: '10 ديسمبر 2024',
    type: 'manual',
    durationInMinutes: 480,
    studentsCount: 450,
    tags: ['اختبار يدوي', 'مبتدئ', 'QA'],
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
        id: 201,
        lessonOrder: 1,
        title: 'مقدمة في اختبار البرمجيات',
        durationInMinutes: 20,
        isFree: true,
        videoUrl: 'https://example.com/lesson-201.mp4',
        articleContent: '# مقدمة في اختبار البرمجيات\n\nما هو اختبار البرمجيات ولماذا هو مهم؟'
      },
      {
        id: 202,
        lessonOrder: 2,
        title: 'مفاهيم أساسية في الاختبار',
        durationInMinutes: 25,
        isFree: true,
        videoUrl: 'https://example.com/lesson-202.mp4',
        articleContent: '# المفاهيم الأساسية\n\nسنتعرف على المصطلحات والمفاهيم الأساسية...'
      },
      {
        id: 203,
        lessonOrder: 3,
        title: 'أنواع الاختبارات المختلفة',
        durationInMinutes: 30,
        isFree: true,
        videoUrl: 'https://example.com/lesson-203.mp4',
        articleContent: '# أنواع الاختبارات\n\nتعرف على الأنواع المختلفة من الاختبارات...'
      },
      {
        id: 204,
        lessonOrder: 4,
        title: 'كتابة Test Cases فعالة',
        durationInMinutes: 40,
        isFree: false,
        videoUrl: 'https://example.com/lesson-204.mp4',
        articleContent: '# كتابة Test Cases\n\nتعلم كيفية كتابة حالات اختبار فعالة ومفصلة...'
      },
      {
        id: 205,
        lessonOrder: 5,
        title: 'إدارة العيوب والأخطاء',
        durationInMinutes: 35,
        isFree: false,
        videoUrl: 'https://example.com/lesson-205.mp4',
        articleContent: '# إدارة العيوب\n\nكيفية اكتشاف وتوثيق وتتبع العيوب...'
      },
      {
        id: 206,
        lessonOrder: 6,
        title: 'كتابة تقارير الاختبار',
        durationInMinutes: 30,
        isFree: false,
        videoUrl: 'https://example.com/lesson-206.mp4',
        articleContent: '# تقارير الاختبار\n\nتعلم كيفية كتابة تقارير اختبار شاملة ومفيدة...'
      },
      {
        id: 207,
        lessonOrder: 7,
        title: 'مشروع عملي شامل',
        durationInMinutes: 60,
        isFree: false,
        videoUrl: 'https://example.com/lesson-207.mp4',
        articleContent: '# المشروع العملي\n\nطبق كل ما تعلمته في مشروع عملي حقيقي...'
      }
    ]
  },
  {
    id: 3,
    title: 'Selenium مع Java',
    shortDescription: 'تعلم أتمتة اختبار تطبيقات الويب باستخدام Selenium WebDriver و Java',
    promoVideoUrl: '1085509305',
    videoThumbnail: 'https://picsum.photos/800/450?random=3',
    instructor: {
      name: 'Hatem Hatamleh',
      image: 'https://picsum.photos/200/200?random=instructor'
    },
    lastUpdated: '5 ديسمبر 2024',
    type: 'automation',
    durationInMinutes: 720,
    studentsCount: 280,
    tags: ['Selenium', 'Java', 'أتمتة', 'متوسط'],
    learningGoals: [
      'فهم مفاهيم أتمتة الاختبارات باستخدام Selenium',
      'إعداد بيئة عمل Selenium مع Java من الصفر',
      'تعلم التفاعل مع عناصر الصفحة بطرق مختلفة',
      'إتقان نمط Page Object Model لتنظيم الكود',
      'استخدام TestNG لتنظيم وتشغيل الاختبارات',
      'بناء مشروع اختبار شامل وقابل للصيانة'
    ],
    lessons: [
      {
        id: 301,
        lessonOrder: 1,
        title: 'مقدمة في Selenium WebDriver',
        durationInMinutes: 25,
        isFree: true,
        videoUrl: 'https://example.com/lesson-301.mp4',
        articleContent: '# مقدمة في Selenium\n\nتعرف على Selenium وقدراته في أتمتة الاختبارات...'
      },
      {
        id: 302,
        lessonOrder: 2,
        title: 'إعداد بيئة Selenium مع Java',
        durationInMinutes: 30,
        isFree: true,
        videoUrl: 'https://example.com/lesson-302.mp4',
        articleContent: '# إعداد البيئة\n\nخطوات إعداد Selenium مع Java من الصفر...'
      },
      {
        id: 303,
        lessonOrder: 3,
        title: 'التعامل مع عناصر الصفحة',
        durationInMinutes: 45,
        isFree: false,
        videoUrl: 'https://example.com/lesson-303.mp4',
        articleContent: '# عناصر الصفحة\n\nتعلم كيفية العثور على عناصر الصفحة والتفاعل معها...'
      },
      {
        id: 304,
        lessonOrder: 4,
        title: 'إدارة النوافذ والإطارات',
        durationInMinutes: 40,
        isFree: false,
        videoUrl: 'https://example.com/lesson-304.mp4',
        articleContent: '# النوافذ والإطارات\n\nكيفية التعامل مع النوافذ المتعددة والإطارات...'
      },
      {
        id: 305,
        lessonOrder: 5,
        title: 'Page Object Model',
        durationInMinutes: 50,
        isFree: false,
        videoUrl: 'https://example.com/lesson-305.mp4',
        articleContent: '# Page Object Model\n\nتطبيق نمط Page Object Model لتنظيم الكود...'
      },
      {
        id: 306,
        lessonOrder: 6,
        title: 'التكامل مع TestNG',
        durationInMinutes: 35,
        isFree: false,
        videoUrl: 'https://example.com/lesson-306.mp4',
        articleContent: '# TestNG Framework\n\nاستخدام TestNG لتنظيم وتشغيل الاختبارات...'
      }
    ]
  },
  {
    id: 4,
    title: 'Playwright مع TypeScript',
    shortDescription: 'أتمتة الاختبارات الحديثة باستخدام Playwright و TypeScript للتطبيقات المتقدمة',
    promoVideoUrl: '1085509305',
    videoThumbnail: 'https://picsum.photos/800/450?random=4',
    instructor: {
      name: 'Hatem Hatamleh',
      image: 'https://picsum.photos/200/200?random=instructor'
    },
    lastUpdated: '1 ديسمبر 2024',
    type: 'automation',
    durationInMinutes: 900,
    studentsCount: 150,
    tags: ['Playwright', 'TypeScript', 'أتمتة', 'متقدم'],
    learningGoals: [
      'فهم ميزات Playwright وما يميزه عن أدوات الأتمتة الأخرى',
      'إعداد مشروع Playwright مع TypeScript من البداية',
      'كتابة اختبارات فعالة للواجهات الحديثة',
      'اختبار APIs باستخدام Playwright المتقدم',
      'تشغيل الاختبارات على متصفحات متعددة',
      'دمج الاختبارات مع أنظمة CI/CD الحديثة'
    ],
    lessons: [
      {
        id: 401,
        lessonOrder: 1,
        title: 'مقدمة في Playwright',
        durationInMinutes: 20,
        isFree: true,
        videoUrl: 'https://example.com/lesson-401.mp4',
        articleContent: '# مقدمة في Playwright\n\nلماذا Playwright وما يميزه عن أدوات الأتمتة الأخرى؟'
      },
      {
        id: 402,
        lessonOrder: 2,
        title: 'إعداد مشروع Playwright',
        durationInMinutes: 30,
        isFree: true,
        videoUrl: 'https://example.com/lesson-402.mp4',
        articleContent: '# إعداد المشروع\n\nخطوات إنشاء وإعداد مشروع Playwright مع TypeScript...'
      },
      {
        id: 403,
        lessonOrder: 3,
        title: 'كتابة الاختبارات الأولى',
        durationInMinutes: 45,
        isFree: false,
        videoUrl: 'https://example.com/lesson-403.mp4',
        articleContent: '# الاختبارات الأولى\n\nكتابة أول اختبارات Playwright وفهم البنية الأساسية...'
      },
      {
        id: 404,
        lessonOrder: 4,
        title: 'التعامل مع المتصفحات المتعددة',
        durationInMinutes: 40,
        isFree: false,
        videoUrl: 'https://example.com/lesson-404.mp4',
        articleContent: '# المتصفحات المتعددة\n\nتشغيل الاختبارات على متصفحات مختلفة...'
      },
      {
        id: 405,
        lessonOrder: 5,
        title: 'اختبار APIs باستخدام Playwright',
        durationInMinutes: 50,
        isFree: false,
        videoUrl: 'https://example.com/lesson-405.mp4',
        articleContent: '# اختبار APIs\n\nكيفية اختبار واجهات برمجة التطبيقات باستخدام Playwright...'
      },
      {
        id: 406,
        lessonOrder: 6,
        title: 'التكامل مع CI/CD',
        durationInMinutes: 55,
        isFree: false,
        videoUrl: 'https://example.com/lesson-406.mp4',
        articleContent: '# CI/CD Integration\n\nدمج اختبارات Playwright مع أنظمة CI/CD...'
      }
    ]
  }
]

// GET /api/courses - Returns all courses
export async function GET() {
  try {
    return NextResponse.json(COURSES)
  } catch  {
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}
