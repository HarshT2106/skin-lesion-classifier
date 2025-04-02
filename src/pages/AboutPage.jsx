import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Brain, Microscope, Github, Linkedin, Mail } from 'lucide-react';

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Nakul Makode",
    role: "AI Engineer & Team Lead",
    bio: "Specializes in deep learning models and computer vision algorithms for medical image analysis.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    social: {
      github: "#",
      linkedin: "#",
      email: "nakul@example.com"
    }
  },
  {
    id: 2,
    name: "Ansh Choube",
    role: "Full Stack Developer",
    bio: "Expert in building scalable web applications and integrating AI models into user-friendly interfaces.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    social: {
      github: "#",
      linkedin: "#",
      email: "ansh@example.com"
    }
  },
  {
    id: 3,
    name: "Harsh Thacker",
    role: "ML Engineer",
    bio: "Focuses on natural language processing and developing the medical chatbot assistant.",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    social: {
      github: "#",
      linkedin: "#",
      email: "harsh.t@example.com"
    }
  },
  {
    id: 4,
    name: "Harsh Dakhare",
    role: "Data Scientist",
    bio: "Works on data preprocessing, model validation, and ensuring high accuracy in skin lesion classification.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    social: {
      github: "#",
      linkedin: "#",
      email: "harsh.d@example.com"
    }
  }
];

// Timeline data
const timeline = [
  {
    id: 1,
    year: "Dec 2024",
    title: "Project Inception",
    description: "The team formed with the vision to create an accessible tool for skin lesion classification."
  },
  {
    id: 2,
    year: "Jan 2025",
    title: "Data Collection",
    description: "Gathered and preprocessed thousands of labeled skin lesion images for model training."
  },
  {
    id: 3,
    year: "Feb 2025",
    title: "Model Development",
    description: "Developed and trained CNN models, segmentation algorithms, and NLP components."
  },
  {
    id: 4,
    year: "March 2025",
    title: "Integration & Testing",
    description: "Combined all components and conducted extensive testing with dermatologists."
  },
  {
    id: 5,
    year: "April 2025",
    title: "Platform Launch",
    description: "Officially launched the DermAI platform for healthcare professionals worldwide."
  }
];

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef({});

  // Intersection Observer for animations
  useEffect(() => {
    const observers = {};
    
    const createObserver = (id) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [id]: true }));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      if (observerRefs.current[id]) {
        observer.observe(observerRefs.current[id]);
      }
      
      return observer;
    };
    
    // Create observers for each section
    observers.hero = createObserver('hero');
    observers.mission = createObserver('mission');
    observers.team = createObserver('team');
    observers.journey = createObserver('journey');
    observers.cta = createObserver('cta');
    
    return () => {
      // Cleanup observers
      Object.values(observers).forEach(observer => {
        observer.disconnect();
      });
    };
  }, []);

  // Set up refs for sections
  const setRef = (id) => (el) => {
    observerRefs.current[id] = el;
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section 
        ref={setRef('hero')} 
        className={`bg-gradient-to-br from-gray-900 via-gray-800 to-primary/90 text-white py-20 transition-opacity duration-1000 ${isVisible.hero ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About DermAI</h1>
            <p className="text-xl text-gray-300 mb-8">
              We're a team of AI researchers, developers, and medical professionals dedicated to improving dermatological diagnosis through artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={setRef('mission')} 
        className={`py-20 bg-white transition-all duration-1000 ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At DermAI, we believe that advanced technology should be accessible to healthcare providers everywhere. Our mission is to leverage artificial intelligence to improve the accuracy and speed of skin lesion diagnosis, ultimately leading to better patient outcomes.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                By combining convolutional neural networks, image segmentation, and natural language processing, we've created a comprehensive platform that assists dermatologists and general practitioners in identifying skin conditions with high precision.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Excellence</h3>
                    <p className="text-gray-600">Committed to the highest standards in AI and healthcare.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Education</h3>
                    <p className="text-gray-600">Dedicated to advancing medical knowledge through technology.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Medical AI Research"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Research-Backed</p>
                    <p className="text-gray-500 text-sm">Peer-Reviewed Methods</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={setRef('team')} 
        className={`py-20 bg-gray-50 transition-all duration-1000 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The brilliant minds behind DermAI's innovative technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative">
                  <img 
                    src={member.image || "/placeholder.svg"} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-white/80">{member.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a href={member.social.github} className="text-gray-500 hover:text-primary transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={member.social.linkedin} className="text-gray-500 hover:text-primary transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href={`mailto:${member.social.email}`} className="text-gray-500 hover:text-primary transition-colors">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section 
        ref={setRef('journey')} 
        className={`py-20 bg-white transition-all duration-1000 ${isVisible.journey ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The evolution of DermAI from concept to cutting-edge medical technology.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform md:translate-x-[-50%]"></div>

              {/* Timeline items */}
              {timeline.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`relative mb-12 ${
                    index % 2 === 0 ? 'md:ml-auto md:pl-12 md:pr-0 md:text-left' : 'md:mr-auto md:pr-12 md:pl-0 md:text-right'
                  } md:w-1/2 pl-12`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-auto md:right-0 top-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center transform md:translate-x-4">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  {/* Year badge */}
                  <div className={`inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                    index % 2 === 1 ? 'md:float-right' : ''
                  }`}>
                    {item.year}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={setRef('cta')} 
        className={`py-20 bg-gradient-to-br from-gray-900 to-primary/90 text-white transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Revolutionizing Dermatology
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the power of AI-assisted skin lesion classification today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/predict"
              className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
            >
              Try It Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-lg flex items-center justify-center transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
