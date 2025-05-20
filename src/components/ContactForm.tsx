'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

enum FormStatus {
  Idle,
  Submitting,
  Success,
  Error
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>(FormStatus.Idle);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Veuillez saisir votre nom' : undefined;
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? 'Veuillez saisir une adresse email valide' 
          : undefined;
      case 'message':
        return value.trim() === '' ? 'Veuillez saisir un message' : undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ 
        ...prev, 
        [name]: validateField(name, value) 
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ 
      ...prev, 
      [name]: validateField(name, value) 
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    // Validate each field
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    // Validate form
    if (!validateForm()) return;
    
    setStatus(FormStatus.Submitting);
    
    // Simulate form submission with a delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful form submission
      setStatus(FormStatus.Success);
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(FormStatus.Idle);
      }, 5000);
    } catch (error) {
      setStatus(FormStatus.Error);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus(FormStatus.Idle);
        setErrorMessage('');
      }, 5000);
    }
  };

  const inputClasses = (name: keyof FormData) => `
    w-full p-3 border rounded-lg focus:outline-none transition-all duration-300
    ${touched[name] && errors[name] 
      ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200' 
      : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}
  `;

  return (
    <div className="grid md:grid-cols-5 gap-10">
      <div className="md:col-span-2 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Contactez-moi</h3>
        <p className="text-gray-600 mb-8">
          N'hésitez pas à me contacter pour toute opportunité de stage ou question.
        </p>
        
        <div className="space-y-6">
          <motion.div 
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
              <FaEnvelope size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Email</h4>
              <a 
                href="mailto:salamsaibou2002@gmail.com" 
                className="text-blue-600 hover:underline transition-all"
              >
                salamsaibou2002@gmail.com
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <FaPhone size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Téléphone</h4>
              <a 
                href="tel:+33767438781" 
                className="text-blue-600 hover:underline transition-all"
              >
                +33 7 67 43 87 81
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="rounded-full bg-amber-100 p-3 text-amber-600">
              <FaMapMarkerAlt size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Localisation</h4>
              <p className="text-gray-600">Rouen, France</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="md:col-span-3">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {status === FormStatus.Success ? (
              <motion.div
                key="success"
                className="flex flex-col items-center justify-center py-10 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 mb-4 text-green-500 flex items-center justify-center">
                  <FaCheckCircle size={56} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Message envoyé !</h3>
                <p className="text-gray-600">
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
              </motion.div>
            ) : status === FormStatus.Error ? (
              <motion.div
                key="error"
                className="flex flex-col items-center justify-center py-10 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 mb-4 text-red-500 flex items-center justify-center">
                  <FaExclamationCircle size={56} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Une erreur s'est produite</h3>
                <p className="text-gray-600">{errorMessage}</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Votre nom"
                    className={inputClasses('name')}
                  />
                  {touched.name && errors.name && (
                    <motion.p 
                      className="mt-1 text-sm text-red-600"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="votre.email@exemple.com"
                    className={inputClasses('email')}
                  />
                  {touched.email && errors.email && (
                    <motion.p 
                      className="mt-1 text-sm text-red-600"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Votre message..."
                    rows={5}
                    className={inputClasses('message')}
                  />
                  {touched.message && errors.message && (
                    <motion.p 
                      className="mt-1 text-sm text-red-600"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={status === FormStatus.Submitting}
                  className={`
                    w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2
                    transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 
                    ${status === FormStatus.Submitting 
                      ? 'bg-blue-400 cursor-wait' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}
                  `}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === FormStatus.Submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Envoyer le message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm; 