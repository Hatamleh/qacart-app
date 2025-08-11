import {Navbar} from "../components/layout/Navbar";
import {Footer} from "../components/layout/Footer";
import {CoursesHero} from "../components/courses/CoursesHero";
import {CoursesGrid} from "../components/courses/CoursesGrid";

interface CoursesPageProps {
    onCourseClick?: (courseId: number) => void
}

export const CoursesPage = ({ onCourseClick }: CoursesPageProps) => {
    return (
        <div className="min-h-screen" dir="rtl">
            {/* Navigation */}
            <Navbar/>

            {/* Courses Hero Section */}
            <CoursesHero />

            {/* Courses Grid Section */}
            <CoursesGrid onCourseClick={onCourseClick} />

            {/* Footer */}
            <Footer/>
        </div>
    )
}
