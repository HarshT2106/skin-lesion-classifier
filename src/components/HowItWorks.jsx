import { motion } from "framer-motion";
import { Upload, Database, Cpu, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="h-8 w-8 text-white" />,
    title: "Upload Image",
    description: "Upload a clear image of the skin lesion along with relevant patient information.",
    color: "bg-blue-500"
  },
  {
    icon: <Database className="h-8 w-8 text-white" />,
    title: "Data Processing",
    description: "Our system processes the image and metadata, preparing it for analysis.",
    color: "bg-indigo-500"
  },
  {
    icon: <Cpu className="h-8 w-8 text-white" />,
    title: "AI Analysis",
    description: "Multiple AI models analyze the data, including CNN, NLP, and image segmentation.",
    color: "bg-purple-500"
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-white" />,
    title: "Get Results",
    description: "Receive comprehensive results with visual explanations and confidence scores.",
    color: "bg-green-500"
  }
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our simple 4-step process makes skin lesion classification quick and easy
          </motion.p>
        </div>
        
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
                
                {/* Step Number */}
                <div className="mt-4 bg-white w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center">
                  <span className="font-bold text-gray-700">{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
