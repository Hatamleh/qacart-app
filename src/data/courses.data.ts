
import { Course } from '@/types'

export const coursesData: Course[] = [
  {
    id: "course_setup_dev_env",
    title: "إعداد الجهاز للتطوير",
    shortDescription: "تعلم كيفية إعداد جهازك للبرمجة والتطوير من الصفر حتى الاحتراف",
    vimeoId: "1085509305",
    lastUpdated: "15 ديسمبر 2024",
    durationInMinutes: 240,
    studentsCount: 320,
    tags: ["إعداد", "مبتدئ", "أدوات التطوير"],
    lessons: [
      {
        id: "lesson_101",
        lessonOrder: 1,
        title: "مقدمة في إعداد بيئة التطوير",
        durationInMinutes: 15,
        isFree: true,
        lessonType: 'video',
        vimeoId: "290256877"
      },
      {
        id: "lesson_102",
        lessonOrder: 2,
        title: "تثبيت نظام التشغيل المناسب",
        durationInMinutes: 25,
        isFree: true,
        lessonType: 'video',
        vimeoId: "148751763"
      },
      {
        id: "lesson_103",
        lessonOrder: 3,
        title: "تثبيت وإعداد Git",
        durationInMinutes: 30,
        isFree: false,
        lessonType: 'video',
        vimeoId: "76979871"
      },
      {
        id: "lesson_104",
        lessonOrder: 4,
        title: "إعداد IDE وأدوات التطوير",
        durationInMinutes: 40,
        isFree: false,
        lessonType: 'video',
        vimeoId: "148751764"
      },
      {
        id: "lesson_105",
        lessonOrder: 5,
        title: "إدارة البيئات الافتراضية",
        durationInMinutes: 35,
        isFree: false,
        lessonType: 'video',
        vimeoId: "290256878"
      },
      {
        id: "lesson_106",
        lessonOrder: 6,
        title: "أساسيات استخدام Terminal",
        durationInMinutes: 45,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-106.mp4"
      }
    ]
  },
  {
    id: "course_manual_testing",
    title: "أساسيات الاختبار اليدوي",
    shortDescription: "تعلم أساسيات اختبار البرمجيات اليدوي وأفضل الممارسات في الصناعة",
    vimeoId: "1085509305",
    lastUpdated: "10 ديسمبر 2024",
    durationInMinutes: 480,
    studentsCount: 450,
    tags: ["اختبار يدوي", "مبتدئ", "QA"],
    lessons: [
      {
        id: "lesson_201",
        lessonOrder: 1,
        title: "مقدمة في اختبار البرمجيات",
        durationInMinutes: 20,
        isFree: true,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-201.mp4"
      },
      {
        id: "lesson_202",
        lessonOrder: 2,
        title: "مفاهيم أساسية في الاختبار",
        durationInMinutes: 25,
        isFree: true,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-202.mp4"
      },
      {
        id: "lesson_203",
        lessonOrder: 3,
        title: "أنواع الاختبارات المختلفة",
        durationInMinutes: 30,
        isFree: true,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-203.mp4"
      },
      {
        id: "lesson_204",
        lessonOrder: 4,
        title: "كتابة Test Cases فعالة",
        durationInMinutes: 40,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-204.mp4"
      },
      {
        id: "lesson_205",
        lessonOrder: 5,
        title: "إدارة العيوب والأخطاء",
        durationInMinutes: 35,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-205.mp4"
      },
      {
        id: "lesson_206",
        lessonOrder: 6,
        title: "كتابة تقارير الاختبار",
        durationInMinutes: 30,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-206.mp4"
      },
      {
        id: "lesson_207",
        lessonOrder: 7,
        title: "مشروع عملي شامل",
        durationInMinutes: 60,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-207.mp4"
      }
    ]
  },
  {
    id: "course_selenium_java",
    title: "Selenium مع Java",
    shortDescription: "تعلم أتمتة اختبار تطبيقات الويب باستخدام Selenium WebDriver و Java",
    vimeoId: "1085509305",
    lastUpdated: "5 ديسمبر 2024",
    durationInMinutes: 720,
    studentsCount: 280,
    tags: ["Selenium", "Java", "أتمتة", "متوسط"],
    lessons: [
      {
        id: "lesson_301",
        lessonOrder: 1,
        title: "مقدمة في Selenium WebDriver",
        durationInMinutes: 25,
        isFree: true,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-301.mp4"
      },
      {
        id: "lesson_302",
        lessonOrder: 2,
        title: "إعداد بيئة Selenium مع Java",
        durationInMinutes: 30,
        isFree: true,
        lessonType: 'article',
        articleContent: "# إعداد بيئة Selenium مع Java\n\nفي هذا الدرس سنتعلم كيفية إعداد بيئة عمل Selenium مع Java من الصفر.\n\n## متطلبات النظام\n\nقبل البدء، تأكد من تثبيت:\n- **Java JDK 11** أو أحدث\n- **Maven** لإدارة التبعيات\n- **IntelliJ IDEA** أو Eclipse\n\n## إنشاء مشروع Maven جديد\n\nأولاً، قم بإنشاء مشروع Maven جديد وأضف التبعيات التالية في `pom.xml`:\n\n```xml\n<dependencies>\n    <dependency>\n        <groupId>org.seleniumhq.selenium</groupId>\n        <artifactId>selenium-java</artifactId>\n        <version>4.15.0</version>\n    </dependency>\n    <dependency>\n        <groupId>org.testng</groupId>\n        <artifactId>testng</artifactId>\n        <version>7.8.0</version>\n    </dependency>\n</dependencies>\n```\n\n## إعداد WebDriver\n\nالآن دعنا ننشئ أول كلاس لإعداد WebDriver:\n\n```java\npackage com.qacart.selenium;\n\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\nimport org.openqa.selenium.chrome.ChromeOptions;\nimport org.testng.annotations.AfterMethod;\nimport org.testng.annotations.BeforeMethod;\n\npublic class BaseTest {\n    protected WebDriver driver;\n    \n    @BeforeMethod\n    public void setUp() {\n        // إعداد خيارات المتصفح\n        ChromeOptions options = new ChromeOptions();\n        options.addArguments(\"--start-maximized\");\n        options.addArguments(\"--disable-notifications\");\n        \n        // إنشاء مثيل من WebDriver\n        driver = new ChromeDriver(options);\n        \n        System.out.println(\"تم إعداد المتصفح بنجاح!\");\n    }\n    \n    @AfterMethod\n    public void tearDown() {\n        if (driver != null) {\n            driver.quit();\n            System.out.println(\"تم إغلاق المتصفح\");\n        }\n    }\n}\n```\n\n## أول اختبار Selenium\n\nالآن لننشئ أول اختبار بسيط:\n\n```java\npackage com.qacart.selenium.tests;\n\nimport com.qacart.selenium.BaseTest;\nimport org.openqa.selenium.By;\nimport org.openqa.selenium.WebElement;\nimport org.testng.Assert;\nimport org.testng.annotations.Test;\n\npublic class FirstSeleniumTest extends BaseTest {\n    \n    @Test\n    public void testGoogleSearch() {\n        // الانتقال إلى جوجل\n        driver.get(\"https://www.google.com\");\n        \n        // التحقق من عنوان الصفحة\n        String pageTitle = driver.getTitle();\n        Assert.assertTrue(pageTitle.contains(\"Google\"), \n                         \"عنوان الصفحة لا يحتوي على Google\");\n        \n        // البحث عن عنصر مربع البحث\n        WebElement searchBox = driver.findElement(By.name(\"q\"));\n        \n        // كتابة النص في مربع البحث\n        searchBox.sendKeys(\"QAcart Academy\");\n        \n        // الضغط على زر البحث\n        searchBox.submit();\n        \n        // انتظار تحميل النتائج\n        try {\n            Thread.sleep(2000);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n        \n        // التحقق من أن النتائج تحتوي على الكلمة المطلوبة\n        String resultsText = driver.getPageSource();\n        Assert.assertTrue(resultsText.contains(\"QAcart\"), \n                         \"النتائج لا تحتوي على QAcart\");\n        \n        System.out.println(\"✅ تم تشغيل الاختبار بنجاح!\");\n    }\n}\n```\n\n## تشغيل الاختبار\n\nلتشغيل الاختبار، استخدم الأمر التالي في Terminal:\n\n```bash\nmvn clean test\n```\n\n## نصائح مهمة\n\n> **💡 تذكر دائماً:**\n> - تأكد من تحديث ChromeDriver بانتظام\n> - استخدم الانتظار الصريح بدلاً من `Thread.sleep()`\n> - اكتب اختبارات قابلة للقراءة والصيانة\n\n---\n\n**الخطوة التالية:** في الدرس القادم سنتعلم كيفية التعامل مع عناصر الصفحة بطرق متقدمة."
      },
      {
        id: "lesson_303",
        lessonOrder: 3,
        title: "التعامل مع عناصر الصفحة",
        durationInMinutes: 45,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-303.mp4"
      },
      {
        id: "lesson_304",
        lessonOrder: 4,
        title: "إدارة النوافذ والإطارات",
        durationInMinutes: 40,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-304.mp4"
      },
      {
        id: "lesson_305",
        lessonOrder: 5,
        title: "Page Object Model",
        durationInMinutes: 50,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-305.mp4"
      },
      {
        id: "lesson_306",
        lessonOrder: 6,
        title: "التكامل مع TestNG",
        durationInMinutes: 35,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-306.mp4"
      }
    ]
  },
  {
    id: "course_playwright_typescript",
    title: "Playwright مع TypeScript",
    shortDescription: "أتمتة الاختبارات الحديثة باستخدام Playwright و TypeScript للتطبيقات المتقدمة",
    vimeoId: "1085509305",
    lastUpdated: "1 ديسمبر 2024",
    durationInMinutes: 900,
    studentsCount: 150,
    tags: ["Playwright", "TypeScript", "أتمتة", "متقدم"],
    lessons: [
      {
        id: "lesson_401",
        lessonOrder: 1,
        title: "مقدمة في Playwright",
        durationInMinutes: 20,
        isFree: true,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-401.mp4"
      },
      {
        id: "lesson_402",
        lessonOrder: 2,
        title: "إعداد مشروع Playwright",
        durationInMinutes: 30,
        isFree: true,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-402.mp4"
      },
      {
        id: "lesson_403",
        lessonOrder: 3,
        title: "كتابة الاختبارات الأولى",
        durationInMinutes: 45,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-403.mp4"
      },
      {
        id: "lesson_404",
        lessonOrder: 4,
        title: "التعامل مع المتصفحات المتعددة",
        durationInMinutes: 40,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-404.mp4"
      },
      {
        id: "lesson_405",
        lessonOrder: 5,
        title: "اختبار APIs باستخدام Playwright",
        durationInMinutes: 50,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-405.mp4"
      },
      {
        id: "lesson_406",
        lessonOrder: 6,
        title: "التكامل مع CI/CD",
        durationInMinutes: 55,
        isFree: false,
        lessonType: 'video',
        vimeoId: "https://example.com/lesson-406.mp4"
      }
    ]
  }
]
