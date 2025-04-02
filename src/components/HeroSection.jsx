import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Zap } from 'lucide-react';
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* Animated circles */}
        <motion.div 
          className="absolute top-20 left-1/4 w-6 h-6 bg-primary/30 rounded-full"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-1/3 w-4 h-4 bg-indigo-400/30 rounded-full"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-5 h-5 bg-purple-400/30 rounded-full"
          animate={{ 
            y: [0, -12, 0],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Advanced <span className="text-primary">Skin Lesion</span> Classification
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
              Leveraging deep learning, image segmentation, and NLP techniques to provide accurate and reliable skin lesion diagnosis.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/predict" 
                className="px-6 py-3 bg-white text-primary rounded-md hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 hover:shadow-xl flex items-center justify-center"
              >
                Try It Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-3 bg-white text-primary border border-primary rounded-md hover:bg-primary/5 transition-all flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-primary/10 p-2 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900">99.2% Accuracy</h3>
                <p className="text-sm text-gray-600 text-center lg:text-left">Highly accurate diagnosis</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-primary/10 p-2 rounded-full mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900">Real-time Results</h3>
                <p className="text-sm text-gray-600 text-center lg:text-left">Get results in seconds</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-primary/10 p-2 rounded-full mb-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900">Expert Validated</h3>
                <p className="text-sm text-gray-600 text-center lg:text-left">Verified by dermatologists</p>
              </div>
            </div>
          </motion.div>
          
          {/* Image/Animation */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main image */}
              <img 
                src="/images/hero-image.png" 
                alt="Skin lesion analysis" 
                className="rounded-lg shadow-2xl mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400/3b82f6/ffffff?text=Skin+Lesion+Analysis";
                }}
              />
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">99.2% Match</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">AI-Powered Analysis</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
