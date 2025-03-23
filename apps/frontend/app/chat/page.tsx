'use client';

import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Zap, Send } from "lucide-react";
import Link from 'next/link';
import axios from 'axios';
import { BACKEND_URL } from '@/config';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setTyping(true); 

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }
      const response = await axios.post(`${BACKEND_URL}/chat`, {message} , {
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
      });
      const botReply = response.data.reply;

      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: botReply,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]); 
    } catch (error) {
      console.error("Error fetching chat response", error);
    } finally {
      setTyping(false); 
    }
  };

  return (
    <div className="min-h-screen bg-black">
        
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-green-500/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Zap className="w-6 h-6 text-green-500 animate-pulse group-hover:animate-none" />
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              EV Power
            </span>
          </Link>
          <Link href="/stations">
            <Button variant="ghost" className="text-gray-400 hover:text-green-400 hover:bg-green-500/10">
              View Stations
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <Card className="h-[calc(100vh-8rem)] bg-black/40 border-green-500/10 flex flex-col">
          <div className="p-4 border-b border-green-500/10">
            <h2 className="text-xl font-semibold text-white">Support Chat</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-800/50 text-white'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="text-xs opacity-50">{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-gray-800/50 text-white p-3 rounded-lg max-w-[80%]">
                  <p className="italic opacity-70">Typing...</p>
                </div>
              </div>
            )}
          </div>

            
          <form onSubmit={handleSubmit} className="p-4 border-t border-green-500/10">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-white"
              />
              <Button
                type="submit"
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 border border-green-500/30 hover:border-green-500/50"
                disabled={!message.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
