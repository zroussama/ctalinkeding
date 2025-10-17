"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle, Loader2, Zap, Brain } from "lucide-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Conversation flow states
  const [conversationContext, setConversationContext] = useState("welcome");
  const [previousContext, setPreviousContext] = useState("welcome");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "👋 Hi! I'm Oussama's virtual assistant — here to help you explore his journey as a software architect and full-stack engineer.",
      suggestedReplies: [
        "🚀 View recent projects",
        "💼 Explore experience",
        "📩 Get in touch",
        "🧠 Skills & tech stack",
      ],
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const [currentProvider, setCurrentProvider] = useState("");
  const [rateLimitInfo, setRateLimitInfo] = useState({
    grokRemaining: 30,
    geminiRemaining: 15,
  });
  const renderMarkdown = (text) => {
    // Handle line breaks
    let formattedText = text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');

    // Handle bold text **text**
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Handle italic text *text*
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Handle bullet points
    formattedText = formattedText.replace(/^- (.*)/gm, '• $1');

    // Handle numbered lists
    formattedText = formattedText.replace(/^(\d+)\. (.*)/gm, '<p>$1. $2</p>');

    // Wrap in paragraph if not already wrapped
    if (!formattedText.startsWith('<p>')) {
      formattedText = '<p>' + formattedText + '</p>';
    }
    return formattedText;
  };

  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);
  // ⚠️ IMPORTANT: Replace with your actual n8n webhook URL
  const WEBHOOK_URL = "http://localhost:5678/webhook-test/chat";

  const scrollToBottom = (force = false) => {
    if (messagesEndRef.current) {
      const element = messagesEndRef.current;
      const container = element.parentElement;

      if (container) {
        // Check if user is near bottom (within 100px) or force scroll
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;

        if (force || isNearBottom) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
          });
        }
      } else {
        // Fallback to direct scroll if container not found
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 500);
    };

    const container = messagesEndRef.current?.parentElement;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const getConversationHistory = () => {
    // Send last 6 messages (3 exchanges) for context
    return messages.slice(-6).map((msg) => ({
      type: msg.type,
      text: msg.text,
    }));
  };

  // Handle different conversation contexts
  const getContextualResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Welcome context
    if (conversationContext === "welcome") {
      if (message.includes("project") || message.includes("🚀")) {
        setPreviousContext(conversationContext);
        setConversationContext("projects");
        return {
          text: "**Oussama has built advanced full-stack apps, automation workflows, and AI tools across multiple domains.**\n\n**Core Expertise Areas:**\n\n🧩 **Data Engineering**\n• ETL & ELT Pipeline Development\n• Real-time Data Processing\n• Data Warehousing\n• Data Modeling, Architecture & Governance\n\n💻 **Software Development**\n• Backend: Python, Java (Spring Boot), PHP (Laravel)\n• Frontend: React, Angular, Next.js\n• Databases: PostgreSQL, MongoDB, MySQL, Redis, Elasticsearch, Meilisearch\n• API Design: REST, GraphQL\n\n⚙️ **DevOps & Cloud**\n• CI/CD: Jenkins, GitLab CI, GitHub Actions\n• Monitoring: Prometheus, Grafana\n• Containers & Deployment: Docker, Kubernetes\n• Version Control: GitHub, GitLab\n• Agile / Scrum Methodologies\n\n*Which type of project would you like to explore?*",
          suggestedReplies: [
            "🔙 Back",
            "⚙️ Full-Stack Web Apps",
            "🤖 AI & Automation (n8n, AgentKit)",
            "📊 Data architecture Projects",
            "🌐 BI & Dashboards",
          ],
        };
      } else if (message.includes("experience") || message.includes("💼")) {
        setPreviousContext(conversationContext);
        setConversationContext("experience");
        return {
          text: "Oussama's experience spans CRM systems, data pipelines, and scalable cloud apps.\n\nWant a quick overview or a deep dive into one?",
          suggestedReplies: [
            "🔙 Back",
            "📋 Career timeline",
            "🏢 Companies & internships",
            "🧩 Technical achievements",
            "💡 Key projects per company",
          ],
        };
      } else if (message.includes("contact") || message.includes("📩")) {
        setPreviousContext(conversationContext);
        setConversationContext("contact");
        return {
          text: "You can reach Oussama directly or connect professionally.\n\nWhich do you prefer?",
          suggestedReplies: [
            "🔙 Back",
            "📧 Send an email",
            "🔗 Visit LinkedIn",
            "💻 View GitHub",
            "🌐 View Portfolio",
            "👋 Schedule a meeting",
          ],
        };
      } else if (message.includes("skill") || message.includes("🧠")) {
        setConversationContext("skills");
        return {
          text: "He's fluent across the full stack — from frontend to cloud automation.\n\nCurious about a specific area?",
          suggestedReplies: [
            "🔙 Back",
            "🖥️ Frontend (React, Next.js)",
            "🧠 Backend (Node.js, Laravel)",
            "☁️ DevOps (Docker, CI/CD)",
            "📈 Data & ML (Python, XGBoost)",
          ],
        };
      }
    }

    // Projects context
    else if (conversationContext === "projects") {
      if (message.includes("back") || message.includes("🔙")) {
        setConversationContext(previousContext);
        return {
          text: "👋 Back to previous menu. What would you like to explore?",
          suggestedReplies: [
            "🚀 View recent projects",
            "💼 Explore experience",
            "📩 Get in touch",
            "🧠 Skills & tech stack",
          ],
        };
      }
      // Add specific project details here
      return {
        text: `You selected: ${message}\n\n[Project details would be shown here with relevant information about ${message}]`,
        suggestedReplies: [
          "🔙 Back",
          "🏠 Back to main menu",
          "📂 View another category",
          "📞 Contact about this",
        ],
      };
    }

    // Experience context
    else if (conversationContext === "experience") {
      if (message.includes("back") || message.includes("🔙")) {
        setConversationContext(previousContext);
        return {
          text: "👋 Back to previous menu. What would you like to explore?",
          suggestedReplies: [
            "🚀 View recent projects",
            "💼 Explore experience",
            "📩 Get in touch",
            "🧠 Skills & tech stack",
          ],
        };
      }
      // Add specific experience details here
      return {
        text: `You selected: ${message}\n\n[Experience details would be shown here for ${message}]`,
        suggestedReplies: [
          "🔙 Back",
          "🏠 Back to main menu",
          "📅 View timeline",
          "📞 Contact about experience",
        ],
      };
    }

    // Contact context
    else if (conversationContext === "contact") {
      if (message.includes("back") || message.includes("🔙")) {
        setConversationContext(previousContext);
        return {
          text: "👋 Back to previous menu. What would you like to explore?",
          suggestedReplies: [
            "🚀 View recent projects",
            "💼 Explore experience",
            "📩 Get in touch",
            "🧠 Skills & tech stack",
          ],
        };
      }
      if (message.includes("email") || message.includes("📧")) {
        return {
          text: "**📧 You can email Oussama at:** oussama2101@gmail.com\n\n*An email template will open with a pre-filled subject to make contacting easier.*",
          suggestedReplies: [
            "🔙 Back",
            "📞 Schedule a call",
            "🏠 Back to main menu",
          ],
        };
      } else if (message.includes("linkedin") || message.includes("🔗")) {
        return {
          text: "**🔗 Connect with Oussama on LinkedIn:**\nhttps://linkedin.com/in/zroussama\n\n*This platform is ideal for exploring his professional background and recommendations.*",
          suggestedReplies: [
            "🔙 Back",
            "📧 Email instead",
            "🏠 Back to main menu",
          ],
        };
      } else if (message.includes("github") || message.includes("💻")) {
        return {
          text: "**💻 Check out Oussama's GitHub:**\nhttps://github.com/zroussama\n\n*You'll find his open-source projects and technical contributions there.*",
          suggestedReplies: [
            "🔙 Back",
            "🌟 Star a repo",
            "🏠 Back to main menu",
          ],
        };
      } else if (message.includes("portfolio") || message.includes("🌐")) {
        return {
          text: "**🌐 Visit Oussama's portfolio:**\nhttps://ohzed.netlify.app/\n\n*You'll find a detailed presentation of his projects, skills, and professional experience.*",
          suggestedReplies: [
            "🔙 Back",
            "📧 Contact for a project",
            "🏠 Back to main menu",
          ],
        };
      } else if (message.includes("schedule") || message.includes("👋")) {
        return {
          text: "**📅 Schedule a meeting with Oussama:**\n*You can contact him via email (oussama2101@gmail.com) or LinkedIn to set up a call.*\n\n*Or check out his portfolio for more information:* https://ohzed.netlify.app/",
          suggestedReplies: [
            "🔙 Back",
            "📧 Email to schedule",
            "🏠 Back to main menu",
          ],
        };
      }
    }

    // Skills context
    else if (conversationContext === "skills") {
      if (message.includes("back") || message.includes("🔙")) {
        setConversationContext(previousContext);
        return {
          text: "👋 Back to previous menu. What would you like to explore?",
          suggestedReplies: [
            "🚀 View recent projects",
            "💼 Explore experience",
            "📩 Get in touch",
            "🧠 Skills & tech stack",
          ],
        };
      }
      // Add specific skills details here
      return {
        text: `You selected: ${message}\n\n[Skills details would be shown here for ${message}]`,
        suggestedReplies: [
          "🔙 Back",
          "🏠 Back to main menu",
          "📚 View all skills",
          "💼 Experience with this skill",
        ],
      };
    }

    // Default fallback response
    if (
      message.includes("back") ||
      message.includes("menu") ||
      message.includes("🏠")
    ) {
      setConversationContext("welcome");
      return {
        text: "👋 Welcome back! How can I help you explore Oussama's professional journey?",
        suggestedReplies: [
          "🚀 View recent projects",
          "💼 Explore experience",
          "📩 Get in touch",
          "🧠 Skills & tech stack",
        ],
      };
    }

    // Default response for unhandled messages
    return {
      text: "I'm not sure how to respond to that. Let me help you explore Oussama's professional background!\n\n**Quick Overview:**\n*Oussama Zribi is a Software Architect & Data Engineer based in Tunis, Tunisia, with expertise in full-stack development and data systems.*\n\n**🎓 Education & Certifications:**\n• Software Engineering — ESPRIT, École d'Ingénieurs\n• Business Intelligence License — Université Lyon Claude Bernard\n• Business Computing License — ESPRIT School of Business\n\n**🚀 Key Projects:**\n• ComUnity CRM Platform — Client management and network visualization app (Laravel + React + ReactFlow + Meilisearch)\n• Data Pipeline Automation — ETL workflow reducing manual data handling by 60% using SSIS and PostgreSQL\n• BI Dashboard — Real-time business insights system improving decision metrics by 45%\n\n**📬 Contact Information:**\n• **Email:** oussama2101@gmail.com\n• **LinkedIn:** linkedin.com/in/zroussama\n• **GitHub:** github.com/zroussama\n• **Portfolio:** https://ohzed.netlify.app/\n\n*What would you like to know more about?*",
      suggestedReplies: [
        "🚀 View projects",
        "💼 Experience",
        "📩 Contact info",
        "🧠 Skills",
      ],
    };
  };

  const sendMessage = async (messageText) => {
    const textToSend = messageText || inputMessage.trim();

    if (!textToSend) return;

    const userMessage = { type: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: messages.slice(-6).map((msg) => ({
            role: msg.type === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Process the response from your n8n/Grok AI
      let botResponse = {
        type: "bot",
        text:
          data.response ||
          "I'm not sure how to respond to that. Could you rephrase?",
        suggestedReplies: data.suggestedReplies || [
          "Tell me more",
          "What else can you do?",
          "How can I contact you?",
        ],
        provider: data.provider || "grok",
      };

      // If the AI response includes buttons/quick replies, use those
      if (data.buttons && Array.isArray(data.buttons)) {
        botResponse.suggestedReplies = data.buttons.map(
          (btn) => btn.title || btn
        );
      }

      setMessages((prev) => [...prev, botResponse]);
      setCurrentProvider(data.provider || "grok");

      // Get contextual response based on the current conversation flow
      const contextualResponse = getContextualResponse(textToSend);

      const botMessage = {
        type: "bot",
        text: contextualResponse.text,
        suggestedReplies: contextualResponse.suggestedReplies || [],
        provider: data?.provider || "local",
        rateLimited: data?.rateLimited || false,
        waitTime: data?.waitTime,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Try to get contextual response first when webhook fails
      const contextualResponse = getContextualResponse(textToSend);

      // If we have a contextual response, use it instead of error message
      if (contextualResponse && contextualResponse.text && !contextualResponse.text.includes("I'm not sure")) {
        const botMessage = {
          type: "bot",
          text: contextualResponse.text,
          suggestedReplies: contextualResponse.suggestedReplies || [
            "🔄 Try again",
            "📧 Email me",
            "🔗 LinkedIn",
            "💻 GitHub",
          ],
          provider: "local",
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Fallback to error messages if no contextual response
        let errorMessage;
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = {
            type: 'bot',
            text: "🔌 I couldn't connect to the chat service, but I can still help with local responses!\n\nWhat would you like to know about Oussama?",
            suggestedReplies: [
              "🚀 View projects",
              "💼 Experience",
              "📩 Contact info",
              "🧠 Skills",
            ]
          };
        } else if (error.message.includes('404')) {
          errorMessage = {
            type: 'bot',
            text: "🔍 Chat service not found, but I have local knowledge about Oussama's work.\n\nWhat interests you?",
            suggestedReplies: [
              "🚀 View projects",
              "💼 Experience",
              "📩 Contact info",
              "🧠 Skills",
            ]
          };
        } else if (error.message.includes('500')) {
          errorMessage = {
            type: 'bot',
            text: "⚠️ Service temporarily down, but I can share information about Oussama locally.\n\nChoose a topic:",
            suggestedReplies: [
              "🚀 View projects",
              "💼 Experience",
              "📩 Contact info",
              "🧠 Skills",
            ]
          };
        } else {
          errorMessage = {
            type: 'bot',
            text: "❌ Connection issue, but I have Oussama's information ready locally!\n\nWhat would you like to explore?",
            suggestedReplies: [
              "🚀 View projects",
              "💼 Experience",
              "📩 Contact info",
              "🧠 Skills",
            ]
          };
        }

        setMessages((prev) => [...prev, errorMessage]);
      }
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const getProviderIcon = (provider) => {
    if (provider === "grok")
      return <Zap size={12} className="text-purple-500" />;
    if (provider === "gemini")
      return <Brain size={12} className="text-blue-500" />;
    return null;
  };

  const getProviderBadge = (provider) => {
    if (!provider || provider === "quick") return null;

    const configs = {
      grok: {
        label: "Grok",
        color: "bg-purple-100 text-purple-700 border-purple-200",
      },
      gemini: {
        label: "Gemini",
        color: "bg-blue-100 text-blue-700 border-blue-200",
      },
    };

    const config = configs[provider];
    if (!config) return null;

    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${config.color} mt-1`}
      >
        {getProviderIcon(provider)}
        <span>{config.label}</span>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <style jsx>{`
        .markdown-content {
          font-size: 0.875rem;
          line-height: 1.625;
        }

        .markdown-content strong {
          font-weight: 600;
        }

        .markdown-content em {
          font-style: italic;
        }

        .markdown-content p {
          margin: 0 0 0.75rem 0;
        }

        .markdown-content p:last-child {
          margin-bottom: 0;
        }

        .markdown-content br {
          display: block;
          margin: 0.25rem 0;
          content: "";
        }

        .markdown-content • {
          margin-left: 1rem;
        }
      `}</style>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent hover:bg-accent/90 text-primary rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
          <span className="text-xs sm:text-sm font-medium pr-1 sm:pr-2">Chat</span>
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-[calc(100vw-2rem)] sm:w-96 h-[80vh] max-h-[700px] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-in-out">
          <div className="bg-accent text-primary p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Oussama s Assistant</h3>
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
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((message, index) => (
              <div key={index} className="w-full">
                <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[90%] sm:max-w-[80%]">
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.type === "user"
                        ? "bg-accent text-primary rounded-br-none"
                        : message.rateLimited
                        ? "bg-orange-50 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 shadow-sm rounded-bl-none border border-orange-200 dark:border-orange-800"
                        : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm rounded-bl-none border border-gray-200 dark:border-gray-600"
                    }`}>
                      <div
                        className="text-sm leading-relaxed break-words markdown-content"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(message.text) }}
                      />
                    </div>
                    {message.type === "bot" && message.provider && (
                      <div className="mt-1">
                        {getProviderBadge(message.provider)}
                      </div>
                    )}
                  </div>
                </div>

                {message.type === "bot" &&
                  message.suggestedReplies &&
                  message.suggestedReplies.length > 0 &&
                  index === messages.length - 1 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 ml-0 sm:ml-2">
                      {message.suggestedReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestedReply(reply)}
                          disabled={isLoading}
                          className="text-xs bg-white dark:bg-gray-700 hover:bg-accent/20 dark:hover:bg-accent/30 text-black dark:text-white border border-gray-300 dark:border-gray-500 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex-shrink-0"
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
                      {currentProvider === "grok"
                        ? "Grok is thinking..."
                        : currentProvider === "gemini"
                        ? "Gemini is thinking..."
                        : "Thinking..."}
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
                className="flex-1 border text-black border-gray-300 dark:border-gray-600 rounded-full px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={handleSendClick}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-accent hover:bg-accent/90 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-primary rounded-full p-2 transition-colors flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-400 hidden sm:block">
                Made with Love · {inputMessage.length}/500
              </p>
              {currentProvider && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  used :{" "}
                  {currentProvider === "grok"
                    ? "⚡ Grok"
                    : currentProvider === "gemini"
                    ? "🧠 Gemini"
                    : "Réponse rapide"}
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
