'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  // Web3Forms Access Key (replace with your actual key)
  const WEB3FORMS_KEY = "16978a61-190e-4abb-91cf-d1366d928f82"; // Get from https://web3forms.com/

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...formData,
          from_name: "Oussama's Portfolio Contact Form",
          subject: `New Contact: ${formData.subject}`,
          redirect: false
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-accent" />,
      title: "Email",
      value: "oussama2101@gmail.com",
      href: "mailto:oussama2101@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5 text-accent" />,
      title: "Phone",
      value: "+216 44 377 533",
      href: "tel:+21644377533"
    },
    {
      icon: <MapPin className="h-5 w-5 text-accent" />,
      title: "Location",
      value: "Tunis, Tunisia",
      href: "https://maps.google.com?q=Tunis,Tunisia"
    }
  ];

  return (
    <section className="relative min-h-screen py-12 md:py-16 bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header with animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
     
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r  bg-clip-text text-white">
            Let s Work <span className="text-accent">Together</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss potential opportunities? <br className="hidden md:block" /> I would love to hear from you.
          </p>
        </motion.div>

      
          {/* Contact Information */}
    

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/5 overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-accent/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 -ml-20 -mb-20 bg-primary/10 rounded-full filter blur-3xl"></div>
            
            <div className="relative z-10">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/90 mb-1.5">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      onChange={handleChange}
                      placeholder="Your full name"
                      disabled={isSubmitting}
                      className="block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground/90 mb-1.5">
                    Subject <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    disabled={isSubmitting}
                    className="text-black"

                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/90 mb-1.5">
                    Your Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, requirements, or just say hello!"
                    disabled={isSubmitting}
                    className="resize-none text-black"
                  />
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <div className={`p-4 rounded-lg flex items-center space-x-2 ${
                    submitStatus === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus === 'success' ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span>Message sent successfully! I will get back to you soon.</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5" />
                        <span>Failed to send message. Please try again or use alternative contact methods.</span>
                      </>
                    )}
                  </div>
                )}

                <div className="pt-2 w-full">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative overflow-hidden w-full px-8 py-6 text-base font-medium transition-all duration-300 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/900 flex items-center justify-center ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-accent/20'
                    }`}
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </Button>
                </div>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-green-500 font-medium">Message Sent Successfully!</p>
                      <p className="text-green-400 text-sm mt-1">Thank you for reaching out. I will get back to you soon!</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-500 font-medium">Something went wrong</p>
                      <p className="text-red-400 text-sm mt-1">Please try again later or contact me directly at oussama2101@gmail.com</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
          
          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
              >
                <a 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-base font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }


export default Contact;