'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { NewCourseForm } from './NewCourseForm'
import { AdminCoursesTable } from './AdminCoursesTable'
import { Course } from '@/types/course'

interface AdminCoursesPageClientProps {
  courses: Course[]
}

export const AdminCoursesPageClient = ({ courses: initialCourses }: AdminCoursesPageClientProps) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Handle opening the modal
  const openModal = () => setIsModalOpen(true)
  
  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false)
    setIsCreating(false)
  }

  // Handle new course creation
  const handleCreateCourse = async (courseData: Partial<Course>) => {
    setIsCreating(true)
    
    try {
      // Create new course with generated ID
      const newCourse: Course = {
        id: Date.now(), // Simple ID generation for demo
        title: courseData.title!,
        shortDescription: courseData.shortDescription!,
        promoVideoUrl: courseData.promoVideoUrl!,
        videoThumbnail: courseData.videoThumbnail!,
        instructor: courseData.instructor!,
        lastUpdated: courseData.lastUpdated!,
        lessons: [],
        type: courseData.type!,
        durationInMinutes: 0,
        studentsCount: courseData.studentsCount!,
        tags: [],
        learningGoals: []
      }

      // TODO: In real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      // Add new course to the list
      setCourses(prev => [newCourse, ...prev])
      
      // Close modal and show success
      closeModal()
      alert(`تم إنشاء الدورة "${newCourse.title}" بنجاح!`)
      
    } catch (error) {
      alert('حدث خطأ في إنشاء الدورة')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              إدارة الدورات
            </h1>
            <p className="text-muted-foreground">
              إنشاء وتعديل وإدارة الدورات والدروس
            </p>
          </div>
          
          {/* Create New Course Button */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={openModal}
              className="shadow-lg hover:shadow-xl"
            >
              إضافة دورة جديدة
            </Button>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <AdminCoursesTable courses={courses} />

      {/* New Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="إنشاء دورة جديدة"
        size="lg"
      >
        <NewCourseForm
          onSubmit={handleCreateCourse}
          onCancel={closeModal}
          isLoading={isCreating}
        />
      </Modal>
    </>
  )
}
