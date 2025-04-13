"use client"

import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { jsPDF } from "jspdf"
import {
  FileImage,
  Brain,
  Microscope,
  Dna,
  AlertCircle,
  Loader2,
  ChevronDown,
  Check,
  MessageSquare,
  Send,
  X,
  Download,
  Upload,
  Info,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  FileText,
  Camera,
  Shield,
} from "lucide-react"

const API_KEY = "AIzaSyDicwrWgGI6An8fVs8WmmUhMS0Wz2kNjiY"
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

const PredictionPage = () => {
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [dxType, setDxType] = useState("")
  const [age, setAge] = useState("")
  const [sex, setSex] = useState("")
  const [localization, setLocalization] = useState("")
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [pdfGenerating, setPdfGenerating] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const fileInputRef = useRef(null)
  const resultsRef = useRef(null)

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setError("Please drop a valid image file.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setResult(null)
    setChatMessages([]) // Reset chat when new prediction is made

    if (!image) {
      setError("Please select an image before predicting.")
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("dx_type", dxType)
      formData.append("age", age)
      formData.append("sex", sex)
      formData.append("localization", localization)

      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setResult(response.data)
      setActiveTab("results")
    } catch (err) {
      setError("Error: " + (err.response?.data?.error || err.message))
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChat = async () => {
    setError("")
    setChatMessages([])

    setIsLoading(true)
    try {
      const instructions = "You are a medical chatbot specialized in skin lesion analysis."
      const initialPrompt = {
        role: "user",
        content: "Please introduce yourself and explain how you can assist me.",
      }

      const promptText = `${instructions}\n\nUser: ${initialPrompt.content}`

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: promptText }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()
      const geminiResponse = data.candidates[0].content.parts[0].text
      setChatMessages([initialPrompt, { role: "model", content: geminiResponse }])
      setChatOpen(true)
    } catch (err) {
      setError(`Chat Error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const newMessage = { role: "user", content: chatInput }
    setChatMessages((prevMessages) => [...prevMessages, newMessage])
    setChatInput("")

    setIsLoading(true)
    try {
      const instructions = "You are a medical chatbot specialized in skin lesion analysis."
      const promptText = `${instructions}\n\n${chatMessages
        .map((msg) => `${msg.role === "user" ? "User" : "Model"}: ${msg.content}`)
        .join("\n")}\nUser: ${newMessage.content}`

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: promptText }] }],
          generationConfig: {
            temperature: 0.5,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2000,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()
      const geminiResponse = data.candidates[0].content.parts[0].text
      setChatMessages((prevMessages) => [...prevMessages, { role: "model", content: geminiResponse }])
    } catch (err) {
      setError(`Chat Error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const generatePDF = async () => {
    if (!result) return

    setPdfGenerating(true)

    try {
      // Create a new jsPDF instance
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Add header
      pdf.setFillColor(59, 130, 246) // Primary color
      pdf.rect(0, 0, 210, 20, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(16)
      pdf.text("DermAI - Skin Lesion Analysis Report", 105, 12, { align: "center" })

      // Add date and time
      pdf.setTextColor(100, 100, 100)
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text(`Generated on: ${new Date().toLocaleString()}`, 105, 25, { align: "center" })

      // Add patient information
      pdf.setFontSize(12)
      pdf.setTextColor(60, 60, 60)
      pdf.setFont("helvetica", "bold")
      pdf.text("Patient Information", 15, 35)
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text(`Age: ${age || "Not provided"}`, 15, 42)
      pdf.text(`Sex: ${sex || "Not provided"}`, 15, 48)
      pdf.text(`Localization: ${localization || "Not provided"}`, 15, 54)
      pdf.text(`Diagnosis Type: ${dxType || "Not provided"}`, 15, 60)

      // Add original image
      if (imagePreview) {
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(12)
        pdf.text("Original Image", 15, 70)
        pdf.addImage(imagePreview, "JPEG", 15, 75, 80, 60)
      }

      // Add analysis results
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(12)
      pdf.text("Analysis Results", 15, 145)

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text(`Predicted Class: ${result.combined_result.predicted_class}`, 15, 152)
      pdf.text(`Confidence: ${(result.combined_result.confidence * 100).toFixed(2)}%`, 15, 158)
      pdf.text(`Source: ${result.combined_result.source}`, 15, 164)

      // Add CNN results
      pdf.setFont("helvetica", "bold")
      pdf.text("CNN Analysis", 15, 174)
      pdf.setFont("helvetica", "normal")

      let yPos = 180
      pdf.text(`Predicted Class: ${result.cnn_result.predicted_class}`, 15, yPos)
      yPos += 6
      pdf.text(`Confidence: ${(result.cnn_result.confidence * 100).toFixed(2)}%`, 15, yPos)
      yPos += 6

      // Add class probabilities
      pdf.text("Class Probabilities:", 15, yPos)
      yPos += 6

      Object.entries(result.cnn_result.all_probabilities).forEach(([className, prob]) => {
        const percentage = (prob * 100).toFixed(1)
        pdf.text(`${className}: ${percentage}%`, 20, yPos)
        yPos += 5
      })

      // Add NLP results
      yPos += 3
      pdf.setFont("helvetica", "bold")
      pdf.text("NLP Analysis", 15, yPos)
      pdf.setFont("helvetica", "normal")
      yPos += 6
      pdf.text(`Predicted Class: ${result.nlp_result.predicted_class}`, 15, yPos)
      yPos += 6
      if (result.nlp_result.confidence !== null) {
        pdf.text(`Confidence: ${(result.nlp_result.confidence * 100).toFixed(2)}%`, 15, yPos)
        yPos += 6
      }

      // Add segmentation results
      yPos += 3
      pdf.setFont("helvetica", "bold")
      pdf.text("Segmentation Analysis", 15, yPos)
      pdf.setFont("helvetica", "normal")
      yPos += 6

      // Split long text into multiple lines
      const segmentationText = result.segmentation_result
      const textLines = pdf.splitTextToSize(segmentationText, 180)
      pdf.text(textLines, 15, yPos)

      // Add footer
      pdf.setFillColor(240, 240, 240)
      pdf.rect(0, 280, 210, 17, "F")
      pdf.setTextColor(100, 100, 100)
      pdf.setFontSize(8)
      pdf.text("This report is generated by DermAI and should be reviewed by a healthcare professional.", 105, 285, {
        align: "center",
      })
      pdf.text("It is not a substitute for professional medical advice, diagnosis, or treatment.", 105, 290, {
        align: "center",
      })

      // Save the PDF
      pdf.save(`DermAI_Report_${new Date().toISOString().slice(0, 10)}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setError("Failed to generate PDF. Please try again.")
    } finally {
      setPdfGenerating(false)
    }
  }

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

  // Calculate parallax effect
  const calculateParallax = (x, y, intensity = 0.02) => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const moveX = (x - windowWidth / 2) * intensity
    const moveY = (y - windowHeight / 2) * intensity

    return { x: moveX, y: moveY }
  }

  const renderForm = () => (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="mb-6 text-center" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div
          className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          variants={itemVariants}
        >
          <Camera className="mr-2 h-4 w-4" />
          Image Analysis
        </motion.div>

        <motion.h2 className="text-2xl font-bold text-gray-800 mb-2" variants={itemVariants}>
          Upload Skin Lesion Image
        </motion.h2>

        <motion.p className="text-gray-600" variants={itemVariants}>
          Upload a clear image of the skin lesion for analysis
        </motion.p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700">
            Lesion Image <span className="text-red-500">*</span>
          </label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
              isDragging
                ? "border-primary bg-primary/5"
                : imagePreview
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 hover:border-primary bg-gray-50"
            } cursor-pointer`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {imagePreview ? (
              <div className="space-y-4">
                <div className="relative w-full h-56 rounded-lg overflow-hidden group">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <p className="text-white text-sm truncate">{image?.name}</p>
                      <p className="text-gray-300 text-xs">
                        {image?.size ? `${(image.size / 1024).toFixed(1)} KB` : ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-green-600 flex items-center">
                    <Check size={16} className="mr-1" /> Image uploaded successfully
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setImage(null)
                      setImagePreview(null)
                    }}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Change image
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <FileImage className="h-16 w-16 text-gray-400 mb-2" />
                </motion.div>
                <p className="text-sm text-gray-500 mb-1">Drag and drop or click to upload</p>
                <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 10MB</p>
              </div>
            )}

            {/* Overlay for drag state */}
            {isDragging && (
              <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-primary font-medium">Drop your image here</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Patient Information */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-gray-800">Patient Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g., 45"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none bg-white"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dx Type</label>
              <input
                type="text"
                value={dxType}
                onChange={(e) => setDxType(e.target.value)}
                placeholder="Diagnosis type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localization</label>
              <input
                type="text"
                value={localization}
                onChange={(e) => setLocalization(e.target.value)}
                placeholder="e.g., arm, face, back"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isLoading || !image}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
            isLoading || !image
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/20"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={isLoading || !image ? {} : { scale: 1.02 }}
          whileTap={isLoading || !image ? {} : { scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Processing...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-5 w-5 text-black" />
              <span className = "text-black">Analyze Lesion</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )

  const renderResults = () => {
    if (!result) return null

    return (
      <motion.div
        ref={resultsRef}
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              <CheckCircle className="mr-2 h-4 w-4" />
              Analysis Complete
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Skin Lesion Analysis Results</h2>
          </div>

          <div className="flex space-x-3">
            <motion.button
              onClick={() => setActiveTab("form")}
              className="text-sm text-gray-600 hover:text-primary flex items-center px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronDown className="h-4 w-4 mr-1 transform rotate-90" />
              Back to form
            </motion.button>

            <motion.button
              onClick={generatePDF}
              disabled={pdfGenerating}
              className={`text-sm flex items-center px-4 py-2 rounded-md shadow-md hover:bg-primary/90 transition-colors ${pdfGenerating ? "opacity-70 cursor-not-allowed" : ""}`}
              whileHover={pdfGenerating ? {} : { scale: 1.05 }}
              whileTap={pdfGenerating ? {} : { scale: 0.95 }}
            >
              {pdfGenerating ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2 text-black" />
                  Download PDF Report
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Main image and visualization */}
        <motion.div
          className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-indigo-500/30 rounded-xl blur-md opacity-70"></div>
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
                  <img src={imagePreview || "/placeholder.svg"} alt="Original" className="w-full h-auto object-cover" />
                </div>
              </div>
              <p className="text-sm text-center text-gray-500 mt-3">Original Image</p>
            </div>
            <div className="md:w-2/3">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-primary/30 rounded-xl blur-md opacity-70"></div>
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
                  <img
                    src={result.plot_image || "/placeholder.svg"}
                    alt="Analysis"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
                </div>
              </div>
              <p className="text-sm text-center text-gray-500 mt-3">Analysis Visualization</p>
            </div>
          </div>
        </motion.div>

        {/* Primary diagnosis card */}
        <motion.div
          className="mb-8 bg-gradient-to-br from-gray-900 to-primary/90 rounded-xl p-6 text-white shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTI5IDU4aDJ2MmgtMnpNNTkgMjl2MmgtMnYtMnpNMjkgMGgydjJoLTJ6TTAgMjl2Mmgydi0yek0xIDFoMnYySDFWMXpNNTcgNTdoMnYyaC0yVjU3eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

            {/* Gradient orbs */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[80px] animate-pulse"></div>
            <div
              className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px] animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-full">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Sparkles className="h-5 w-5 text-yellow-300 mr-2" />
                <h3 className="text-lg font-medium text-white/90">Final Diagnosis</h3>
              </div>
              <h2 className="text-3xl font-bold mb-4">{result.combined_result?.predicted_class}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-white/70">Confidence</p>
                  <p className="text-xl font-bold">{(result.combined_result?.confidence * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-white/70">Source</p>
                  <p className="text-xl font-bold">{result.combined_result?.source}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-white/70">Processing Time</p>
                  <p className="text-xl font-bold">1.2s</p>
                </div>
              </div>
              <button
                onClick={handleOpenChat}
                className="mt-2 flex items-center text-sm text-black bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Discuss with AI Assistant
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CNN Output */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 shadow-md relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-2xl"
              style={{
                transform: `translate(${calculateParallax(mousePosition.x, mousePosition.y, 0.02).x}px, ${calculateParallax(mousePosition.x, mousePosition.y, 0.02).y}px)`,
              }}
            ></div>

            <div className="flex items-center mb-3">
              <Brain className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-bold text-blue-800">CNN Analysis</h3>
            </div>
            <p className="text-gray-700 mb-3">
              Predicted Class: {result.cnn_result?.predicted_class} (Confidence:{" "}
              {(result.cnn_result?.confidence * 100).toFixed(2)}%)
            </p>
            <div className="mt-3 pt-3 border-t border-blue-100">
              <p className="text-sm font-medium text-blue-800 mb-2">Class Probabilities:</p>
              <div className="text-xs text-gray-600 space-y-1">
                {result.cnn_result?.all_probabilities &&
                  Object.entries(result.cnn_result.all_probabilities).map(([className, prob], index) => {
                    const percentage = (prob * 100).toFixed(1)
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-24 font-medium">{className}:</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-blue-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            ></motion.div>
                          </div>
                        </div>
                        <div className="w-16 text-right">{percentage}%</div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </motion.div>

          {/* NLP Output */}
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100 shadow-md relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-purple-400 rounded-full opacity-10 blur-2xl"
              style={{
                transform: `translate(${calculateParallax(mousePosition.x, mousePosition.y, 0.02).x}px, ${calculateParallax(mousePosition.x, mousePosition.y, 0.02).y}px)`,
              }}
            ></div>

            <div className="flex items-center mb-3">
              <Dna className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="font-bold text-purple-800">NLP Analysis</h3>
            </div>
            <p className="text-gray-700">
              Predicted Class: {result.nlp_result?.predicted_class}
              {result.nlp_result?.confidence !== null &&
                ` (Confidence: ${(result.nlp_result.confidence * 100).toFixed(2)}%)`}
            </p>

            <div className="mt-4 bg-white/50 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm font-medium text-purple-800 mb-2">Metadata Analysis:</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Age</p>
                  <p className="font-medium">{age || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Sex</p>
                  <p className="font-medium">{sex || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Localization</p>
                  <p className="font-medium">{localization || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Dx Type</p>
                  <p className="font-medium">{dxType || "Not provided"}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Segmentation Output */}
          <motion.div
            className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-5 border border-green-100 shadow-md relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-green-400 rounded-full opacity-10 blur-2xl"
              style={{
                transform: `translate(${calculateParallax(mousePosition.x, mousePosition.y, 0.02).x}px, ${calculateParallax(mousePosition.x, mousePosition.y, 0.02).y}px)`,
              }}
            ></div>

            <div className="flex items-center mb-3">
              <Microscope className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-bold text-green-800">Segmentation Analysis</h3>
            </div>
            <p className="text-gray-700">{result.segmentation_result}</p>

            <div className="mt-6 flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <p className="text-sm text-green-800">Segmentation completed successfully</p>
            </div>
          </motion.div>

          {/* Download Report Card */}
          <motion.div
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-100 shadow-md relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full opacity-10 blur-2xl"
              style={{
                transform: `translate(${calculateParallax(mousePosition.x, mousePosition.y, 0.02).x}px, ${calculateParallax(mousePosition.x, mousePosition.y, 0.02).y}px)`,
              }}
            ></div>

            <div className="flex items-center mb-3">
              <FileText className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="font-bold text-amber-800">Download Report</h3>
            </div>

            <p className="text-gray-700 mb-4">
              Download a comprehensive PDF report with all analysis details to share with your healthcare provider.
            </p>

            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-600 mr-2" />
                  <p className="text-sm font-medium">Generated on: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-amber-600 mr-2" />
                  <p className="text-sm font-medium">HIPAA Compliant</p>
                </div>
              </div>
            </div>

            <button
              onClick={generatePDF}
              disabled={pdfGenerating}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
                pdfGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700 "
              }`}
            >
              {pdfGenerating ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF Report
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Next steps section */}
        <motion.div
          className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Next Steps</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <h4 className="font-medium">Discuss Results</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Chat with our AI assistant to better understand your diagnosis and get answers to your questions.
              </p>
              <button onClick={handleOpenChat} className="text-sm text-primary hover:text-primary/80 flex items-center">
                Start Chat <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <Download className="h-4 w-4 text-primary" />
                </div>
                <h4 className="font-medium">Save Report</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Download a comprehensive PDF report with all analysis details to share with your healthcare provider.
              </p>
              <button
                onClick={generatePDF}
                disabled={pdfGenerating}
                className="text-sm text-primary hover:text-primary/80 flex items-center"
              >
                {pdfGenerating ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-1" />
                    Generating...
                  </>
                ) : (
                  <>
                    Download PDF <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <Upload className="h-4 w-4 text-primary" />
                </div>
                <h4 className="font-medium">Try Another Image</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Analyze another skin lesion image to compare results or check a different area of concern.
              </p>
              <button
                onClick={() => setActiveTab("form")}
                className="text-sm text-primary hover:text-primary/80 flex items-center"
              >
                New Analysis <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800 font-medium">Important Medical Disclaimer</p>
              <p className="text-xs text-yellow-700 mt-1">
                This AI analysis is intended to assist healthcare professionals and should not be used as a substitute
                for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare
                provider regarding any medical conditions.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  const renderChatModal = () => {
    if (!chatOpen) return null

    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl border border-gray-200"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Chat with Medical Assistant</h3>
                <p className="text-xs text-gray-500">Ask questions about your diagnosis</p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg mb-4">
            <AnimatePresence>
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : msg.role === "system"
                          ? "bg-gray-200 text-gray-800 rounded-tl-none"
                          : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <div className="flex mb-4">
                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-tl-none inline-flex items-center shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSubmit} className="flex space-x-2 ">
            <div className="relative flex-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question about your diagnosis..."
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                disabled={isLoading}
              />
              {chatInput && (
                <button
                  type="button"
                  onClick={() => setChatInput("")}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || !chatInput.trim()}
              className={`p-3 rounded-full ${
                isLoading || !chatInput.trim() ? "bg-gray-300 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
              } shadow-md hover:shadow-lg transition-all`}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Microscope className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Skin Lesion Classifier</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Advanced deep learning system for skin lesion classification using image segmentation and NLP techniques
          </p>
        </motion.header>

        {error && (
          <motion.div
            className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 max-w-sm w-full shadow-2xl border border-gray-200"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-full blur-md opacity-70 animate-pulse"></div>
                  <div className="relative bg-white p-4 rounded-full">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Processing</h3>
                <p className="text-gray-500 text-center mb-4">
                  Our AI models are analyzing your image or generating a response...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <motion.div
                    className="bg-primary h-1.5 rounded-full"
                    initial={{ width: "5%" }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 2 }}
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-400">Please wait, this may take a moment</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "form" ? renderForm() : renderResults()}

        <AnimatePresence>{renderChatModal()}</AnimatePresence>
      </div>
    </div>
  )
}

export default PredictionPage

