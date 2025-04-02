import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import PredictionPage from "./pages/PredictionPage"
import ChatbotPage from "./pages/ChatbotPage"
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/predict" element={<PredictionPage />} />
            <Route path="/chat" element={<ChatbotPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

