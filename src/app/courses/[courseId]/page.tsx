import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  // Redirect to player page
  redirect(`/courses/${courseId}/player`)
}
