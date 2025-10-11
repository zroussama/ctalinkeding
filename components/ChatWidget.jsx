'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Loader2, Zap, Brain } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Conversation flow states
  const [conversationContext, setConversationContext] = useState('welcome');
  
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hi! I'm Oussama's virtual assistant — here to help you explore his journey as a software architect and full-stack engineer.",
      suggestedReplies: ["🚀 View recent projects", "💼 Explore experience", "📩 Get in touch", "🧠 Skills & tech stack"]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [currentProvider, setCurrentProvider] = useState('');
  const [rateLimitInfo, setRateLimitInfo] = useState({ grokRemaining: 30, geminiRemaining: 15 });
  const messagesEndRef = useRef(null);

  // ⚠️ IMPORTANT: Replace with your actual n8n webhook URL
  const WEBHOOK_URL = 'http://localhost:5678/webhook-test/portfolio-chat';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getConversationHistory = () => {
    // Send last 6 messages (3 exchanges) for context
    return messages.slice(-6).map(msg => ({
      type: msg.type,
      text: msg.text
    }));
  };

  // Handle different conversation contexts
  const getContextualResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Welcome context
    if (conversationContext === 'welcome') {
      if (message.includes('project') || message.includes('🚀')) {
        setConversationContext('projects');
        return {
          text: "Oussama has built advanced full-stack apps, automation workflows, and AI tools.\n\nWhich type of project would you like to see?",
          suggestedReplies: ["⚙️ Full-Stack Web Apps", "🤖 AI & Automation (n8n, AgentKit)", "📊 Data Science Projects", "🌐 Cloud & DevOps"]
        };
      } else if (message.includes('experience') || message.includes('💼')) {
        setConversationContext('experience');
        return {
          text: "Oussama's experience spans CRM systems, data pipelines, and scalable cloud apps.\n\nWant a quick overview or a deep dive into one?",
          suggestedReplies: ["📋 Career timeline", "🏢 Companies & internships", "🧩 Technical achievements", "💡 Key projects per company"]
        };
      } else if (message.includes('contact') || message.includes('📩')) {
        setConversationContext('contact');
        return {
          text: "You can reach Oussama directly or connect professionally.\n\nWhich do you prefer?",
          suggestedReplies: ["📧 Send an email", "🔗 Visit LinkedIn", "💻 View GitHub", "👋 Schedule a meeting"]
        };
      } else if (message.includes('skill') || message.includes('🧠')) {
        setConversationContext('skills');
        return {
          text: "He's fluent across the full stack — from frontend to cloud automation.\n\nCurious about a specific area?",
          suggestedReplies: ["🖥️ Frontend (React, Next.js)", "🧠 Backend (Node.js, Laravel)", "☁️ DevOps (Docker, CI/CD)", "📈 Data & ML (Python, XGBoost)"]
        };
      }
    }
    
    // Projects context
    else if (conversationContext === 'projects') {
      // Add specific project details here
      return {
        text: `You selected: ${message}\n\n[Project details would be shown here with relevant information about ${message}]`,
        suggestedReplies: ["🔙 Back to main menu", "📂 View another category", "📞 Contact about this"]
      };
    }
    
    // Experience context
    else if (conversationContext === 'experience') {
      // Add specific experience details here
      return {
        text: `You selected: ${message}\n\n[Experience details would be shown here for ${message}]`,
        suggestedReplies: ["🔙 Back to main menu", "📅 View timeline", "📞 Contact about experience"]
      };
    }
    
    // Contact context
    else if (conversationContext === 'contact') {
      if (message.includes('email') || message.includes('📧')) {
        return {
          text: "📧 You can email Oussama at: oussama2101@gmail.com\n\n[Email template would open with pre-filled subject/body]",
          suggestedReplies: ["🔙 Back to contact options", "📞 Schedule a call", "🏠 Back to main menu"]
        };
      } else if (message.includes('linkedin') || message.includes('🔗')) {
        return {
          text: "🔗 Connect with Oussama on LinkedIn:\nhttps://linkedin.com/in/zroussama\n\n[Would open in new tab with tracking]",
          suggestedReplies: ["🔙 Back to contact options", "📧 Email instead", "🏠 Back to main menu"]
        };
      } else if (message.includes('github') || message.includes('💻')) {
        return {
          text: "💻 Check out Oussama's GitHub:\nhttps://github.com/zroussama\n\n[Would open in new tab with tracking]",
          suggestedReplies: ["🔙 Back to contact options", "🌟 Star a repo", "🏠 Back to main menu"]
        };
      } else if (message.includes('schedule') || message.includes('👋')) {
        return {
          text: "📅 Schedule a meeting with Oussama:\n[Calendar booking widget would be embedded here]\n\nOr suggest a time that works for you.",
          suggestedReplies: ["🔙 Back to contact options", "📧 Email instead", "🏠 Back to main menu"]
        };
      }
    }
    
    // Default fallback response
    if (message.includes('back') || message.includes('menu') || message.includes('🏠')) {
      setConversationContext('welcome');
      return {
        text: "👋 Welcome back! How can I help you explore Oussama's professional journey?",
        suggestedReplies: ["🚀 View recent projects", "💼 Explore experience", "📩 Get in touch", "🧠 Skills & tech stack"]
      };
    }
    
    // Default response for unhandled messages
    return {
      text: "I'm not sure how to respond to that. Would you like to see the main menu options?",
      suggestedReplies: ["🚀 View projects", "💼 Experience", "📩 Contact info", "🧠 Skills"]
    };
  };

  const sendMessage = async (messageText) => {
    const textToSend = messageText || inputMessage.trim();
    
    if (!textToSend) return;

    const userMessage = { type: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          sender: 'user',
          sessionId: sessionId,
          conversationHistory: getConversationHistory(),
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update rate limit info if provided
      if (data.rateLimitInfo) {
        setRateLimitInfo(data.rateLimitInfo);
        setCurrentProvider(data.rateLimitInfo.currentProvider);
      }
      
      // Get contextual response based on the current conversation flow
      const contextualResponse = getContextualResponse(textToSend);
      
      const botMessage = {
        type: 'bot',
        text: contextualResponse.text,
        suggestedReplies: contextualResponse.suggestedReplies || [],
        provider: data?.provider || 'local',
        rateLimited: data?.rateLimited || false,
        waitTime: data?.waitTime
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage;
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = {
          type: 'bot',
          text: "🔌 Oops! I couldn't connect to the chat service. This might be because:\n\n• The n8n server isn't running locally\n• The webhook URL is incorrect\n• There's a network issue\n\nYou can try again or contact me directly.",
          suggestedReplies: ["🔄 Try again", "📧 Email me", "🔗 LinkedIn", "💻 GitHub"]
        };
      } else if (error.message.includes('404')) {
        errorMessage = {
          type: 'bot',
          text: "🔍 The chat service endpoint wasn't found. The webhook URL might be incorrect or the n8n workflow isn't properly set up.",
          suggestedReplies: ["🔄 Retry", "📧 Contact directly", "📋 View setup guide"]
        };
      } else if (error.message.includes('500')) {
        errorMessage = {
          type: 'bot',
          text: "⚠️ The chat service encountered an error. This is likely a temporary issue on the server side.",
          suggestedReplies: ["🔄 Try again", "📧 Email instead", "📞 Schedule a call"]
        };
      } else {
        errorMessage = {
          type: 'bot',
          text: "❌ Oops! Something went wrong. Please try again or contact me directly.",
          suggestedReplies: ["🔄 Try again", "📧 Email me", "🔗 LinkedIn"]
        };
      }
      
      // Add the error message to the chat
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendClick = () => {
    if (inputMessage.trim() && !isLoading) {
      sendMessage();
    }
  };

  const handleSuggestedReply = (reply) => {
    sendMessage(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const getProviderIcon = (provider) => {
    if (provider === 'grok') return <Zap size={12} className="text-purple-500" />;
    if (provider === 'gemini') return <Brain size={12} className="text-blue-500" />;
    return null;
  };

  const getProviderBadge = (provider) => {
    if (!provider || provider === 'quick') return null;
    
    const configs = {
      grok: { label: 'Grok', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      gemini: { label: 'Gemini', color: 'bg-blue-100 text-blue-700 border-blue-200' }
    };
    
    const config = configs[provider];
    if (!config) return null;
    
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${config.color} mt-1`}>
        {getProviderIcon(provider)}
        <span>{config.label}</span>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent hover:bg-accent/90 text-primary rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
          <span className="text-sm font-medium pr-2">Chat with me</span>
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-accent text-primary p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Oussama's Assistant</h3>
                <p className="text-xs text-primary/80">AI-powered responses</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary/10 rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mt-2 flex gap-2 text-xs">
              <div className="bg-primary/10 rounded px-2 py-1 flex items-center gap-1">
                <Zap size={10} />
                <span>Grok: {rateLimitInfo.grokRemaining}/30</span>
              </div>
              <div className="bg-primary/10 rounded px-2 py-1 flex items-center gap-1">
                <Brain size={10} />
                <span>Gemini: {rateLimitInfo.geminiRemaining}/15</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((message, index) => (
              <div key={index}>
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[80%]">
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.type === 'user'
                          ? 'bg-accent text-primary rounded-br-none'
                          : message.rateLimited 
                            ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 shadow-sm rounded-bl-none border border-orange-200 dark:border-orange-800'
                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm rounded-bl-none border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                        </div>
                        {message.type === 'bot' && message.provider && (
                        <div className="mt-1">
                            {getProviderBadge(message.provider)}
                        </div>
                        )}
                    </div>
                    </div>

                    {message.type === 'bot' && message.suggestedReplies && message.suggestedReplies.length > 0 && index === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-2">
                        {message.suggestedReplies.map((reply, i) => (
                        <button
                            key={i}
                            onClick={() => handleSuggestedReply(reply)}
                            disabled={isLoading}
                            className="text-xs bg-white dark:bg-gray-700 hover:bg-accent/20 dark:hover:bg-accent/30 text-black dark:text-white border border-gray-300 dark:border-gray-500 rounded-full px-3 py-1.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                        >
                            {reply}
                        </button>
                        ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">
                      {currentProvider === 'grok' ? 'Grok thinking...' : 
                       currentProvider === 'gemini' ? 'Gemini thinking...' : 
                       'Thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                maxLength={500}
                className="flex-1 border text-black border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={handleSendClick}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-accent hover:bg-accent/90 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-primary rounded-full p-2 transition-colors"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-400">
                Made with love  · {inputMessage.length}/500
              </p>
              {currentProvider && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Using: {currentProvider === 'grok' ? '⚡ Grok' : currentProvider === 'gemini' ? '🧠 Gemini' : 'Quick response'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
