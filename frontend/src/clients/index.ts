/**
 * HTTP Clients - Client-side API communication
 * 
 * These clients handle HTTP requests to API routes
 * and provide a clean interface for components to use.
 * 
 * Organized by feature with clear separation between
 * public methods and admin-only methods within each client.
 */

export { AuthClient } from './auth.client'
export { CourseClient } from './course.client'
export { LessonClient } from './lesson.client'
export { PlanClient } from './plan.client'
export { UserClient } from './user.client'
export { StripeClient } from './stripe.client'
export { ProgressClient } from './progress.client'