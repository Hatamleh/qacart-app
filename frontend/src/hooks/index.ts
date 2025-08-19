/**
 * Custom Hooks - Reusable state management
 * 
 * These hooks encapsulate business logic and state management,
 * providing a clean interface for components to use.
 */

// Data fetching hooks (feature-specific)
export { useCourses } from './useCourses'
export { useLessons } from './useLessons'
export { usePlans } from './usePlans'
export { useUsers } from './useUsers'

// Note: Auth uses AuthContext, not a hook
