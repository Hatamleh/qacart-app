import './App.css'

import {Navbar} from "./components/layout/Navbar.tsx";
import {Hero} from "./components/landing/Hero.tsx";
import {HardTruth} from "./components/landing/HardTruth.tsx";
import {LetsGo} from "./components/landing/LetsGo.tsx";


function App() {
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

        </div>
    )
}

export default App
