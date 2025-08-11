import {Navbar} from "../components/layout/Navbar";
import {Hero} from "../components/landing/Hero";
import {Footer} from "../components/layout/Footer";
import {HardTruth} from "../components/landing/HardTruth";
import {LetsGo} from "../components/landing/LetsGo";

export const LandingPage = () => {
    return (
        <div className="min-h-screen" dir="rtl">
            {/* Navigation */}
            <Navbar/>

            {/* Hero Section */}
            <Hero/>

            {/* Hard Truth Section */}
            <HardTruth />

            {/* Lets Go Section */}
            <LetsGo />

            {/* Footer */}
            <Footer/>
        </div>
    )
}
