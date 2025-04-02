import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    name: "Nakul Makode",
    role: "AI Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Specializes in deep learning and computer vision algorithms.",
    social: {
      github: "https://github.com/NAKULMAK05",
      linkedin: "https://www.linkedin.com/in/nakul-makode15/",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Ansh Choube",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "Expert in building scalable web applications and APIs.",
    social: {
      github: "https://github.com/anshuuuuuuuuuuuuu",
      linkedin: "https://www.linkedin.com/in/ansh-choube-7263232b1/",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Harsh Thacker",
    role: "Data Scientist",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    bio: "Focuses on NLP and machine learning model optimization.",
    social: {
      github: "https://github.com/HarshT2106",
      linkedin: "https://www.linkedin.com/in/harsh-thacker-278a0a25b/",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Harsh Dakhare",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Creates intuitive and accessible user interfaces.",
    social: {
      github: "https://github.com/Harshdakhare4",
      linkedin: "https://www.linkedin.com/in/harsh-dakhare-2218a5251/",
      twitter: "https://twitter.com"
    }
  }
];

const TeamSection = () => {
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
            Meet Our Team
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The brilliant minds behind DermaScan AI
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative  overflow-hidden">
                <img 
                  src={member.image || "/placeholder.svg"} 
                  alt={member.name}
                  className="w-full h-64 object-cover text-white transition-transform hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${member.name}&background=3b82f6&color=fff&size=256`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 w-full flex justify-center space-x-3">
                    <a 
                      href={member.social.github} 
                      className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5 text-white" />
                    </a>
                    <a 
                      href={member.social.linkedin} 
                      className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5 text-white" />
                    </a>
                    <a 
                      href={member.social.twitter} 
                      className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
