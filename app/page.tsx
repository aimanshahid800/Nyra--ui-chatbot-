'use client'

import { useState } from 'react'
import { Send, Plus, Settings, Sun, Moon, Edit3, MessageSquare, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatHistory {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

export default function ChatbotInterface() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I assist you today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Getting Started',
      lastMessage: 'How do I use this chatbot?',
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      title: 'Project Planning',
      lastMessage: 'Help me plan my next project',
      timestamp: new Date(Date.now() - 172800000)
    },
    {
      id: '3',
      title: 'Code Review',
      lastMessage: 'Can you review this code?',
      timestamp: new Date(Date.now() - 259200000)
    }
  ])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your message! This is a simulated response from Nyra, your AI assistant.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const themeClass = isDarkMode ? 'dark' : 'light'

  return (
    <div className={`${themeClass} min-h-screen transition-all duration-500`}>
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/abstract-neural-network.png')`
          }}
        />
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDarkMode 
            ? 'bg-black/60 backdrop-blur-sm' 
            : 'bg-white/40 backdrop-blur-sm'
        }`} />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className={`w-80 border-r transition-all duration-300 ${
          isDarkMode 
            ? 'bg-black/20 border-purple-500/20 backdrop-blur-xl' 
            : 'bg-white/20 border-gray-300/30 backdrop-blur-xl'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-purple-500/20">
              <div className="flex items-center justify-between mb-6">
                <h1 className={`${pacifico.className} text-2xl font-bold transition-all duration-300 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  Nyra
                </h1>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full transition-all duration-300 ${
                    isDarkMode 
                      ? 'hover:bg-purple-500/20 text-purple-300' 
                      : 'hover:bg-purple-100 text-purple-600'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
                <div className="flex items-center space-x-2">
                  <Sun className={`h-4 w-4 ${
                    isDarkMode ? 'text-gray-500' : 'text-yellow-500'
                  }`} />
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={setIsDarkMode}
                    className="data-[state=checked]:bg-purple-600"
                  />
                  <Moon className={`h-4 w-4 ${
                    isDarkMode ? 'text-purple-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>

              {/* New Chat Button */}
              <Button 
                className={`w-full justify-start transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30'
                    : 'bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300'
                }`}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className={`text-sm font-medium mb-3 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Recent Chats
              </h3>
              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      isDarkMode
                        ? 'hover:bg-white/10 text-gray-300'
                        : 'hover:bg-black/10 text-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {chat.title}
                        </p>
                        <p className={`text-xs truncate ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-purple-600/20 text-purple-400' 
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                
                <div
                  className={`max-w-2xl p-4 rounded-2xl transition-all duration-300 ${
                    message.role === 'user'
                      ? isDarkMode
                        ? 'bg-purple-600/20 text-white backdrop-blur-sm border border-purple-500/30'
                        : 'bg-purple-600 text-white'
                      : isDarkMode
                        ? 'bg-white/10 text-gray-100 backdrop-blur-sm border border-white/20'
                        : 'bg-white/80 text-gray-800 backdrop-blur-sm border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className={`text-xs mt-2 ${
                    message.role === 'user'
                      ? isDarkMode ? 'text-purple-300' : 'text-purple-200'
                      : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6">
            <div className={`relative rounded-2xl transition-all duration-300 ${
              isDarkMode
                ? 'bg-black/20 backdrop-blur-xl border border-purple-500/30 shadow-2xl'
                : 'bg-white/30 backdrop-blur-xl border border-gray-300/50 shadow-xl'
            }`}>
              <div className="p-4">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className={`min-h-[60px] resize-none border-0 bg-transparent focus:ring-0 focus:outline-none ${
                    isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                  }`}
                />
                
                <div className="flex items-center justify-between mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`transition-all duration-300 ${
                      isDarkMode
                        ? 'hover:bg-purple-500/20 text-purple-300'
                        : 'hover:bg-purple-100 text-purple-600'
                    }`}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit & Resend
                  </Button>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className={`transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
