import { motion } from "framer-motion";
import { Brain, Microscope, Dna, MessageSquare } from 'lucide-react';


const features = [
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "CNN Analysis",
    description: "Our Convolutional Neural Network analyzes skin lesion images with high precision, identifying patterns that might be invisible to the human eye.",
    delay: 0.1
  },
  {
    icon: <Dna className="h-8 w-8 text-primary" />,
    title: "NLP Processing",
    description: "Natural Language Processing techniques analyze patient metadata to provide additional context and improve diagnostic accuracy.",
    delay: 0.2
  },
  {
    icon: <Microscope className="h-8 w-8 text-primary" />,
    title: "Image Segmentation",
    description: "Advanced U-Net segmentation isolates the lesion from surrounding skin, focusing the analysis on the relevant area for better results.",
    delay: 0.3
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "AI Assistant",
    description: "Our intelligent chatbot provides explanations, answers questions, and offers guidance throughout the diagnostic process.",
    delay: 0.4
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Powered by Advanced Technology
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our skin lesion classification system combines multiple AI technologies to provide accurate and reliable results.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
