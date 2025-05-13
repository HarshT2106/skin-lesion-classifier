"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Brain,
  Microscope,
  Dna,
  MessageSquare,
  Shield,
  Users,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Award,
  MousePointer,
  ArrowDown,
} from "lucide-react"

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    content:
      "DermAI has revolutionized how we diagnose skin conditions in our practice. The accuracy is remarkable and the interface is intuitive.",
    author: "Dr. Sarah Johnson",
    title: "Dermatologist, Mayo Clinic",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 2,
    content:
      "As a researcher in medical AI, I'm impressed by the combination of CNN and NLP techniques. This is the future of medical diagnostics.",
    author: "Prof. Michael Chen",
    title: "AI Research Lead, Stanford University",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    content:
      "The system's ability to explain its reasoning makes it an invaluable tool for training new dermatologists and improving patient care.",
    author: "Dr. Emily Rodriguez",
    title: "Chief of Dermatology, NYU Langone",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
]

// Sample stats data
const stats = [
  { id: 1, value: "90%", label: "Accuracy Rate" },
  { id: 2, value: "7+", label: "Skin Conditions" },
  { id: 3, value: "10,000+", label: "Images Analyzed" },
  { id: 4, value: "24/7", label: "AI Assistance" },
]

// Features data
const features = [
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "Deep Learning CNN",
    description:
      "Our convolutional neural networks analyze visual patterns in skin lesions with exceptional accuracy, identifying subtle features invisible to the human eye.",
  },
  {
    icon: <Microscope className="h-8 w-8 text-primary" />,
    title: "Image Segmentation",
    description:
      "Advanced U-Net segmentation precisely isolates lesion boundaries from surrounding skin, improving classification accuracy and providing visual explanations.",
  },
  {
    icon: <Dna className="h-8 w-8 text-primary" />,
    title: "NLP Analysis",
    description:
      "Natural language processing analyzes patient metadata like age, sex, and lesion location to provide context and improve diagnostic accuracy.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "AI Medical Assistant",
    description:
      "Our integrated chatbot provides instant answers to medical questions, explains diagnoses, and offers guidance on next steps for patient care.",
  },
]

