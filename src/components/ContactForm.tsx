'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFocus = (field: string) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission with a delay
    setTimeout(() => {
      // Simulate success or error based on email format (this is just for demo)
      if (formData.email.includes('@') && formData.message.length > 10) {
        setFormStatus('success');
        // Clear form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setFormStatus('error');
      }
    }, 1500);
  };
  
  // Input field animation variants
  const inputVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * i,
        duration: 0.5
      }
    }),
    focus: { 
      scale: 1.02,
      boxShadow: "0 4px 20px rgba(79, 70, 229, 0.15)",
      borderColor: "#6366f1",
      transition: { duration: 0.2 }
    }
  };
  
  // Form status animation variants
  const statusVariants = {
    hidden: { 
      opacity: 0, 
      y: -20, 
      height: 0 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };
  
  // Button animation variants
  const buttonVariants = {
    idle: { 
      scale: 1
    },
    submitting: { 
      scale: 0.95
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Envoyez-moi un message</h3>
      
      {formStatus === 'success' && (
        <motion.div
          className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 flex items-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={statusVariants}
        >
          <FaCheck className="mr-2" />
          <span>Votre message a été envoyé avec succès !</span>
        </motion.div>
      )}
      
      {formStatus === 'error' && (
        <motion.div
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 flex items-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={statusVariants}
        >
          <FaExclamationTriangle className="mr-2" />
          <span>Une erreur s'est produite. Veuillez vérifier vos informations et réessayer.</span>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.div
          custom={0}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={inputVariants}
          animate={focusedField === 'name' ? 'focus' : ''}
        >
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="Votre nom"
            disabled={formStatus === 'submitting'}
          />
        </motion.div>
        
        <motion.div
          custom={1}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={inputVariants}
          animate={focusedField === 'email' ? 'focus' : ''}
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="votre@email.com"
            disabled={formStatus === 'submitting'}
          />
        </motion.div>
        
        <motion.div
          custom={2}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={inputVariants}
          animate={focusedField === 'subject' ? 'focus' : ''}
        >
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sujet
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => handleFocus('subject')}
            onBlur={handleBlur}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            disabled={formStatus === 'submitting'}
          >
            <option value="">Sélectionner un sujet</option>
            <option value="stage">Proposition de stage</option>
            <option value="info">Demande d'information</option>
            <option value="other">Autre</option>
          </select>
        </motion.div>
        
        <motion.div
          custom={3}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={inputVariants}
          animate={focusedField === 'message' ? 'focus' : ''}
        >
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Votre message..."
            disabled={formStatus === 'submitting'}
          />
        </motion.div>
        
        <motion.button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg shadow-md flex items-center justify-center space-x-2 relative overflow-hidden group"
          initial="idle"
          animate={formStatus === 'submitting' ? 'submitting' : 'idle'}
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          disabled={formStatus === 'submitting'}
        >
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 group-hover:w-full"></span>
          
          <span className="relative z-10 flex items-center">
            {formStatus === 'submitting' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                <span>Envoyer</span>
              </>
            )}
          </span>
        </motion.button>
      </form>
    </div>
  );
};

export default ContactForm; 