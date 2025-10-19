'use client';

import React, { useState } from 'react';
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
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "oussama2101@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+216 44 377 533"
    }
  ];

  return (
    <section className="min-h-screen py-12 md:py-16 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Get In <span className="text-accent">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to start your project? <br /> Let's discuss how we can bring your ideas to life.
          </p>
        </div>

      
          {/* Contact Information */}
    

          {/* Contact Form */}
          <div className="lg:col-span-7 xl:col-span-8 bg-card rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border border-border/20">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Send a Message</h2>
              <p className="text-muted-foreground">
                Have questions or want to discuss a project? We'll respond within 24 hours.
              </p>
            </div>
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
                        <span>Message sent successfully! I'll get back to you soon.</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5" />
                        <span>Failed to send message. Please try again or use alternative contact methods.</span>
                      </>
                    )}
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium transition-all duration-200 transform hover:scale-[1.02]"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>

             
     
            </form>
          </div>
      </div>
    </section>
  );
}

export default Contact;