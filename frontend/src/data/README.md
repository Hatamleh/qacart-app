# Data Layer

This directory contains static JSON data for the QAcart platform, designed for frontend development without backend dependencies.

## Files

- **`courses.json`** - Contains all course data including lessons, instructors, and metadata
- **`index.ts`** - Provides helper functions to access and manipulate the course data

## Usage

Instead of making API calls, import functions from the data layer:

```typescript
import { getAllCourses, getCourseById, searchCourses } from '@/data'

// Get all courses
const courses = getAllCourses()

// Get specific course
const course = getCourseById(1)

// Search courses
const results = searchCourses('اختبار')
```

## Available Functions

### Course Functions
- `getAllCourses()` - Returns all courses
- `getCourseById(id)` - Returns specific course by ID (defaults to first course)
- `getCoursesByType(type)` - Filter courses by type
- `getFeaturedCourses()` - Returns first 3 courses for homepage
- `searchCourses(query)` - Search courses by title, description, or tags

### Plan Functions
- `getProPlan()` - Returns the Pro subscription plan data

**Note:** All functions always return valid data for design purposes - no error handling needed!

## Data Structure

Each course follows the `Course` interface defined in `@/types/course.ts` and includes:

- Basic info (title, description, instructor)
- Media (thumbnails, promo videos)
- Metadata (duration, student count, tags)
- Lessons array with content and progression data

## Benefits

- **Fast Development**: No API setup required
- **Reliable**: No network dependencies
- **Type Safe**: Full TypeScript support
- **Easy Testing**: Predictable data for design iterations