// How it works steps
const steps = [
  {
    number: "01",
    title: "Upload Image",
    description: "Upload a clear image of the skin lesion. Our system works with various image formats and qualities.",
    icon: <MousePointer className="h-6 w-6 text-primary" />,
    image: "https://images.unsplash.com/photo-1629904888780-8de0c7aeed28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXBsb2FkfGVufDB8fDB8fHww",
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our AI models analyze the image using CNN, segmentation, and NLP to identify the skin condition.",
    icon: <Brain className="h-6 w-6 text-primary" />,
    image:
      "https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.webp?a=1&b=1&s=612x612&w=0&k=20&c=3U1crsk_7qMPSUzRkzivcJue8jyy0OULAOcw8HWr1z8=",
  },
  {
    number: "03",
    title: "Get Results",
    description:
      "Receive detailed classification results with confidence scores and visual explanations of the diagnosis.",
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
]

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  // Handle testimonial carousel
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000)
    return () => clearInterval(interval)
  }, [])

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: i * 0.1,
      },
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  const fadeInUpVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  }

  // Parallax effect calculation
  const calculateParallax = (x, y, intensity = 0.02) => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const moveX = (x - windowWidth / 2) * intensity
    const moveY = (y - windowHeight / 2) * intensity

    return { x: moveX, y: moveY }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-primary/90 text-white overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTI5IDU4aDJ2MmgtMnpNNTkgMjl2MmgtMnYtMnpNMjkgMGgydjJoLTJ6TTAgMjl2Mmgydi0yek0xIDFoMnYySDFWMXpNNTcgNTdoMnYyaC0yVjU3eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 2 + "px",
                height: Math.random() * 4 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.3 + 0.1,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                opacity: [0.1, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>

        <motion.div style={{ opacity, y }} className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 md:pr-12 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium"
              >
                <Sparkles className="mr-2 h-4 w-4 text-yellow-300" />
                Next-Generation AI Technology
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Advanced AI for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                  Skin Lesion
                </span>{" "}
                Classification
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Combining deep learning, image segmentation, and NLP for accurate, reliable skin condition diagnosis.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Link
                  to="/predict"
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/20"
                >
                  <span className="relative z-10 flex items-center text-black">
                    Try It Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>

                <Link
                  to="/about"
                  className="relative overflow-hidden bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all border border-white/20 backdrop-blur-sm"
                >
                  <span className="relative z-10">Learn More</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
                </Link>
              </motion.div>

              {/* Feature badges */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.div
                  className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-colors"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Shield className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">89.5% Accuracy</span>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-colors"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Zap className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">Real-time Results</span>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-colors"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Award className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">Expert Validated</span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="relative z-10"
                style={{
                  x: calculateParallax(mousePosition.x, mousePosition.y, 0.01).x,
                  y: calculateParallax(mousePosition.x, mousePosition.y, 0.01).y,
                }}
              >
                {/* Main image with glow effect */}
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-indigo-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="AI Skin Analysis"
                      className="w-full h-auto rounded-2xl opacity-90 mix-blend-lighten"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/80 to-transparent"></div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  style={{
                    x: calculateParallax(mousePosition.x, mousePosition.y, 0.03).x,
                    y: calculateParallax(mousePosition.x, mousePosition.y, 0.03).y,
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">90% Accuracy</p>
                      <p className="text-gray-500 text-sm">Verified Results</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  style={{
                    x: calculateParallax(mousePosition.x, mousePosition.y, 0.02).x,
                    y: calculateParallax(mousePosition.x, mousePosition.y, 0.02).y,
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Brain className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Deep Learning</p>
                      <p className="text-gray-500 text-sm">CNN + NLP Analysis</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ArrowDown className="h-5 w-5 text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-[50px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
              variants={itemVariants}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Cutting-Edge Technology
            </motion.div>

            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
              Powered by Advanced AI
            </motion.h2>

            <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
              Our platform combines multiple AI approaches to deliver the most accurate skin lesion classification.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 transition-all"
              >
                <div className="relative mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-full blur-lg opacity-70"></div>
                  <div className="relative bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
                  <Zap className="mr-2 h-4 w-4" />
                  Exclusive Feature
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Medical Assistant</h3>
                <p className="text-gray-600 mb-6">
                  Our integrated chatbot provides instant answers to medical questions, explains diagnoses, and offers
                  guidance on next steps for patient care.
                </p>
                <Link to="/chat" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                  Try the Medical Assistant <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="md:w-1/2 relative">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-xl blur-lg opacity-70"></div>
                  <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="AI Medical Assistant"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
              variants={itemVariants}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Simple Process
            </motion.div>

            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
              How It Works
            </motion.h2>

            <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
              Our platform combines multiple AI approaches to deliver accurate skin lesion classification in just a few
              simple steps.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 z-0 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all"
                >
                  {/* Step number */}
                  <div className="absolute top-1 left-81 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl z-20">
                    {step.number}
                  </div>

                  {/* Connection dot for timeline */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full z-20 hidden md:block"></div>

                  <div className="p-6">
                    <div className="mb-4 bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-6">{step.description}</p>
                    <div className="rounded-lg overflow-hidden h-48 bg-gray-100">
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-primary to-indigo-600 text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1 + 0.2,
                    duration: 0.8,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
{/*       <section ref={testimonialsRef} className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
              variants={itemVariants}
            >
              <Users className="mr-2 h-4 w-4" />
              Testimonials
            </motion.div>

            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
              What Medical Professionals Say
            </motion.h2>

            <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
              Trusted by dermatologists and healthcare providers worldwide.
            </motion.p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-xl border border-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="p-8 md:p-12"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="shrink-0">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-full blur-md opacity-70"></div>
                        <img
                          src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                          alt={testimonials[currentTestimonial].name}
                          className="relative w-20 h-20 rounded-full object-cover border-4 border-white"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = `https://ui-avatars.com/api/?name=${testimonials[currentTestimonial].name}&background=3b82f6&color=fff`
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">
                        "{testimonials[currentTestimonial].content}"
                      </p>
                      <h4 className="font-bold text-gray-900 text-xl">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-gray-600">{testimonials[currentTestimonial].title}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <motion.button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </motion.button>

            <motion.button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </motion.button>

            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 bg-gradient-to-br from-gray-900 to-primary/90 text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTI5IDU4aDJ2MmgtMnpNNTkgMjl2MmgtMnYtMnpNMjkgMGgydjJoLTJ6TTAgMjl2Mmgydi0yek0xIDFoMnYySDFWMXpNNTcgNTdoMnYyaC0yVjU3eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

            {/* Gradient orbs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse"></div>
            <div
              className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <motion.div
            className="text-center relative z-10 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" variants={fadeInUpVariants}>
              Ready to Experience the Future of Dermatology?
            </motion.h2>

            <motion.p className="text-xl text-gray-300 mb-8" variants={fadeInUpVariants}>
              Join thousands of healthcare professionals using DermAI to improve diagnosis accuracy and patient care.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUpVariants}>
              <Link
                to="/predict"
                className="group relative overflow-hidden bg-white text-primary hover:text-primary/90 font-medium py-4 px-8 rounded-lg flex items-center justify-center transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="relative z-10 flex items-center">
                  Try It Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-100 group-hover:opacity-90 transition-opacity"></span>
              </Link>

              <Link
                to="/contact"
                className="relative overflow-hidden bg-transparent border border-white hover:bg-white/10 text-white font-medium py-4 px-8 rounded-lg flex items-center justify-center transition-all"
              >
                <span className="relative z-10">Contact Us</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

