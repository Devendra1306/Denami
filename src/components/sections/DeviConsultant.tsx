"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import Script from "next/script";
import { useAuth } from '@/context/AuthContext';

// Removed ElevenLabs custom element declaration

export function DeviConsultant() {
  const { user } = useAuth();

  return (
    <section id="consultant" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/30 dark:bg-secondary/10 -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6"
          >
            <Bot size={16} />
            <span>AI Project Consultant</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Discuss Your Project With Devi
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Speak directly with Devi, our AI Project Consultant, to discuss your project requirements, explore solutions, and receive immediate guidance.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto relative group"
        >
          {/* Glowing background effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-card border border-border rounded-[2rem] p-8 flex flex-col items-center shadow-2xl">
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
              <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden relative shadow-inner bg-secondary flex items-center justify-center">
                <Bot size={64} className="text-primary" />
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-background rounded-full border border-border shadow-sm">
                <Sparkles size={20} className="text-blue-500" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-foreground mb-2">Devi is Online</h3>
              <p className="text-sm text-muted-foreground">Click below to start voice conversation</p>
            </div>

            {/* ElevenLabs Widget */}
            <div className="w-full flex justify-center min-h-[150px] pt-4">
              {/* @ts-ignore */}
              <elevenlabs-convai 
                agent-id="YOUR_AGENT_ID_HERE"
                dynamic-variables={JSON.stringify({ userId: user?.uid || 'anonymous' })}
              ></elevenlabs-convai>
              <Script src="https://elevenlabs.io/convai-widget/index.js" strategy="lazyOnload" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
